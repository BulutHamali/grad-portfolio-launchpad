
#!/bin/bash

# GATK4 Germline Variant Calling Pipeline
# Following GATK4 best practices workflow - https://gatk.broadinstitute.org/hc/en-us/articles/360035535932-Germline-short-variant-discovery-SNPs-Indels-
# This script is for demonstration purposes only

# Configuration
SAMPLE_ID="SRR062634"
BASE_DIR="$(pwd)/genomic_analysis"
REF_DIR="${BASE_DIR}/reference"
DATA_DIR="${BASE_DIR}/data" 
READS_DIR="${BASE_DIR}/reads"
ALIGNED_DIR="${BASE_DIR}/aligned_reads"
RESULTS_DIR="${BASE_DIR}/results"

# Create directories
mkdir -p ${REF_DIR} ${DATA_DIR} ${READS_DIR} ${ALIGNED_DIR} ${RESULTS_DIR}

# Reference and known sites files
REF="${REF_DIR}/hg38.fa"
KNOWN_SITES="${REF_DIR}/Homo_sapiens_assembly38.dbsnp138.vcf"

echo "=== GATK4 Germline Variant Calling Pipeline ==="
echo "Sample ID: ${SAMPLE_ID}"
echo "Base directory: ${BASE_DIR}"
echo ""

# Function to check if file exists
check_file() {
    if [[ ! -f "$1" ]]; then
        echo "❌ Error: $1 not found"
        exit 1
    fi
}

# Function to check if command exists
check_command() {
    if ! command -v $1 &> /dev/null; then
        echo "❌ Error: $1 is not installed or not in PATH"
        echo "Please install $1 before running this pipeline"
        exit 1
    fi
}

echo "Checking required tools..."
check_command "wget"
check_command "fastqc"
check_command "bwa"
check_command "gatk"
check_command "samtools"

################################################### PREP FILES (TO BE GENERATED ONLY ONCE) ##########################################################

echo ""
echo "=== STEP 0: Download Reference Files ==="

# Download reference genome if not exists
if [[ ! -f "${REF}" ]]; then
    echo "Downloading reference genome..."
    wget -P ${REF_DIR}/ https://hgdownload.soe.ucsc.edu/goldenPath/hg38/bigZips/hg38.fa.gz
    gunzip ${REF_DIR}/hg38.fa.gz
fi

# Index reference - .fai file
if [[ ! -f "${REF}.fai" ]]; then
    echo "Indexing reference genome..."
    samtools faidx ${REF}
fi

# Create sequence dictionary - .dict file
if [[ ! -f "${REF_DIR}/hg38.dict" ]]; then
    echo "Creating sequence dictionary..."
    gatk CreateSequenceDictionary R=${REF} O=${REF_DIR}/hg38.dict
fi

# Download known sites files for BQSR
if [[ ! -f "${KNOWN_SITES}" ]]; then
    echo "Downloading known sites for BQSR..."
    wget -P ${REF_DIR}/ https://storage.googleapis.com/genomics-public-data/resources/broad/hg38/v0/Homo_sapiens_assembly38.dbsnp138.vcf
    wget -P ${REF_DIR}/ https://storage.googleapis.com/genomics-public-data/resources/broad/hg38/v0/Homo_sapiens_assembly38.dbsnp138.vcf.idx
fi

################################################### VARIANT CALLING STEPS ####################################################################

echo ""
echo "=== STEP 1: Download Sample Data ==="

# Download sample data if not exists
if [[ ! -f "${READS_DIR}/${SAMPLE_ID}_1.filt.fastq.gz" ]]; then
    echo "Downloading paired-end reads..."
    wget -O ${READS_DIR}/${SAMPLE_ID}_1.filt.fastq.gz ftp://ftp-trace.ncbi.nih.gov/1000genomes/ftp/phase3/data/HG00096/sequence_read/SRR062634_1.filt.fastq.gz
    wget -O ${READS_DIR}/${SAMPLE_ID}_2.filt.fastq.gz ftp://ftp-trace.ncbi.nih.gov/1000genomes/ftp/phase3/data/HG00096/sequence_read/SRR062634_2.filt.fastq.gz
fi

echo ""
echo "=== STEP 2: Quality Control - FastQC ==="

fastqc ${READS_DIR}/${SAMPLE_ID}_1.filt.fastq.gz -o ${READS_DIR}/
fastqc ${READS_DIR}/${SAMPLE_ID}_2.filt.fastq.gz -o ${READS_DIR}/

echo "✅ FastQC completed"

echo ""
echo "=== STEP 3: Alignment - BWA-MEM ==="

# BWA index reference if not exists
if [[ ! -f "${REF}.bwt" ]]; then
    echo "Indexing reference for BWA..."
    bwa index ${REF}
fi

# BWA alignment
echo "Aligning reads to reference..."
bwa mem -t 4 -R "@RG\tID:${SAMPLE_ID}\tPL:ILLUMINA\tSM:${SAMPLE_ID}" ${REF} ${READS_DIR}/${SAMPLE_ID}_1.filt.fastq.gz ${READS_DIR}/${SAMPLE_ID}_2.filt.fastq.gz > ${ALIGNED_DIR}/${SAMPLE_ID}.paired.sam

echo "✅ Alignment completed"

echo ""
echo "=== STEP 4: Mark Duplicates and Sort ==="

gatk MarkDuplicatesSpark -I ${ALIGNED_DIR}/${SAMPLE_ID}.paired.sam -O ${ALIGNED_DIR}/${SAMPLE_ID}_sorted_dedup_reads.bam

echo "✅ Duplicate marking and sorting completed"

echo ""
echo "=== STEP 5: Base Quality Score Recalibration ==="

# Build the recalibration model
echo "Building recalibration model..."
gatk BaseRecalibrator -I ${ALIGNED_DIR}/${SAMPLE_ID}_sorted_dedup_reads.bam -R ${REF} --known-sites ${KNOWN_SITES} -O ${DATA_DIR}/recal_data.table

# Apply the recalibration model
echo "Applying recalibration..."
gatk ApplyBQSR -I ${ALIGNED_DIR}/${SAMPLE_ID}_sorted_dedup_reads.bam -R ${REF} --bqsr-recal-file ${DATA_DIR}/recal_data.table -O ${ALIGNED_DIR}/${SAMPLE_ID}_sorted_dedup_bqsr_reads.bam

echo "✅ Base quality recalibration completed"

echo ""
echo "=== STEP 6: Collect Alignment Metrics ==="

gatk CollectAlignmentSummaryMetrics R=${REF} I=${ALIGNED_DIR}/${SAMPLE_ID}_sorted_dedup_bqsr_reads.bam O=${ALIGNED_DIR}/alignment_metrics.txt
gatk CollectInsertSizeMetrics INPUT=${ALIGNED_DIR}/${SAMPLE_ID}_sorted_dedup_bqsr_reads.bam OUTPUT=${ALIGNED_DIR}/insert_size_metrics.txt HISTOGRAM_FILE=${ALIGNED_DIR}/insert_size_histogram.pdf

echo "✅ Alignment metrics collection completed"

echo ""
echo "=== STEP 7: Variant Calling - HaplotypeCaller ==="

gatk HaplotypeCaller -R ${REF} -I ${ALIGNED_DIR}/${SAMPLE_ID}_sorted_dedup_bqsr_reads.bam -O ${RESULTS_DIR}/raw_variants.vcf

echo "✅ Variant calling completed"

echo ""
echo "=== STEP 8: Variant Filtering ==="

# Extract SNPs and INDELs
gatk SelectVariants -R ${REF} -V ${RESULTS_DIR}/raw_variants.vcf --select-type SNP -O ${RESULTS_DIR}/raw_snps.vcf
gatk SelectVariants -R ${REF} -V ${RESULTS_DIR}/raw_variants.vcf --select-type INDEL -O ${RESULTS_DIR}/raw_indels.vcf

echo "✅ Variant filtering completed"

echo ""
echo "=== Pipeline Completed Successfully! ==="
echo "Results available in: ${RESULTS_DIR}/"
echo "- raw_variants.vcf: All variants"
echo "- raw_snps.vcf: SNPs only"  
echo "- raw_indels.vcf: INDELs only"
echo ""
echo "Quality control reports available in: ${READS_DIR}/ and ${ALIGNED_DIR}/"
