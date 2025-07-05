
#!pip install cyvcf2 scikit-allel plotly pandas numpy matplotlib seaborn requests -q --no-cache-dir

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import warnings
warnings.filterwarnings('ignore')

# Import our modular components
from genomics.data_downloader import GenomicDataDownloader
from genomics.vcf_loader import VCFLoader
from genomics.sample_data_generator import SampleDataGenerator
from genomics.variant_analyzer import VariantAnalyzer

# Set up plotting style
plt.style.use('seaborn-v0_8')
sns.set_palette("husl")

class GenomicVariantAnalyzer:
    def __init__(self, vcf_path=None):
        self.vcf_path = vcf_path
        self.variants_df = None
        self.summary_stats = {}
        
        # Initialize modular components
        self.downloader = GenomicDataDownloader()
        self.vcf_loader = VCFLoader()
        self.sample_generator = SampleDataGenerator()
        self.analyzer = VariantAnalyzer()
        
    def download_clinvar_data(self):
        """Download ClinVar VCF data and load it"""
        vcf_file = self.downloader.download_clinvar_data()
        if vcf_file:
            df = self.vcf_loader.load_clinvar_vcf(vcf_file)
            if df is not None:
                self.variants_df = self._finalize_dataframe(df)
                return self.variants_df
        
        print("Using sample data instead...")
        return self.load_sample_data()
    
    def download_1000genomes_chr22(self):
        """Download 1000 Genomes chromosome 22 data and load it"""
        vcf_file = self.downloader.download_1000genomes_chr22()
        if vcf_file:
            df = self.vcf_loader.load_1000genomes_vcf(vcf_file)
            if df is not None:
                self.variants_df = self._finalize_dataframe(df)
                return self.variants_df
        
        print("Using sample data instead...")
        return self.load_sample_data()
    
    def import_data_colab(self):
        """Import VCF file in Google Colab environment"""
        try:
            from google.colab import files
            print("Select your VCF file to upload:")
            uploaded = files.upload()
            
            if uploaded:
                vcf_filename = list(uploaded.keys())[0]
                print(f"Uploaded: {vcf_filename}")
                return self.import_data_local(vcf_filename)
            else:
                print("No file uploaded. Using sample data...")
                return self.load_sample_data()
                
        except ImportError:
            print("Not running in Colab environment")
            return self.load_sample_data()
    
    def import_data_local(self, file_path):
        """Import VCF file from local path"""
        if file_path and (file_path.endswith('.vcf') or file_path.endswith('.vcf.gz')):
            df = self.vcf_loader.load_vcf_data(file_path)
            if df is not None:
                self.variants_df = self._finalize_dataframe(df)
                return self.variants_df
        
        print("Invalid file path or format. Using sample data...")
        return self.load_sample_data()
    
    def load_sample_data(self):
        """Load sample variant data for demonstration"""
        df = self.sample_generator.load_sample_data()
        self.variants_df = self._finalize_dataframe(df)
        return self.variants_df
    
    def _finalize_dataframe(self, df):
        """Add missing analysis columns to dataframe"""
        if 'variant_type' not in df.columns:
            df['variant_type'] = self.analyzer.classify_variant_types(df)
        
        if 'pathogenicity' not in df.columns:
            df['pathogenicity'] = self.analyzer.predict_pathogenicity(df)
            
        if 'clinical_significance' not in df.columns:
            df['clinical_significance'] = self.analyzer.assign_clinical_significance(df)
        
        return df
    
    def generate_summary_stats(self):
        """Generate summary statistics for the dashboard"""
        stats = self.analyzer.generate_summary_stats(self.variants_df)
        self.summary_stats = stats
        return stats
    
    def display_summary(self):
        """Display formatted summary statistics"""
        stats = self.generate_summary_stats()
        if stats is None:
            return
            
        print("=== GENOMIC VARIANT ANALYSIS SUMMARY ===")
        print(f"Total Variants: {stats['total_variants']:,}")
        print(f"Total Patients: {stats['total_patients']}")
        print(f"Average Variants per Patient: {stats['avg_variants_per_patient']:.0f}")
        print(f"High Priority Variants: {stats['high_priority_variants']:,}")
        print(f"Mean CADD Score: {stats['mean_cadd_score']:.2f}")
        print(f"Mean Quality Score: {stats['mean_quality_score']:.2f}")
        
        print("\nVariant Type Distribution:")
        for vtype, count in stats['variant_types'].items():
            print(f"  {vtype}: {count:,} ({count/stats['total_variants']*100:.1f}%)")
            
        print("\nPathogenicity Distribution:")
        for path, count in stats['pathogenicity_distribution'].items():
            print(f"  {path}: {count:,} ({count/stats['total_variants']*100:.1f}%)")

# Usage Examples:
if __name__ == "__main__":
    # Initialize analyzer
    analyzer = GenomicVariantAnalyzer()
    
    print("Choose data source:")
    print("1. ClinVar dataset (clinical variants)")
    print("2. 1000 Genomes Chr22 (population variants)")
    print("3. Upload your own VCF (Colab)")
    print("4. Sample data (demonstration)")
    
    choice = input("Enter choice (1-4): ").strip()
    
    if choice == "1":
        data = analyzer.download_clinvar_data()
    elif choice == "2":
        data = analyzer.download_1000genomes_chr22()
    elif choice == "3":
        data = analyzer.import_data_colab()
    else:
        print("Using sample data for demonstration...")
        data = analyzer.load_sample_data()
    
    # Display summary
    analyzer.display_summary()
    
    # Show first few rows
    print("\nFirst 5 variants:")
    print(analyzer.variants_df.head())
