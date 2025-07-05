#!/usr/bin/env python3
"""
Genomic Variant Analysis Pipeline
Complete modular system for variant analysis from data acquisition to reporting
"""

import sys
import os
from pathlib import Path

# Import the individual modules directly (without genomics package structure)
from data_downloader import GenomicDataDownloader
from vcf_loader import VCFLoader
from variant_analyzer import VariantAnalyzer

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
    
    def _acquire_data(self, data_source):
        """Acquire data based on source specification - checks for existing files first"""
        data_dir = self.working_dir / "data"
        data_dir.mkdir(exist_ok=True)
        
        # First check if it's a direct file path
        if os.path.exists(data_source):
            print(f"Using local file: {data_source}")
            return data_source
        
        # Check for manually downloaded files in data directory
        if data_source.lower() == "clinvar":
            # Common ClinVar file patterns
            clinvar_patterns = [
                "clinvar*.vcf*",
                "ClinVar*.vcf*", 
                "clinvar_*.vcf*",
                "variant_summary.txt"
            ]
            existing_file = self._find_existing_file(data_dir, clinvar_patterns)
            if existing_file:
                print(f"📁 Found existing ClinVar file: {existing_file}")
                return str(existing_file)
            else:
                print("🔄 No existing ClinVar file found, downloading...")
                return self.downloader.download_clinvar_data()
                
        elif data_source.lower() == "1000genomes":
            # Common 1000 Genomes file patterns
            genomes_patterns = [
                "*chr22*.vcf*",
                "*1000genomes*.vcf*",
                "*1000GP*.vcf*"
            ]
            existing_file = self._find_existing_file(data_dir, genomes_patterns)
            if existing_file:
                print(f"📁 Found existing 1000 Genomes file: {existing_file}")
                return str(existing_file)
            else:
                print("🔄 No existing 1000 Genomes file found, downloading...")
                return self.downloader.download_1000genomes_chr22()
                
        elif data_source.lower() == "gnomad":
            # Common gnomAD file patterns
            gnomad_patterns = [
                "*gnomad*.vcf*",
                "*gnomAD*.vcf*",
                "*exome*.vcf*"
            ]
            existing_file = self._find_existing_file(data_dir, gnomad_patterns)
            if existing_file:
                print(f"📁 Found existing gnomAD file: {existing_file}")
                return str(existing_file)
            else:
                print("🔄 No existing gnomAD file found, downloading...")
                return self.downloader.download_gnomad_exomes()
        else:
            print(f"❌ Unknown data source: {data_source}")
            return None
    
    def _find_existing_file(self, data_dir, patterns):
        """Find existing files matching common patterns"""
        import glob
        
        for pattern in patterns:
            search_path = data_dir / pattern
            matches = glob.glob(str(search_path))
            if matches:
                # Return the first match (most recent by default)
                return Path(matches[0])
        return None
    
    def list_available_files(self):
        """List all VCF files available in the data directory"""
        data_dir = self.working_dir / "data"
        if not data_dir.exists():
            print("📁 Data directory doesn't exist yet")
            return []
        
        vcf_files = []
        for pattern in ["*.vcf", "*.vcf.gz"]:
            vcf_files.extend(data_dir.glob(pattern))
        
        if vcf_files:
            print(f"📁 Found {len(vcf_files)} VCF files in data directory:")
            for i, file in enumerate(vcf_files, 1):
                size_mb = file.stat().st_size / (1024 * 1024)
                print(f"   {i}. {file.name} ({size_mb:.1f} MB)")
        else:
            print("📁 No VCF files found in data directory")
        
        return vcf_files

    def _load_data(self, vcf_file, data_source, max_variants):
        """Load data from VCF file using VCFLoader"""
        print(f"⏳ Loading variants from: {vcf_file}")
        try:
            variants_df = self.loader.load_vcf_data(vcf_file, max_variants)
            print(f"✅ Loaded {len(variants_df):,} variants from {data_source}")
            return variants_df
        except Exception as e:
            print(f"❌ Error loading data: {e}")
            return None

    def _generate_reports(self):
        """Generate analysis reports (text and summary plots)"""
        print("⏳ Generating reports...")
        
        # 1. Text Report
        report_path = self.working_dir / "analysis_report.txt"
        with open(report_path, "w") as f:
            f.write("GENOMIC VARIANT ANALYSIS REPORT\n")
            f.write("=" * 30 + "\n\n")
            
            f.write("Summary Statistics:\n")
            for key, value in self.analysis_results.items():
                f.write(f"  - {key}: {value}\n")
            f.write("\n")
            
            f.write("High Priority Variants (Top 10):\n")
            high_priority = self.get_high_priority_variants()
            for index, row in high_priority.head(10).iterrows():
                f.write(f"  - {row['CHROM']}:{row['POS']} {row['REF']}>{row['ALT']} - {row['pathogenicity']} (CADD: {row['CADD_PHRED']})\n")
        
        print(f"📝 Text report generated: {report_path}")
        
        # 2. Summary Plots (example - you can expand on this)
        plot_path = self.working_dir / "variant_summary.png"
        try:
            import matplotlib.pyplot as plt
            
            # Example: Pathogenicity distribution
            pathogenicity_counts = self.variants_df['pathogenicity'].value_counts()
            pathogenicity_counts.plot(kind='bar', title='Pathogenicity Distribution')
            plt.savefig(plot_path)
            print(f"📊 Summary plot generated: {plot_path}")
            plt.close()
            
        except ImportError:
            print("⚠️ Matplotlib not installed, skipping summary plot generation")
        except Exception as e:
            print(f"❌ Error generating summary plot: {e}")
        
        print("✅ Reports generated")

    def display_summary(self):
        """Display summary of analysis results"""
        print("\n📊 ANALYSIS SUMMARY")
        print("-" * 20)
        for key, value in self.analysis_results.items():
            print(f"  - {key}: {value}")

    def get_high_priority_variants(self, pathogenicity_threshold="likely pathogenic", cadd_threshold=20):
        """Filter variants based on pathogenicity and CADD score"""
        # Prioritize variants with high impact
        high_priority = self.variants_df[
            (self.variants_df['pathogenicity'].isin([pathogenicity_threshold, 'pathogenic'])) &
            (self.variants_df['CADD_PHRED'] > cadd_threshold)
        ].copy()  # Avoid SettingWithCopyWarning
        
        # Sort by CADD score for better ranking
        high_priority.sort_values(by='CADD_PHRED', ascending=False, inplace=True)
        
        return high_priority

    def export_results(self, format="csv"):
        """Export analysis results to a file"""
        file_path = self.working_dir / f"variant_analysis_results.{format}"
        
        try:
            if format == "csv":
                self.variants_df.to_csv(file_path, index=False)
            elif format == "json":
                self.variants_df.to_json(file_path, orient="records")
            elif format == "excel":
                self.variants_df.to_excel(file_path, index=False)
            else:
                print(f"❌ Unsupported format: {format}")
                return
            
            print(f"✅ Results exported to: {file_path}")
        except Exception as e:
            print(f"❌ Error exporting results: {e}")

def main():
    """Main execution function"""
    print("🧬 Genomic Variant Analysis Pipeline")
    print("=" * 40)
    
    # Initialize pipeline
    pipeline = GenomicVariantPipeline()
    
    # Show available files
    available_files = pipeline.list_available_files()
    
    # Interactive mode
    print("\nAvailable data sources:")
    print("1. ClinVar (clinical variants)")
    print("2. 1000 Genomes Chr22 (population variants)")
    print("3. gnomAD Exomes (population database)")
    print("4. Custom VCF file")
    if available_files:
        print("5. Use existing file from data directory")
    
    try:
        choice = input(f"\nSelect data source (1-{5 if available_files else 4}): ").strip()
        
        data_source_map = {
            "1": "clinvar",
            "2": "1000genomes", 
            "3": "gnomad",
            "4": None
        }
        
        if choice == "4":
            vcf_path = input("Enter VCF file path: ").strip()
            data_source = vcf_path
        elif choice == "5" and available_files:
            print("\nAvailable files:")
            for i, file in enumerate(available_files, 1):
                print(f"   {i}. {file.name}")
            file_choice = int(input("Select file number: ")) - 1
            data_source = str(available_files[file_choice])
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
