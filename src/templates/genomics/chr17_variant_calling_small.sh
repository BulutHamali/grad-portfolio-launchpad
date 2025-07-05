
#!/bin/bash

# GATK4 Germline Variant Calling Pipeline - Chromosome 17 (Small Scale)
# Optimized for local resources with reduced sample size

echo "=== Chromosome 17 Small-Scale Variant Calling Pipeline ==="

#=====================================PRE-PROCESSING========================================

#-------------------------------------Data Retrieval----------------------------------------
# Static parts of the URL
link_prefix="ftp://ftp.1000genomes.ebi.ac.uk/vol1/ftp/phase3/data/"
link_suffix_1=".chrom17.ILLUMINA.bwa.GBR.exome.20120522.bam"
link_suffix_2=".chrom17.ILLUMINA.bwa.GBR.exome.20121211.bam"
link_middle="/exome_alignment/"

# Static sample prefix - REDUCED TO ONLY 3 SAMPLES
sample_prefix="HG00"

echo "Downloading 3 samples for chromosome 17..."
# wget query for only 3 samples (100, 101, 102)
for i in 100 101 102; do
  echo "Downloading sample ${sample_prefix}${i}"
  wget ${link_prefix}${sample_prefix}${i}${link_middle}${sample_prefix}${i}${link_suffix_1} || echo "File 1 not found for ${sample_prefix}${i}"
  wget ${link_prefix}${sample_prefix}${i}${link_middle}${sample_prefix}${i}${link_suffix_2} || echo "File 2 not found for ${sample_prefix}${i}"
done

#---------------BAM File Quality Control and Reference Genome Retrieval---------------------
echo "Performing quality control checks..."
for file in *.bam; do samtools flagstat $file | grep "QC";done

echo "Extracting chromosome 17 reference..."
samtools faidx hg38.fa chr17 > chr17.fa
samtools faidx chr17.fa
gatk CreateSequenceDictionary R=chr17.fa O=chr17.dict

#----------------Realignment to Reference Genome GRCh38, Chromosome 17----------------------
echo "Converting BAM to FASTQ..."
for file in *.bam; do
  echo "Converting $file"
  samtools collate -uOn 128 "$file" "tmp_${file}" | samtools fastq | gzip > "interleaved_${file%.bam}.fq.gz" 
done

echo "Indexing reference genome..."
bwa index chr17.fa

echo "Aligning reads..."
for file in H*.bam; do
  echo "Aligning $file"
  samplename=$(echo $file | sed -E 's/.chrom17.ILLUMINA.bwa.GBR.exome.(20120522|20121211).bam//')
  read_group="@RG\tID:${samplename}\tLB:${samplename}\tSM:${samplename}\tPL:ILLUMINA\tCN:unknown"

  # Find available FASTQ file
  fq1=$(ls interleaved_${samplename}.chrom17.ILLUMINA.bwa.GBR.exome.20120522.fq.gz 2> /dev/null)
  fq2=$(ls interleaved_${samplename}.chrom17.ILLUMINA.bwa.GBR.exome.20121211.fq.gz 2> /dev/null)

  if [[ -n $fq1 ]]; then
    fastq=$fq1
  elif [[ -n $fq2 ]]; then
    fastq=$fq2
  else
    echo "No FASTQ file found for $samplename"
    continue
  fi

  echo "Running BWA MEM for $samplename"
  bwa mem -t 4 -M -R "$read_group" chr17.fa $fastq | samtools view -bS - | samtools sort -o "aligned${samplename}.bam"
done

#-------------------------------------Mark Duplicates---------------------------------------
echo "Marking duplicates..."
for file in aligned*.bam; do
  echo "Processing $file"
  gatk MarkDuplicates \
    I="$file" \
    O="marked_dup_${file}" \
    M="marked_dup_metrics_${file%.bam}.txt" \
    CREATE_INDEX=true
done

#-------------------------Base Quality Score Recalibration (BQSR)---------------------------
echo "Base quality score recalibration..."
for file in marked_dup_aligned*.bam; do
  echo "Creating recalibration table for $file"
  recal_table="recal_${file%.bam}.table"
  gatk BaseRecalibrator \
    -R chr17.fa \
    -I "$file" \
    --known-sites Homo_sapiens_assembly38.dbsnp138.vcf \
    -O "$recal_table"
done

for file in marked_dup_aligned*.bam; do
  echo "Applying recalibration to $file"
  recal_table="recal_${file%.bam}.table"
  output_bam="recalibrated_${file}"
  gatk ApplyBQSR \
    -R chr17.fa \
    -I "$file" \
    --bqsr-recal-file "$recal_table" \
    -O "$output_bam"
done

#===================================VARIANT DISCOVERY=======================================

#------------------------------------HaplotypeCaller----------------------------------------
echo "Calling variants with HaplotypeCaller..."
mkdir -p vcf
for file in recalibrated_*.bam; do
  echo "Creating GVCF for $file"
  output_vcf="vcf/${file##*/}"
  output_vcf="${output_vcf%.bam}.g.vcf"
  gatk HaplotypeCaller \
    -R chr17.fa \
    -I "$file" \
    -O "$output_vcf" \
    --native-pair-hmm-threads 4 \
    -ERC GVCF \
    -L chr17
done

#------------------------------------Consolidate GVCFs--------------------------------------
echo "Consolidating GVCFs..."
cohort_sample_map="vcf/cohort.sample_map"
> "$cohort_sample_map"

for file in vcf/*.g.vcf; do
  sample=$(basename "$file" .g.vcf)
  echo -e "$sample\t$file" >> "$cohort_sample_map"
done

gatk GenomicsDBImport \
  --genomicsdb-workspace-path database \
  --sample-name-map "$cohort_sample_map" \
  --reader-threads 4 \
  -L chr17

#-------------------------------------Genotype GVCFs----------------------------------------
echo "Joint genotyping..."
gatk GenotypeGVCFs \
  -R chr17.fa \
  -V gendb://database \
  -O vcf/chr17_small_cohort.vcf \
  -L chr17

#=====================================BASIC FILTERING========================================

echo "Basic variant filtering..."
# Extract SNPs and INDELs separately
gatk SelectVariants \
  -R chr17.fa \
  -V vcf/chr17_small_cohort.vcf \
  --select-type SNP \
  -O vcf/chr17_snps.vcf

gatk SelectVariants \
  -R chr17.fa \
  -V vcf/chr17_small_cohort.vcf \
  --select-type INDEL \
  -O vcf/chr17_indels.vcf

# Apply basic hard filters (simplified approach)
gatk VariantFiltration \
  -R chr17.fa \
  -V vcf/chr17_snps.vcf \
  --filter-expression "QD < 2.0 || FS > 60.0 || MQ < 40.0" \
  --filter-name "basic_snp_filter" \
  -O vcf/chr17_filtered_snps.vcf

gatk VariantFiltration \
  -R chr17.fa \
  -V vcf/chr17_indels.vcf \
  --filter-expression "QD < 2.0 || FS > 200.0" \
  --filter-name "basic_indel_filter" \
  -O vcf/chr17_filtered_indels.vcf

#=====================================BASIC STATISTICS=======================================

echo "Generating basic statistics..."
mkdir -p statistics

echo "=== FINAL STATISTICS ===" > statistics/summary.txt
echo "Samples processed: 3" >> statistics/summary.txt
echo "Chromosome: 17" >> statistics/summary.txt
echo "Date: $(date)" >> statistics/summary.txt
echo "" >> statistics/summary.txt

for file in vcf/*.vcf; do
  if [[ -f "$file" ]]; then
    echo "=== $(basename $file) ===" >> statistics/summary.txt
    bcftools stats "$file" | grep "^SN" | head -5 >> statistics/summary.txt
    echo "" >> statistics/summary.txt
  fi
done

echo "=== Small-Scale Chromosome 17 Variant Calling Pipeline Complete ==="
echo "Results:"
echo "  - Raw variants: vcf/chr17_small_cohort.vcf"
echo "  - Filtered SNPs: vcf/chr17_filtered_snps.vcf"
echo "  - Filtered INDELs: vcf/chr17_filtered_indels.vcf"
echo "  - Summary statistics: statistics/summary.txt"
echo ""
echo "Resource requirements: ~4-8 GB RAM, ~2-4 hours runtime"
