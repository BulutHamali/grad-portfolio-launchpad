
#!/usr/bin/env python3

import sys
import os
from pathlib import Path

# Add the genomics directory to Python path
sys.path.append(str(Path(__file__).parent / "genomics"))

from data_downloader import GenomicDataDownloader
from vcf_loader import VCFLoader
from variant_analyzer import VariantAnalyzer
from gatk4_pipeline import GATK4Pipeline

def main():
    print("🧬 Genomic Variant Analysis Pipeline")
    print("=" * 50)
    
    print("\nSelect analysis type:")
    print("1. VCF Analysis (load existing VCF files)")
    print("2. GATK4 Variant Calling (complete pipeline from FASTQ)")
    print("3. Exit")
    
    choice = input("\nEnter your choice (1-3): ").strip()
    
    if choice == "1":
        run_vcf_analysis()
    elif choice == "2":
        run_gatk4_pipeline()
    elif choice == "3":
        print("Goodbye!")
        return
    else:
        print("Invalid choice. Please run the script again.")

def run_vcf_analysis():
    """Run the existing VCF analysis pipeline"""
    print("\n" + "="*50)
    print("VCF ANALYSIS PIPELINE")
    print("="*50)
    
    # Initialize components
    downloader = GenomicDataDownloader()
    loader = VCFLoader()
    analyzer = VariantAnalyzer()
    
    print("\nSelect data source:")
    print("1. ClinVar (Clinical variants)")
    print("2. 1000 Genomes Chr22 (Population variants)")
    print("3. gnomAD Exomes Chr1 (Population frequency data)")
    
    choice = input("Enter your choice (1-3): ").strip()
    
    # Download data based on choice
    if choice == "1":
        print("\n1. DOWNLOADING CLINVAR DATA")
        print("-" * 30)
        filepath = downloader.download_clinvar_data()
    elif choice == "2":
        print("\n1. DOWNLOADING 1000 GENOMES DATA")
        print("-" * 35)
        filepath = downloader.download_1000genomes_chr22()
    elif choice == "3":
        print("\n1. DOWNLOADING GNOMAD DATA")
        print("-" * 28)
        filepath = downloader.download_gnomad_exomes()
    else:
        print("Invalid choice!")
        return
    
    if not filepath:
        print("❌ Data download failed!")
        return
    
    # Load and analyze data
    print(f"\n2. LOADING VCF DATA")
    print("-" * 20)
    df = loader.load_vcf_data(filepath)
    
    if df is None or df.empty:
        print("❌ Failed to load VCF data!")
        return
    
    print(f"\n3. ANALYZING VARIANTS")
    print("-" * 22)
    analyzer.analyze_variants(df)
    
    print(f"\n4. GENERATING VISUALIZATIONS")
    print("-" * 30)
    analyzer.create_visualizations(df)
    
    print("\n✅ Analysis completed successfully!")
    print("Check the 'genomic_analysis' directory for results and plots.")

def run_gatk4_pipeline():
    """Run the GATK4 variant calling pipeline"""
    print("\n" + "="*50)
    print("GATK4 VARIANT CALLING PIPELINE")
    print("="*50)
    
    pipeline = GATK4Pipeline()
    
    # Display pipeline information
    info = pipeline.get_pipeline_info()
    print(f"\nDescription: {info['description']}")
    print(f"Workflow: {info['workflow']}")
    
    print("\nPipeline Steps:")
    for i, step in enumerate(info['steps'], 1):
        print(f"  {i}. {step}")
    
    print(f"\nInput: {info['input']}")
    print(f"Output: {info['output']}")
    print(f"Reference: {info['reference']}")
    
    print("\n⚠️  Prerequisites:")
    print("- GATK4, BWA, SAMtools, FastQC must be installed")
    print("- ~15GB disk space required for reference files and data")
    print("- Several hours processing time for complete pipeline")
    
    # Ask user if they want to proceed
    proceed = input("\nDo you want to run the GATK4 pipeline? (y/n): ").lower().strip()
    
    if proceed in ['y', 'yes']:
        success = pipeline.run_pipeline()
        if success:
            print("\n🎉 GATK4 pipeline completed successfully!")
            print("VCF files are available in genomic_analysis/results/")
            
            # Ask if user wants to analyze the results
            analyze = input("\nDo you want to analyze the generated VCF files? (y/n): ").lower().strip()
            if analyze in ['y', 'yes']:
                analyze_gatk4_results()
        else:
            print("\n❌ GATK4 pipeline failed!")
    else:
        print("Pipeline execution cancelled.")

def analyze_gatk4_results():
    """Analyze the results from GATK4 pipeline"""
    print("\n" + "="*50)
    print("ANALYZING GATK4 RESULTS")
    print("="*50)
    
    results_dir = Path("genomic_analysis/results")
    if not results_dir.exists():
        print("❌ Results directory not found!")
        return
    
    # Look for VCF files
    vcf_files = list(results_dir.glob("*.vcf"))
    if not vcf_files:
        print("❌ No VCF files found in results directory!")
        return
    
    # Initialize analyzer
    loader = VCFLoader()
    analyzer = VariantAnalyzer()
    
    # Analyze raw variants
    raw_variants_file = results_dir / "raw_variants.vcf"
    if raw_variants_file.exists():
        print(f"\nAnalyzing: {raw_variants_file.name}")
        df = loader.load_vcf_data(str(raw_variants_file))
        
        if df is not None and not df.empty:
            print(f"\n📊 VARIANT ANALYSIS")
            print("-" * 20)
            analyzer.analyze_variants(df)
            
            print(f"\n📈 CREATING VISUALIZATIONS")
            print("-" * 26)
            analyzer.create_visualizations(df, output_prefix="gatk4_")
            
            print("\n✅ GATK4 results analysis completed!")
        else:
            print("❌ Failed to load VCF data!")
    else:
        print("❌ raw_variants.vcf not found!")

if __name__ == "__main__":
    main()
