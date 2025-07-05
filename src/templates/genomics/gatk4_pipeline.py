
import subprocess
import os
import sys
from pathlib import Path

class GATK4Pipeline:
    """Python wrapper for GATK4 germline variant calling pipeline"""
    
    def __init__(self, base_dir="genomic_analysis"):
        self.base_dir = Path(base_dir)
        self.script_path = Path(__file__).parent / "gatk4_variant_calling.sh"
        
    def check_prerequisites(self):
        """Check if required tools are installed"""
        required_tools = ["wget", "fastqc", "bwa", "gatk", "samtools"]
        missing_tools = []
        
        for tool in required_tools:
            try:
                subprocess.run([tool, "--version"], capture_output=True, check=True)
                print(f"✅ {tool} is installed")
            except (subprocess.CalledProcessError, FileNotFoundError):
                missing_tools.append(tool)
                print(f"❌ {tool} is not installed or not in PATH")
        
        if missing_tools:
            print("\nMissing tools:", ", ".join(missing_tools))
            print("\nPlease install the missing tools before running the pipeline:")
            print("- GATK4: https://gatk.broadinstitute.org/hc/en-us/articles/360036194592")
            print("- BWA: https://github.com/lh3/bwa")
            print("- SAMtools: https://github.com/samtools/samtools")
            print("- FastQC: https://www.bioinformatics.babraham.ac.uk/projects/fastqc/")
            return False
        
        return True
    
    def run_pipeline(self, sample_id="SRR062634"):
        """Execute the GATK4 variant calling pipeline"""
        print("=== GATK4 Germline Variant Calling Pipeline ===")
        print(f"Sample ID: {sample_id}")
        print(f"Working directory: {self.base_dir.absolute()}")
        
        # Check prerequisites
        if not self.check_prerequisites():
            return False
        
        # Make script executable
        os.chmod(self.script_path, 0o755)
        
        try:
            # Run the bash script
            process = subprocess.Popen(
                [str(self.script_path)],
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                bufsize=1,
                universal_newlines=True
            )
            
            # Stream output in real-time
            for line in process.stdout:
                print(line.strip())
            
            # Wait for completion
            return_code = process.wait()
            
            if return_code == 0:
                print("\n🎉 Pipeline completed successfully!")
                self._display_results()
                return True
            else:
                print(f"\n❌ Pipeline failed with return code: {return_code}")
                return False
                
        except Exception as e:
            print(f"❌ Error running pipeline: {e}")
            return False
    
    def _display_results(self):
        """Display information about generated results"""
        results_dir = self.base_dir / "results"
        
        if results_dir.exists():
            print(f"\n📊 Results Summary:")
            print(f"Results directory: {results_dir.absolute()}")
            
            # List generated files
            vcf_files = list(results_dir.glob("*.vcf"))
            if vcf_files:
                print("\nGenerated VCF files:")
                for vcf_file in vcf_files:
                    size = vcf_file.stat().st_size / 1024  # KB
                    print(f"  - {vcf_file.name} ({size:.1f} KB)")
            
            # Show basic statistics if raw_variants.vcf exists
            raw_variants = results_dir / "raw_variants.vcf"
            if raw_variants.exists():
                try:
                    with open(raw_variants) as f:
                        variant_count = sum(1 for line in f if not line.startswith('#'))
                    print(f"\nTotal variants called: {variant_count:,}")
                except Exception as e:
                    print(f"Could not count variants: {e}")
    
    def get_pipeline_info(self):
        """Get information about the pipeline"""
        return {
            "name": "GATK4 Germline Variant Calling",
            "description": "Complete pipeline for calling germline variants from WGS paired-end reads",
            "workflow": "GATK4 Best Practices",
            "steps": [
                "Quality Control (FastQC)",
                "Alignment (BWA-MEM)", 
                "Mark Duplicates & Sort",
                "Base Quality Recalibration",
                "Collect Metrics",
                "Variant Calling (HaplotypeCaller)",
                "Variant Filtering (SNPs/INDELs)"
            ],
            "input": "Paired-end FASTQ files",
            "output": "VCF files with called variants",
            "reference": "hg38 human reference genome"
        }

def main():
    """Main function to run the pipeline"""
    pipeline = GATK4Pipeline()
    
    print("GATK4 Germline Variant Calling Pipeline")
    print("=" * 50)
    
    # Display pipeline info
    info = pipeline.get_pipeline_info()
    print(f"Description: {info['description']}")
    print(f"Workflow: {info['workflow']}")
    print("\nPipeline Steps:")
    for i, step in enumerate(info['steps'], 1):
        print(f"  {i}. {step}")
    
    print(f"\nInput: {info['input']}")
    print(f"Output: {info['output']}")
    print(f"Reference: {info['reference']}")
    
    # Ask user if they want to proceed
    proceed = input("\nDo you want to run the pipeline? (y/n): ").lower().strip()
    
    if proceed in ['y', 'yes']:
        success = pipeline.run_pipeline()
        if success:
            print("\n✅ Pipeline execution completed successfully!")
        else:
            print("\n❌ Pipeline execution failed!")
            sys.exit(1)
    else:
        print("Pipeline execution cancelled.")

if __name__ == "__main__":
    main()
