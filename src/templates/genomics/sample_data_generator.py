
import pandas as pd
import numpy as np

class SampleDataGenerator:
    """Generates realistic sample genomic variant data for demonstration"""
    
    def load_sample_data(self):
        """Load sample variant data for demonstration (50 patients, ~500 variants each)"""
        print("Generating sample genomic variant data...")
        np.random.seed(42)
        
        # Generate 50 patients with varying numbers of variants (around 500 each)
        n_patients = 50
        variants_per_patient = np.random.poisson(505, n_patients)  # Mean ~505 variants per patient
        total_variants = variants_per_patient.sum()  # Should be ~25,247 variants
        
        # Create patient IDs
        patient_ids = []
        for i, n_vars in enumerate(variants_per_patient):
            patient_ids.extend([f'Patient_{i+1:02d}'] * n_vars)
        
        chromosomes = [str(i) for i in range(1, 23)] + ['X', 'Y']
        
        # Generate realistic genomic positions by chromosome
        chrom_sizes = {
            '1': 248956422, '2': 242193529, '3': 198295559, '4': 190214555,
            '5': 181538259, '6': 170805979, '7': 159345973, '8': 145138636,
            '9': 138394717, '10': 133797422, '11': 135086622, '12': 133275309,
            '13': 114364328, '14': 107043718, '15': 101991189, '16': 90338345,
            '17': 83257441, '18': 80373285, '19': 58617616, '20': 64444167,
            '21': 46709983, '22': 50818468, 'X': 156040895, 'Y': 57227415
        }
        
        sample_data = {
            'patient_id': patient_ids,
            'CHROM': np.random.choice(chromosomes, total_variants, 
                                   p=[0.08, 0.08, 0.06, 0.06, 0.06, 0.06, 0.05, 0.05,
                                      0.05, 0.05, 0.05, 0.05, 0.04, 0.04, 0.04, 0.03,
                                      0.03, 0.03, 0.02, 0.02, 0.02, 0.02, 0.04, 0.01]),
            'REF': np.random.choice(['A', 'T', 'G', 'C'], total_variants),
            'ALT': np.random.choice(['A', 'T', 'G', 'C'], total_variants),
            'QUAL': np.random.exponential(35, total_variants),
            'AF': np.random.beta(0.1, 10, total_variants),  # Realistic rare variant frequencies
            'DP': np.random.poisson(52, total_variants),    # Read depth
            'CADD_PHRED': np.random.gamma(1.5, 8, total_variants),  # CADD pathogenicity scores
            'SIFT_score': np.random.beta(2, 3, total_variants),     # SIFT scores (lower = more damaging)
            'PolyPhen_score': np.random.beta(1.5, 3, total_variants) # PolyPhen scores (higher = more damaging)
        }
        
        # Generate positions based on chromosome sizes
        positions = []
        for chrom in sample_data['CHROM']:
            max_pos = chrom_sizes.get(chrom, 100000000)
            pos = np.random.randint(1000, max_pos)
            positions.append(pos)
        sample_data['POS'] = positions
        
        variants_df = pd.DataFrame(sample_data)
        
        # Add variant types with realistic distribution
        variants_df['variant_type'] = np.random.choice(
            ['SNV', 'INDEL', 'CNV'], total_variants, p=[0.85, 0.13, 0.02]
        )
        
        # Add gene annotations (simplified)
        gene_names = ['BRCA1', 'BRCA2', 'TP53', 'KRAS', 'EGFR', 'PIK3CA', 'APC', 'RB1', 
                     'VHL', 'MLH1', 'MSH2', 'ATM', 'CHEK2', 'PALB2', 'CDH1', 'PTEN']
        variants_df['gene'] = np.random.choice(
            gene_names + ['Unknown'] * 20, total_variants, 
            p=[0.03] * len(gene_names) + [0.02] * 20 + [0.48]
        )
        
        print(f"Generated {len(variants_df):,} variants across {n_patients} patients")
        print(f"Average variants per patient: {len(variants_df)/n_patients:.0f}")
        
        return variants_df
