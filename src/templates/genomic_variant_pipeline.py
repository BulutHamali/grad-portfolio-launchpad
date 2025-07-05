
#!/usr/bin/env python3
"""
Genomic Variant Analysis Pipeline
Complete modular system for variant analysis from data acquisition to reporting
"""

import sys
import os
from pathlib import Path

# For Google Colab compatibility - add current directory to path
sys.path.append('.')
sys.path.append('./genomics')

from genomics.data_downloader import GenomicDataDownloader
from genomics.vcf_loader import VCFLoader
from genomics.variant_analyzer import VariantAnalyzer

class GenomicVariantPipeline:
    """Main orchestrator for genomic variant analysis pipeline"""
    
    def __init__(self, working_dir="genomic_analysis"):
        self.working_dir = Path(working_dir)
        self.working_dir.mkdir(exist_ok=True)
        
        # Initialize components
        self.downloader = GenomicDataDownloader(str(self.working_dir / "data"))
        self.loader = VCFLoader()
        self.analyzer = VariantAnalyzer()
        
        # Data storage
        self.variants_df = None
        self.analysis_results = {}
    
    def run_analysis(self, data_source="clinvar", max_variants=25000):
        """Run complete analysis pipeline"""
        print(f"Starting genomic variant analysis pipeline...")
        print(f"Data source: {data_source}")
        print(f"Max variants: {max_variants:,}")
        print("=" * 50)
        
        # Step 1: Data Acquisition
        print("\n1. DATA ACQUISITION")
        print("-" * 20)
        vcf_file = self._acquire_data(data_source)
        if not vcf_file:
            print("❌ Data acquisition failed")
            return None
        
        # Step 2: Data Loading
        print("\n2. DATA LOADING")
        print("-" * 15)
        self.variants_df = self._load_data(vcf_file, data_source, max_variants)
        if self.variants_df is None:
            print("❌ Data loading failed")
            return None
        
        # Step 3: Variant Annotation
        print("\n3. VARIANT ANNOTATION")
        print("-" * 21)
        self.variants_df = self.analyzer.annotate_variants(self.variants_df)
        print(f"✅ Annotated {len(self.variants_df):,} variants")
        
        # Step 4: Analysis & Statistics
        print("\n4. ANALYSIS & STATISTICS")
        print("-" * 24)
        self.analysis_results = self.analyzer.generate_summary_statistics(self.variants_df)
        print("✅ Generated summary statistics")
        
        # Step 5: Generate Reports
        print("\n5. REPORT GENERATION")
        print("-" * 20)
        self._generate_reports()
        
        print("\n" + "=" * 50)
        print("🎉 ANALYSIS COMPLETE!")
        print("=" * 50)
        
        return self.variants_df
    
    # ... keep existing code (all other methods remain the same)
    
    def _acquire_data(self, data_source):
        """Acquire data based on source specification"""
        if data_source.lower() == "clinvar":
            return self.downloader.download_clinvar_data()
        elif data_source.lower() == "1000genomes":
            return self.downloader.download_1000genomes_chr22()
        elif data_source.lower() == "gnomad":
            return self.downloader.download_gnomad_exomes()
        elif os.path.exists(data_source):
            print(f"Using local file: {data_source}")
            return data_source
        else:
            print(f"❌ Unknown data source: {data_source}")
            return None
    
    def _load_data(self, vcf_file, data_source, max_variants):
        """Load data using appropriate loader method"""
        if data_source.lower() == "clinvar":
            return self.loader.load_clinvar_vcf(vcf_file)
        elif data_source.lower() == "1000genomes":
            return self.loader.load_1000genomes_vcf(vcf_file)
        else:
            return self.loader.load_vcf_file(vcf_file, max_variants)
    
    def _generate_reports(self):
        """Generate comprehensive analysis reports"""
        # Summary report
        summary_report = self.analyzer.generate_variant_report(self.variants_df)
        report_file = self.working_dir / "variant_analysis_summary.txt"
        with open(report_file, 'w') as f:
            f.write(summary_report)
        print(f"📄 Summary report saved: {report_file}")
        
        # High priority variants
        high_priority = self.analyzer.filter_high_priority_variants(self.variants_df)
        if len(high_priority) > 0:
            priority_file = self.working_dir / "high_priority_variants.csv"
            high_priority.to_csv(priority_file, index=False)
            print(f"🔴 High priority variants saved: {priority_file}")
        
        # Full dataset
        full_file = self.working_dir / "annotated_variants.csv"
        self.variants_df.to_csv(full_file, index=False)
        print(f"💾 Full annotated dataset saved: {full_file}")
    
    def display_summary(self):
        """Display analysis summary to console"""
        if not self.analysis_results:
            print("No analysis results available. Run analysis first.")
            return
        
        stats = self.analysis_results
        
        print("\n🧬 GENOMIC VARIANT ANALYSIS SUMMARY")
        print("=" * 40)
        print(f"📊 Total Variants: {stats['total_variants']:,}")
        print(f"🧪 Chromosomes: {stats['chromosomes']}")
        
        print(f"\n📈 Variant Types:")
        for vtype, count in stats['variant_types'].items():
            percentage = (count / stats['total_variants']) * 100
            print(f"   {vtype}: {count:,} ({percentage:.1f}%)")
        
        print(f"\n🔬 Pathogenicity:")
        for path, count in stats['pathogenicity_distribution'].items():
            percentage = (count / stats['total_variants']) * 100
            print(f"   {path}: {count:,} ({percentage:.1f}%)")
        
        print(f"\n🏥 Clinical Priority:")
        for priority, count in stats['clinical_priority_distribution'].items():
            percentage = (count / stats['total_variants']) * 100
            print(f"   {priority}: {count:,} ({percentage:.1f}%)")
        
        print(f"\n⭐ Quality Metrics:")
        print(f"   Mean Quality: {stats['quality_stats']['mean_quality']:.2f}")
        print(f"   Mean CADD: {stats['prediction_scores']['mean_cadd']:.2f}")
        print(f"   Mean SIFT: {stats['prediction_scores']['mean_sift']:.3f}")
        print(f"   Mean PolyPhen: {stats['prediction_scores']['mean_polyphen']:.3f}")
    
    def get_high_priority_variants(self):
        """Get high priority variants for review"""
        if self.variants_df is None:
            return None
        return self.analyzer.filter_high_priority_variants(self.variants_df)
    
    def export_results(self, format="csv", filename=None):
        """Export analysis results in various formats"""
        if self.variants_df is None:
            print("No data to export. Run analysis first.")
            return False
        
        if filename is None:
            filename = f"variant_analysis_results.{format}"
        
        filepath = self.working_dir / filename
        
        try:
            if format.lower() == "csv":
                self.variants_df.to_csv(filepath, index=False)
            elif format.lower() == "json":
                self.variants_df.to_json(filepath, orient='records', indent=2)
            elif format.lower() == "excel":
                self.variants_df.to_excel(filepath, index=False)
            else:
                print(f"Unsupported format: {format}")
                return False
            
            print(f"✅ Results exported to: {filepath}")
            return True
            
        except Exception as e:
            print(f"❌ Export failed: {e}")
            return False


def main():
    """Main execution function"""
    print("🧬 Genomic Variant Analysis Pipeline")
    print("=" * 40)
    
    # Initialize pipeline
    pipeline = GenomicVariantPipeline()
    
    # Interactive mode
    print("\nAvailable data sources:")
    print("1. ClinVar (clinical variants)")
    print("2. 1000 Genomes Chr22 (population variants)")
    print("3. gnomAD Exomes (population database)")
    print("4. Custom VCF file")
    
    try:
        choice = input("\nSelect data source (1-4): ").strip()
        
        data_source_map = {
            "1": "clinvar",
            "2": "1000genomes", 
            "3": "gnomad",
            "4": None
        }
        
        if choice == "4":
            vcf_path = input("Enter VCF file path: ").strip()
            data_source = vcf_path
        else:
            data_source = data_source_map.get(choice, "clinvar")
        
        # Run analysis
        results = pipeline.run_analysis(data_source)
        
        if results is not None:
            # Display summary
            pipeline.display_summary()
            
            # Show high priority variants
            high_priority = pipeline.get_high_priority_variants()
            if len(high_priority) > 0:
                print(f"\n🔴 Found {len(high_priority)} high priority variants")
                print("Top 5 high priority variants:")
                print(high_priority[['CHROM', 'POS', 'REF', 'ALT', 'pathogenicity', 'CADD_PHRED']].head())
            
            # Export option
            export_choice = input("\nExport results? (y/n): ").strip().lower()
            if export_choice == 'y':
                format_choice = input("Format (csv/json/excel): ").strip().lower()
                pipeline.export_results(format_choice)
        
    except KeyboardInterrupt:
        print("\n\nAnalysis interrupted by user.")
    except Exception as e:
        print(f"\n❌ Error during analysis: {e}")


if __name__ == "__main__":
    main()
