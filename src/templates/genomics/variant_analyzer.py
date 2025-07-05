
import pandas as pd
import numpy as np

class VariantAnalyzer:
    """Handles variant classification and analysis"""
    
    def classify_variant_types(self, variants_df):
        """Classify variants as SNV, INDEL, or CNV based on REF/ALT"""
        variant_types = []
        for _, row in variants_df.iterrows():
            ref_len = len(str(row['REF']))
            alt_len = len(str(row['ALT']))
            
            if ref_len == 1 and alt_len == 1:
                variant_types.append('SNV')
            elif abs(ref_len - alt_len) > 10:
                variant_types.append('CNV')
            else:
                variant_types.append('INDEL')
                
        return variant_types
    
    def predict_pathogenicity(self, variants_df):
        """Predict pathogenicity based on CADD, SIFT, and PolyPhen scores"""
        pathogenicity = []
        
        for _, row in variants_df.iterrows():
            cadd = row['CADD_PHRED']
            sift = row['SIFT_score']
            polyphen = row['PolyPhen_score']
            
            # Pathogenicity scoring logic
            if cadd > 20 and sift < 0.05 and polyphen > 0.8:
                pathogenicity.append('Pathogenic')
            elif cadd > 15 and (sift < 0.1 or polyphen > 0.6):
                pathogenicity.append('Likely Pathogenic')
            elif cadd < 5 and sift > 0.5 and polyphen < 0.2:
                pathogenicity.append('Benign')
            elif cadd < 10 and sift > 0.3 and polyphen < 0.4:
                pathogenicity.append('Likely Benign')
            else:
                pathogenicity.append('Uncertain Significance')
                
        return pathogenicity
    
    def assign_clinical_significance(self, variants_df):
        """Assign clinical significance categories"""
        clinical_sig = []
        
        for _, row in variants_df.iterrows():
            pathogenicity = row['pathogenicity']
            af = row['AF']
            
            if pathogenicity in ['Pathogenic', 'Likely Pathogenic'] and af < 0.01:
                clinical_sig.append('High Priority')
            elif pathogenicity == 'Uncertain Significance' and af < 0.05:
                clinical_sig.append('Medium Priority')
            else:
                clinical_sig.append('Low Priority')
                
        return clinical_sig
    
    def generate_summary_stats(self, variants_df):
        """Generate summary statistics for the dashboard"""
        if variants_df is None:
            print("No data loaded. Please load data first.")
            return None
            
        stats = {
            'total_variants': len(variants_df),
            'total_patients': variants_df['patient_id'].nunique(),
            'avg_variants_per_patient': len(variants_df) / variants_df['patient_id'].nunique(),
            'variant_types': variants_df['variant_type'].value_counts().to_dict(),
            'pathogenicity_distribution': variants_df['pathogenicity'].value_counts().to_dict(),
            'chromosomal_distribution': variants_df['CHROM'].value_counts().to_dict(),
            'high_priority_variants': len(variants_df[variants_df['clinical_significance'] == 'High Priority']),
            'mean_cadd_score': variants_df['CADD_PHRED'].mean(),
            'mean_quality_score': variants_df['QUAL'].mean()
        }
        
        return stats
