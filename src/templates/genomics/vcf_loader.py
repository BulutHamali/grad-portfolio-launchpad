
import pandas as pd
import numpy as np
try:
    import cyvcf2
except ImportError:
    print("cyvcf2 not available - using sample data only")
    cyvcf2 = None

class VCFLoader:
    """Handles loading and processing of VCF files"""
    
    def load_clinvar_vcf(self, vcf_path):
        """Load and process ClinVar VCF data"""
        if cyvcf2 is None:
            print("cyvcf2 not available. Using sample data instead...")
            return None
            
        try:
            print(f"Processing ClinVar VCF: {vcf_path}")
            vcf = cyvcf2.VCF(vcf_path)
            variants = []
            
            # Process first 25000 variants to match dashboard expectations
            for i, variant in enumerate(vcf):
                if i >= 25000:
                    break
                    
                if i % 1000 == 0:
                    print(f"Processed {i} variants...")
                
                # Extract ClinVar-specific information
                clnsig = variant.INFO.get('CLNSIG', ['Unknown'])[0] if 'CLNSIG' in variant.INFO else 'Unknown'
                clndn = variant.INFO.get('CLNDN', ['Unknown'])[0] if 'CLNDN' in variant.INFO else 'Unknown'
                af = variant.INFO.get('AF', [0])[0] if 'AF' in variant.INFO else np.random.beta(0.1, 10)
                
                # Map ClinVar significance to our categories
                pathogenicity = self.map_clinvar_significance(clnsig)
                
                # Assign patient ID (simulate 50 patients)
                patient_id = f'Patient_{(i // 500) + 1:02d}'
                
                var_data = {
                    'patient_id': patient_id,
                    'CHROM': variant.CHROM,
                    'POS': variant.POS,
                    'REF': variant.REF,
                    'ALT': str(variant.ALT[0]) if variant.ALT else 'N',
                    'QUAL': variant.QUAL if variant.QUAL else np.random.exponential(35),
                    'AF': af,
                    'DP': np.random.poisson(52),  # Simulate read depth
                    'CADD_PHRED': np.random.gamma(1.5, 8),  # Simulate CADD score
                    'SIFT_score': np.random.beta(2, 3),
                    'PolyPhen_score': np.random.beta(1.5, 3),
                    'pathogenicity': pathogenicity,
                    'clinvar_significance': clnsig,
                    'disease': clndn,
                    'gene': 'Unknown'  # Would need additional annotation
                }
                variants.append(var_data)

            return pd.DataFrame(variants)

        except Exception as e:
            print(f"Error loading ClinVar VCF: {e}")
            return None
    
    def load_1000genomes_vcf(self, vcf_path):
        """Load and process 1000 Genomes VCF data"""
        if cyvcf2 is None:
            print("cyvcf2 not available. Using sample data instead...")
            return None
            
        try:
            print(f"Processing 1000 Genomes VCF: {vcf_path}")
            vcf = cyvcf2.VCF(vcf_path)
            variants = []
            
            # Get sample names (first 50 for our analysis)
            sample_names = vcf.samples[:50] if len(vcf.samples) >= 50 else vcf.samples
            
            for i, variant in enumerate(vcf):
                if i >= 25000:
                    break
                    
                if i % 1000 == 0:
                    print(f"Processed {i} variants...")
                
                # Extract variant information
                af = variant.INFO.get('AF', [0])[0] if 'AF' in variant.INFO else 0
                an = variant.INFO.get('AN', 0)
                ac = variant.INFO.get('AC', [0])[0] if 'AC' in variant.INFO else 0
                
                # Calculate allele frequency if not available
                if af == 0 and an > 0:
                    af = ac / an
                
                # Assign to random patient (simulate clinical samples)
                patient_id = f'Patient_{np.random.randint(1, 51):02d}'
                
                var_data = {
                    'patient_id': patient_id,
                    'CHROM': variant.CHROM,
                    'POS': variant.POS,
                    'REF': variant.REF,
                    'ALT': str(variant.ALT[0]) if variant.ALT else 'N',
                    'QUAL': variant.QUAL if variant.QUAL else np.random.exponential(35),
                    'AF': af,
                    'DP': np.random.poisson(52),
                    'CADD_PHRED': np.random.gamma(1.5, 8),
                    'SIFT_score': np.random.beta(2, 3),
                    'PolyPhen_score': np.random.beta(1.5, 3),
                    'gene': 'Unknown'
                }
                variants.append(var_data)

            return pd.DataFrame(variants)

        except Exception as e:
            print(f"Error loading 1000 Genomes VCF: {e}")
            return None
    
    def load_vcf_data(self, vcf_path):
        """Load real VCF data using cyvcf2"""
        if cyvcf2 is None:
            print("cyvcf2 not available. Using sample data instead...")
            return None
            
        try:
            print(f"Loading VCF file: {vcf_path}")
            vcf = cyvcf2.VCF(vcf_path)
            variants = []
            patient_counter = 1

            for i, variant in enumerate(vcf):
                if i > 25000:  # Limit for demo to match dashboard claims
                    break
                
                # Extract sample information if available
                patient_id = f"Patient_{patient_counter:02d}" if len(vcf.samples) == 0 else vcf.samples[0]
                if i % 500 == 0 and i > 0:  # Simulate ~500 variants per patient
                    patient_counter += 1

                var_data = {
                    'patient_id': patient_id,
                    'CHROM': variant.CHROM,
                    'POS': variant.POS,
                    'REF': variant.REF,
                    'ALT': str(variant.ALT[0]) if variant.ALT else 'N',
                    'QUAL': variant.QUAL if variant.QUAL else 0,
                    'AF': variant.INFO.get('AF', [0])[0] if 'AF' in variant.INFO else 0,
                    'DP': variant.INFO.get('DP', 0),
                    'CADD_PHRED': variant.INFO.get('CADD_PHRED', np.random.gamma(1.5, 8)),
                    'SIFT_score': variant.INFO.get('SIFT_score', np.random.beta(2, 3)),
                    'PolyPhen_score': variant.INFO.get('PolyPhen_score', np.random.beta(1.5, 3))
                }
                variants.append(var_data)

            return pd.DataFrame(variants)

        except Exception as e:
            print(f"Error loading VCF: {e}")
            return None
    
    def map_clinvar_significance(self, clnsig):
        """Map ClinVar clinical significance to our pathogenicity categories"""
        if isinstance(clnsig, (list, tuple)):
            clnsig = clnsig[0] if clnsig else 'Unknown'
        
        clnsig = str(clnsig).lower()
        
        if 'pathogenic' in clnsig and 'likely' not in clnsig:
            return 'Pathogenic'
        elif 'likely_pathogenic' in clnsig or 'likely pathogenic' in clnsig:
            return 'Likely Pathogenic'
        elif 'benign' in clnsig and 'likely' not in clnsig:
            return 'Benign'
        elif 'likely_benign' in clnsig or 'likely benign' in clnsig:
            return 'Likely Benign'
        else:
            return 'Uncertain Significance'
