
import pandas as pd
import numpy as np
import gzip
import re

class VCFLoader:
    """Handles loading and processing of VCF files"""
    
    def __init__(self):
        self.supported_formats = ['.vcf', '.vcf.gz', '.bcf']
    
    def load_vcf_data(self, filepath, max_variants=25000):
        """Load VCF file and convert to pandas DataFrame - main method called by pipeline"""
        return self.load_vcf_file(filepath, max_variants)
    
    def load_vcf_file(self, filepath, max_variants=25000):
        """Load VCF file and convert to pandas DataFrame"""
        print(f"Loading VCF file: {filepath}")
        
        try:
            # Determine if file is compressed and handle accordingly
            is_compressed = filepath.endswith('.gz')
            
            variants = []
            header_info = {}
            
            # Open file with appropriate method
            if is_compressed:
                file_handle = gzip.open(filepath, 'rt', encoding='utf-8')
            else:
                file_handle = open(filepath, 'r', encoding='utf-8')
            
            with file_handle as f:
                # Parse header
                for line in f:
                    if line.startswith('##'):
                        self._parse_header_line(line, header_info)
                        continue
                    elif line.startswith('#CHROM'):
                        # Column headers
                        columns = line.strip().split('\t')
                        sample_names = columns[9:] if len(columns) > 9 else []
                        break
                
                # Parse variants
                variant_count = 0
                for line in f:
                    if variant_count >= max_variants:
                        break
                    
                    variant_data = self._parse_variant_line(line.strip(), sample_names)
                    if variant_data:
                        variants.append(variant_data)
                        variant_count += 1
                    
                    if variant_count % 1000 == 0:
                        print(f"Processed {variant_count} variants...")
            
            df = pd.DataFrame(variants)
            print(f"Successfully loaded {len(df)} variants")
            return df
            
        except Exception as e:
            print(f"Error loading VCF file: {e}")
            return None
    
    def _parse_header_line(self, line, header_info):
        """Parse VCF header lines for metadata"""
        if line.startswith('##INFO='):
            # Extract INFO field definitions
            match = re.search(r'ID=([^,]+)', line)
            if match:
                info_id = match.group(1)
                header_info[f'INFO_{info_id}'] = line
    
    def _parse_variant_line(self, line, sample_names):
        """Parse a single variant line"""
        fields = line.split('\t')
        if len(fields) < 8:
            return None
        
        # Basic variant information
        variant_data = {
            'CHROM': fields[0],
            'POS': int(fields[1]),
            'ID': fields[2] if fields[2] != '.' else None,
            'REF': fields[3],
            'ALT': fields[4],
            'QUAL': float(fields[5]) if fields[5] != '.' else 0.0,
            'FILTER': fields[6],
            'INFO': fields[7]
        }
        
        # Parse INFO field
        info_dict = self._parse_info_field(fields[7])
        variant_data.update(info_dict)
        
        # Add sample information if available
        if len(fields) > 9 and sample_names:
            variant_data['samples'] = dict(zip(sample_names, fields[9:]))
        
        return variant_data
    
    def _parse_info_field(self, info_string):
        """Parse the INFO field into individual components"""
        info_dict = {}
        
        for item in info_string.split(';'):
            if '=' in item:
                key, value = item.split('=', 1)
                # Try to convert to appropriate type
                if ',' in value:
                    # Multiple values
                    values = value.split(',')
                    try:
                        info_dict[key] = [float(v) for v in values]
                    except ValueError:
                        info_dict[key] = values
                else:
                    # Single value
                    try:
                        info_dict[key] = float(value)
                    except ValueError:
                        info_dict[key] = value
            else:
                # Flag (boolean)
                info_dict[item] = True
        
        return info_dict
    
    def load_clinvar_vcf(self, filepath):
        """Specialized loader for ClinVar data"""
        df = self.load_vcf_file(filepath)
        if df is None:
            return None
        
        # Add ClinVar-specific processing
        df = self._process_clinvar_annotations(df)
        return df
    
    def load_1000genomes_vcf(self, filepath):
        """Specialized loader for 1000 Genomes data"""
        df = self.load_vcf_file(filepath)
        if df is None:
            return None
        
        # Add 1000 Genomes-specific processing
        df = self._process_1000genomes_annotations(df)
        return df
    
    def _process_clinvar_annotations(self, df):
        """Process ClinVar-specific annotations"""
        # Extract clinical significance
        if 'CLNSIG' in df.columns:
            df['clinical_significance_raw'] = df['CLNSIG']
        
        # Extract disease names
        if 'CLNDN' in df.columns:
            df['disease_name'] = df['CLNDN']
        
        # Extract gene symbols
        if 'GENEINFO' in df.columns:
            df['gene_info'] = df['GENEINFO']
        
        return df
    
    def _process_1000genomes_annotations(self, df):
        """Process 1000 Genomes-specific annotations"""
        # Extract allele frequencies
        if 'AF' in df.columns:
            df['allele_frequency'] = df['AF']
        
        # Extract allele counts
        if 'AC' in df.columns:
            df['allele_count'] = df['AC']
        
        if 'AN' in df.columns:
            df['total_alleles'] = df['AN']
        
        return df
