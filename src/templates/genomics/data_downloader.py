
import requests
import os
from pathlib import Path

class GenomicDataDownloader:
    """Handles downloading of genomic datasets from public repositories"""
    
    def __init__(self, download_dir="genomic_data"):
        self.download_dir = Path(download_dir)
        self.download_dir.mkdir(exist_ok=True)
    
    def download_file(self, url, filename, description="file"):
        """Generic file downloader with progress tracking"""
        filepath = self.download_dir / filename
        
        if filepath.exists():
            print(f"{filename} already exists, skipping download")
            return str(filepath)
        
        print(f"Downloading {description}...")
        
        try:
            response = requests.get(url, stream=True)
            response.raise_for_status()
            
            total_size = int(response.headers.get('content-length', 0))
            downloaded = 0
            
            with open(filepath, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    if chunk:
                        f.write(chunk)
                        downloaded += len(chunk)
                        if total_size > 0:
                            percent = (downloaded / total_size) * 100
                            print(f"\rProgress: {percent:.1f}%", end="", flush=True)
            
            print(f"\nDownload complete: {filepath}")
            return str(filepath)
            
        except Exception as e:
            print(f"Error downloading {description}: {e}")
            return None
    
    def download_clinvar_data(self):
        """Download ClinVar VCF data (clinical variants)"""
        url = "https://ftp.ncbi.nlm.nih.gov/pub/clinvar/vcf_GRCh38/clinvar.vcf.gz"
        return self.download_file(url, "clinvar.vcf.gz", "ClinVar dataset")
    
    def download_1000genomes_chr22(self):
        """Download 1000 Genomes chromosome 22 data"""
        url = "http://ftp.1000genomes.ebi.ac.uk/vol1/ftp/release/20130502/ALL.chr22.phase3_shapeit2_mvncall_integrated_v5b.20130502.genotypes.vcf.gz"
        return self.download_file(url, "1000genomes_chr22.vcf.gz", "1000 Genomes Chr22 dataset")
    
    def download_gnomad_exomes(self):
        """Download gnomAD exomes subset"""
        url = "https://storage.googleapis.com/gcp-public-data--gnomad/release/2.1.1/vcf/exomes/gnomad.exomes.r2.1.1.sites.1.vcf.bgz"
        return self.download_file(url, "gnomad_exomes_chr1.vcf.gz", "gnomAD exomes Chr1 dataset")
