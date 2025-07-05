
import requests
import numpy as np
import pandas as pd

class GenomicDataDownloader:
    """Handles downloading of genomic datasets from public repositories"""
    
    def download_clinvar_data(self):
        """Download ClinVar VCF data (clinical variants)"""
        print("Downloading ClinVar dataset...")
        clinvar_url = "https://ftp.ncbi.nlm.nih.gov/pub/clinvar/vcf_GRCh38/clinvar.vcf.gz"
        local_filename = "clinvar.vcf.gz"
        
        try:
            # Download with progress tracking
            response = requests.get(clinvar_url, stream=True)
            response.raise_for_status()
            
            total_size = int(response.headers.get('content-length', 0))
            downloaded = 0
            
            with open(local_filename, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    if chunk:
                        f.write(chunk)
                        downloaded += len(chunk)
                        if total_size > 0:
                            percent = (downloaded / total_size) * 100
                            print(f"\rDownloading: {percent:.1f}%", end="", flush=True)
            
            print(f"\nDownloaded ClinVar data: {local_filename}")
            return local_filename
            
        except Exception as e:
            print(f"Error downloading ClinVar data: {e}")
            return None
    
    def download_1000genomes_chr22(self):
        """Download 1000 Genomes chromosome 22 data (smaller subset)"""
        print("Downloading 1000 Genomes Chromosome 22 dataset...")
        chr22_url = "http://ftp.1000genomes.ebi.ac.uk/vol1/ftp/release/20130502/ALL.chr22.phase3_shapeit2_mvncall_integrated_v5b.20130502.genotypes.vcf.gz"
        local_filename = "1000genomes_chr22.vcf.gz"
        
        try:
            response = requests.get(chr22_url, stream=True)
            response.raise_for_status()
            
            total_size = int(response.headers.get('content-length', 0))
            downloaded = 0
            
            with open(local_filename, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    if chunk:
                        f.write(chunk)
                        downloaded += len(chunk)
                        if total_size > 0:
                            percent = (downloaded / total_size) * 100
                            print(f"\rDownloading: {percent:.1f}%", end="", flush=True)
            
            print(f"\nDownloaded 1000 Genomes Chr22 data: {local_filename}")
            return local_filename
            
        except Exception as e:
            print(f"Error downloading 1000 Genomes data: {e}")
            return None
