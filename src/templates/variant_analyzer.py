
#!pip install pandas numpy matplotlib seaborn plotly scikit-learn -q --no-cache-dir

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

class GenomicVariantAnalyzer:
    """
    Comprehensive genomic variant analysis pipeline
    Integrates data download, processing, and analysis
    """
    
    def __init__(self):
        self.variants_df = None
        self.summary_stats = {}
        
        # Initialize modular components
        self.downloader = GenomicDataDownloader()
        self.vcf_loader = VCFLoader()
        self.sample_generator = SampleDataGenerator()
        self.analyzer = VariantAnalyzer()
        
        # Set up plotting style
        plt.style.use('seaborn-v0_8')
        sns.set_palette("husl")
    
    def load_data(self, source='sample'):
        """
        Load genomic variant data from various sources
        
        Args:
            source (str): 'clinvar', '1000genomes', 'sample', or file path
        """
        print(f"Loading data from source: {source}")
        
        if source == 'clinvar':
            return self._load_clinvar_data()
        elif source == '1000genomes':
            return self._load_1000genomes_data()
        elif source == 'sample':
            return self._load_sample_data()
        else:
            # Assume it's a file path
            return self._load_custom_data(source)
    
    def _load_clinvar_data(self):
        """Download and process ClinVar data"""
        vcf_file = self.downloader.download_clinvar_data()
        if vcf_file:
            df = self.vcf_loader.load_clinvar_vcf(vcf_file)
            if df is not None:
                self.variants_df = self._finalize_dataframe(df)
                print(f"Successfully loaded {len(self.variants_df)} ClinVar variants")
                return self.variants_df
        
        print("Failed to load ClinVar data, using sample data instead...")
        return self._load_sample_data()
    
    def _load_1000genomes_data(self):
        """Download and process 1000 Genomes data"""
        vcf_file = self.downloader.download_1000genomes_chr22()
        if vcf_file:
            df = self.vcf_loader.load_1000genomes_vcf(vcf_file)
            if df is not None:
                self.variants_df = self._finalize_dataframe(df)
                print(f"Successfully loaded {len(self.variants_df)} 1000 Genomes variants")
                return self.variants_df
        
        print("Failed to load 1000 Genomes data, using sample data instead...")
        return self._load_sample_data()
    
    def _load_sample_data(self):
        """Load sample demonstration data"""
        df = self.sample_generator.load_sample_data()
        self.variants_df = self._finalize_dataframe(df)
        print(f"Successfully loaded {len(self.variants_df)} sample variants")
        return self.variants_df
    
    def _load_custom_data(self, file_path):
        """Load custom VCF file"""
        df = self.vcf_loader.load_vcf_data(file_path)
        if df is not None:
            self.variants_df = self._finalize_dataframe(df)
            print(f"Successfully loaded {len(self.variants_df)} variants from {file_path}")
            return self.variants_df
        
        print(f"Failed to load {file_path}, using sample data instead...")
        return self._load_sample_data()
    
    def _finalize_dataframe(self, df):
        """Add analysis columns to the dataframe"""
        if 'variant_type' not in df.columns:
            df['variant_type'] = self.analyzer.classify_variant_types(df)
        
        if 'pathogenicity' not in df.columns:
            df['pathogenicity'] = self.analyzer.predict_pathogenicity(df)
            
        if 'clinical_significance' not in df.columns:
            df['clinical_significance'] = self.analyzer.assign_clinical_significance(df)
        
        return df
    
    def analyze_variants(self):
        """Run comprehensive variant analysis"""
        if self.variants_df is None:
            print("No data loaded. Please load data first.")
            return None
        
        print("Running variant analysis...")
        
        # Generate summary statistics
        self.summary_stats = self.analyzer.generate_summary_stats(self.variants_df)
        
        # Display summary
        self._display_summary()
        
        return self.summary_stats
    
    def _display_summary(self):
        """Display formatted analysis summary"""
        if not self.summary_stats:
            return
        
        stats = self.summary_stats
        
        print("\n" + "="*50)
        print("    GENOMIC VARIANT ANALYSIS SUMMARY")
        print("="*50)
        print(f"📊 Total Variants: {stats['total_variants']:,}")
        print(f"👥 Total Patients: {stats['total_patients']}")
        print(f"📈 Avg Variants/Patient: {stats['avg_variants_per_patient']:.0f}")
        print(f"🔴 High Priority Variants: {stats['high_priority_variants']:,}")
        print(f"🧬 Mean CADD Score: {stats['mean_cadd_score']:.2f}")
        print(f"⭐ Mean Quality Score: {stats['mean_quality_score']:.2f}")
        
        print(f"\n📋 Variant Type Distribution:")
        for vtype, count in stats['variant_types'].items():
            percentage = (count/stats['total_variants']*100)
            print(f"   {vtype}: {count:,} ({percentage:.1f}%)")
        
        print(f"\n🏥 Pathogenicity Distribution:")
        for path, count in stats['pathogenicity_distribution'].items():
            percentage = (count/stats['total_variants']*100)
            print(f"   {path}: {count:,} ({percentage:.1f}%)")
    
    def create_visualizations(self):
        """Generate comprehensive visualizations"""
        if self.variants_df is None:
            print("No data loaded. Please load data first.")
            return
        
        print("Creating visualizations...")
        
        # Create subplots
        fig = plt.figure(figsize=(20, 15))
        
        # 1. Variant type distribution
        plt.subplot(2, 3, 1)
        variant_counts = self.variants_df['variant_type'].value_counts()
        plt.pie(variant_counts.values, labels=variant_counts.index, autopct='%1.1f%%')
        plt.title('Variant Type Distribution', fontsize=14, fontweight='bold')
        
        # 2. Pathogenicity distribution
        plt.subplot(2, 3, 2)
        path_counts = self.variants_df['pathogenicity'].value_counts()
        sns.barplot(x=path_counts.index, y=path_counts.values)
        plt.title('Pathogenicity Distribution', fontsize=14, fontweight='bold')
        plt.xticks(rotation=45)
        
        # 3. Chromosomal distribution
        plt.subplot(2, 3, 3)
        chrom_counts = self.variants_df['CHROM'].value_counts().head(10)
        sns.barplot(x=chrom_counts.index, y=chrom_counts.values)
        plt.title('Top 10 Chromosomes by Variant Count', fontsize=14, fontweight='bold')
        plt.xticks(rotation=45)
        
        # 4. CADD score distribution
        plt.subplot(2, 3, 4)
        plt.hist(self.variants_df['CADD_PHRED'], bins=50, alpha=0.7, edgecolor='black')
        plt.axvline(self.variants_df['CADD_PHRED'].mean(), color='red', linestyle='--', 
                   label=f'Mean: {self.variants_df["CADD_PHRED"].mean():.2f}')
        plt.xlabel('CADD PHRED Score')
        plt.ylabel('Frequency')
        plt.title('CADD Score Distribution', fontsize=14, fontweight='bold')
        plt.legend()
        
        # 5. Quality vs CADD score
        plt.subplot(2, 3, 5)
        plt.scatter(self.variants_df['QUAL'], self.variants_df['CADD_PHRED'], 
                   alpha=0.6, s=10)
        plt.xlabel('Quality Score')
        plt.ylabel('CADD PHRED Score')
        plt.title('Quality vs CADD Score', fontsize=14, fontweight='bold')
        
        # 6. Clinical significance priority
        plt.subplot(2, 3, 6)
        clin_counts = self.variants_df['clinical_significance'].value_counts()
        colors = ['red', 'orange', 'green']
        plt.pie(clin_counts.values, labels=clin_counts.index, autopct='%1.1f%%', 
                colors=colors)
        plt.title('Clinical Significance Priority', fontsize=14, fontweight='bold')
        
        plt.tight_layout()
        plt.show()
        
        # Interactive Plotly visualizations
        self._create_interactive_plots()
    
    def _create_interactive_plots(self):
        """Create interactive Plotly visualizations"""
        
        # Manhattan plot (simplified)
        fig1 = px.scatter(self.variants_df.head(1000), 
                         x='POS', y='CADD_PHRED', 
                         color='CHROM',
                         hover_data=['pathogenicity', 'clinical_significance'],
                         title='Manhattan Plot (CADD Scores by Position)')
        fig1.update_layout(height=500)
        fig1.show()
        
        # Pathogenicity by chromosome
        fig2 = px.sunburst(self.variants_df, 
                          path=['CHROM', 'pathogenicity'], 
                          title='Pathogenicity Distribution by Chromosome')
        fig2.update_layout(height=600)
        fig2.show()
        
        # Quality metrics correlation
        correlation_data = self.variants_df[['QUAL', 'CADD_PHRED', 'SIFT_score', 'PolyPhen_score']].corr()
        fig3 = px.imshow(correlation_data, 
                        text_auto=True, 
                        title='Quality Metrics Correlation Matrix')
        fig3.show()
    
    def filter_high_priority_variants(self):
        """Filter and return high priority variants"""
        if self.variants_df is None:
            print("No data loaded. Please load data first.")
            return None
        
        high_priority = self.variants_df[
            self.variants_df['clinical_significance'] == 'High Priority'
        ].copy()
        
        print(f"\nFound {len(high_priority)} high priority variants:")
        print(high_priority[['patient_id', 'CHROM', 'POS', 'pathogenicity', 
                            'CADD_PHRED', 'gene']].head(10))
        
        return high_priority
    
    def generate_patient_report(self, patient_id):
        """Generate a detailed report for a specific patient"""
        if self.variants_df is None:
            print("No data loaded. Please load data first.")
            return None
        
        patient_data = self.variants_df[
            self.variants_df['patient_id'] == patient_id
        ].copy()
        
        if len(patient_data) == 0:
            print(f"No data found for patient {patient_id}")
            return None
        
        print(f"\n" + "="*40)
        print(f"    PATIENT REPORT: {patient_id}")
        print("="*40)
        
        # Summary stats for this patient
        total_variants = len(patient_data)
        high_priority = len(patient_data[patient_data['clinical_significance'] == 'High Priority'])
        pathogenic = len(patient_data[patient_data['pathogenicity'].isin(['Pathogenic', 'Likely Pathogenic'])])
        
        print(f"Total Variants: {total_variants}")
        print(f"High Priority: {high_priority}")
        print(f"Pathogenic/Likely Pathogenic: {pathogenic}")
        print(f"Mean CADD Score: {patient_data['CADD_PHRED'].mean():.2f}")
        
        # Variant breakdown
        print(f"\nVariant Types:")
        for vtype, count in patient_data['variant_type'].value_counts().items():
            print(f"  {vtype}: {count}")
        
        # High priority variants
        if high_priority > 0:
            print(f"\nHigh Priority Variants:")
            high_priority_vars = patient_data[
                patient_data['clinical_significance'] == 'High Priority'
            ][['CHROM', 'POS', 'pathogenicity', 'CADD_PHRED', 'gene']].head(5)
            print(high_priority_vars.to_string(index=False))
        
        return patient_data
    
    def export_results(self, filename='variant_analysis_results.csv'):
        """Export analysis results to CSV"""
        if self.variants_df is None:
            print("No data loaded. Please load data first.")
            return False
        
        try:
            self.variants_df.to_csv(filename, index=False)
            print(f"Results exported to {filename}")
            return True
        except Exception as e:
            print(f"Error exporting results: {e}")
            return False


# Usage example and main execution
if __name__ == "__main__":
    print("🧬 Genomic Variant Analyzer")
    print("=" * 30)
    
    # Initialize analyzer
    analyzer = GenomicVariantAnalyzer()
    
    # Interactive menu
    print("\nChoose data source:")
    print("1. ClinVar dataset (clinical variants)")
    print("2. 1000 Genomes Chr22 (population variants)")
    print("3. Sample data (demonstration)")
    print("4. Custom VCF file")
    
    try:
        choice = input("\nEnter choice (1-4): ").strip()
        
        if choice == "1":
            data = analyzer.load_data('clinvar')
        elif choice == "2":
            data = analyzer.load_data('1000genomes')
        elif choice == "3":
            data = analyzer.load_data('sample')
        elif choice == "4":
            filepath = input("Enter VCF file path: ").strip()
            data = analyzer.load_data(filepath)
        else:
            print("Invalid choice. Using sample data...")
            data = analyzer.load_data('sample')
        
        if data is not None:
            # Run analysis
            analyzer.analyze_variants()
            
            # Create visualizations
            analyzer.create_visualizations()
            
            # Show high priority variants
            analyzer.filter_high_priority_variants()
            
            # Generate patient report (example)
            if len(analyzer.variants_df['patient_id'].unique()) > 0:
                sample_patient = analyzer.variants_df['patient_id'].iloc[0]
                analyzer.generate_patient_report(sample_patient)
            
            # Export option
            export_choice = input("\nExport results to CSV? (y/n): ").strip().lower()
            if export_choice == 'y':
                analyzer.export_results()
            
            print("\n✅ Analysis complete!")
        
    except KeyboardInterrupt:
        print("\n\nAnalysis interrupted by user.")
    except Exception as e:
        print(f"\nError during analysis: {e}")
        print("Using sample data for demonstration...")
        analyzer.load_data('sample')
        analyzer.analyze_variants()
