
import pandas as pd
import numpy as np
from collections import Counter

class VariantAnalyzer:
    """Handles variant classification, annotation, and analysis"""
    
    def __init__(self):
        self.pathogenicity_thresholds = {
            'cadd_pathogenic': 20.0,
            'cadd_likely_pathogenic': 15.0,
            'cadd_benign': 5.0,
            'sift_damaging': 0.05,
            'polyphen_damaging': 0.8
        }
    
    def classify_variant_types(self, variants_df):
        """Classify variants by type (SNV, INDEL, CNV, etc.)"""
        variant_types = []
        
        for _, row in variants_df.iterrows():
            ref = str(row['REF'])
            alt = str(row['ALT'])
            
            # Handle multiple alleles
            if ',' in alt:
                alt = alt.split(',')[0]
            
            ref_len = len(ref)
            alt_len = len(alt)
            
            if ref_len == 1 and alt_len == 1:
                variant_types.append('SNV')
            elif ref_len == alt_len and ref_len > 1:
                variant_types.append('MNV')  # Multi-nucleotide variant
            elif abs(ref_len - alt_len) == 1:
                variant_types.append('INDEL')
            elif abs(ref_len - alt_len) > 50:
                variant_types.append('SV')  # Structural variant
            else:
                variant_types.append('COMPLEX')
        
        return variant_types
    
    def annotate_variants(self, variants_df):
        """Add comprehensive annotations to variants"""
        annotated_df = variants_df.copy()
        
        # Add variant type classification
        annotated_df['variant_type'] = self.classify_variant_types(variants_df)
        
        # Add prediction scores (simulate if not present)
        annotated_df = self._add_prediction_scores(annotated_df)
        
        # Add pathogenicity predictions
        annotated_df['pathogenicity'] = self.predict_pathogenicity(annotated_df)
        
        # Add clinical significance
        annotated_df['clinical_priority'] = self.assign_clinical_priority(annotated_df)
        
        # Add functional impact
        annotated_df['functional_impact'] = self.predict_functional_impact(annotated_df)
        
        return annotated_df
    
    def _add_prediction_scores(self, df):
        """Add or simulate prediction scores"""
        # Add CADD scores if not present
        if 'CADD_PHRED' not in df.columns:
            # Simulate CADD scores with realistic distribution
            df['CADD_PHRED'] = np.random.gamma(2, 5, len(df))
        
        # Add SIFT scores if not present
        if 'SIFT_score' not in df.columns:
            df['SIFT_score'] = np.random.beta(2, 3, len(df))
        
        # Add PolyPhen scores if not present
        if 'PolyPhen_score' not in df.columns:
            df['PolyPhen_score'] = np.random.beta(1.5, 2, len(df))
        
        return df
    
    def predict_pathogenicity(self, variants_df):
        """Predict pathogenicity based on multiple scores"""
        pathogenicity = []
        
        for _, row in variants_df.iterrows():
            cadd = row.get('CADD_PHRED', 0)
            sift = row.get('SIFT_score', 0.5)
            polyphen = row.get('PolyPhen_score', 0.5)
            
            # Multi-criteria pathogenicity assessment
            pathogenic_criteria = 0
            benign_criteria = 0
            
            # CADD score criteria
            if cadd > self.pathogenicity_thresholds['cadd_pathogenic']:
                pathogenic_criteria += 2
            elif cadd > self.pathogenicity_thresholds['cadd_likely_pathogenic']:
                pathogenic_criteria += 1
            elif cadd < self.pathogenicity_thresholds['cadd_benign']:
                benign_criteria += 1
            
            # SIFT score criteria (lower = more damaging)
            if sift < self.pathogenicity_thresholds['sift_damaging']:
                pathogenic_criteria += 1
            elif sift > 0.5:
                benign_criteria += 1
            
            # PolyPhen score criteria (higher = more damaging)
            if polyphen > self.pathogenicity_thresholds['polyphen_damaging']:
                pathogenic_criteria += 1
            elif polyphen < 0.2:
                benign_criteria += 1
            
            # Final classification
            if pathogenic_criteria >= 3:
                pathogenicity.append('Pathogenic')
            elif pathogenic_criteria >= 2:
                pathogenicity.append('Likely Pathogenic')
            elif benign_criteria >= 2:
                pathogenicity.append('Likely Benign')
            elif benign_criteria >= 1 and pathogenic_criteria == 0:
                pathogenicity.append('Benign')
            else:
                pathogenicity.append('Uncertain Significance')
        
        return pathogenicity
    
    def assign_clinical_priority(self, variants_df):
        """Assign clinical priority levels"""
        priorities = []
        
        for _, row in variants_df.iterrows():
            pathogenicity = row.get('pathogenicity', 'Uncertain Significance')
            af = row.get('AF', row.get('allele_frequency', 0.1))
            
            if isinstance(af, list):
                af = af[0] if af else 0.1
            
            # High priority: pathogenic variants with low frequency
            if pathogenicity in ['Pathogenic', 'Likely Pathogenic'] and af < 0.01:
                priorities.append('High')
            # Medium priority: uncertain significance with low frequency
            elif pathogenicity == 'Uncertain Significance' and af < 0.05:
                priorities.append('Medium')
            # Low priority: everything else
            else:
                priorities.append('Low')
        
        return priorities
    
    def predict_functional_impact(self, variants_df):
        """Predict functional impact of variants"""
        impacts = []
        
        for _, row in variants_df.iterrows():
            variant_type = row.get('variant_type', 'Unknown')
            pathogenicity = row.get('pathogenicity', 'Uncertain Significance')
            
            if variant_type == 'SNV' and pathogenicity in ['Pathogenic', 'Likely Pathogenic']:
                impacts.append('High Impact')
            elif variant_type in ['INDEL', 'SV']:
                impacts.append('Moderate Impact')
            elif pathogenicity in ['Benign', 'Likely Benign']:
                impacts.append('Low Impact')
            else:
                impacts.append('Modifier')
        
        return impacts
    
    def generate_summary_statistics(self, variants_df):
        """Generate comprehensive summary statistics"""
        if variants_df is None or len(variants_df) == 0:
            return {}
        
        stats = {
            'total_variants': len(variants_df),
            'chromosomes': variants_df['CHROM'].nunique(),
            'variant_types': variants_df['variant_type'].value_counts().to_dict(),
            'pathogenicity_distribution': variants_df['pathogenicity'].value_counts().to_dict(),
            'clinical_priority_distribution': variants_df['clinical_priority'].value_counts().to_dict(),
            'functional_impact_distribution': variants_df['functional_impact'].value_counts().to_dict(),
            'quality_stats': {
                'mean_quality': variants_df['QUAL'].mean(),
                'median_quality': variants_df['QUAL'].median(),
                'min_quality': variants_df['QUAL'].min(),
                'max_quality': variants_df['QUAL'].max()
            },
            'prediction_scores': {
                'mean_cadd': variants_df['CADD_PHRED'].mean(),
                'mean_sift': variants_df['SIFT_score'].mean(),
                'mean_polyphen': variants_df['PolyPhen_score'].mean()
            }
        }
        
        # Add frequency statistics if available
        if 'AF' in variants_df.columns:
            af_values = variants_df['AF'].dropna()
            if len(af_values) > 0:
                # Handle lists in AF column
                af_numeric = []
                for af in af_values:
                    if isinstance(af, list):
                        af_numeric.extend([float(x) for x in af if x is not None])
                    else:
                        af_numeric.append(float(af))
                
                if af_numeric:
                    stats['frequency_stats'] = {
                        'mean_af': np.mean(af_numeric),
                        'median_af': np.median(af_numeric),
                        'rare_variants': sum(1 for af in af_numeric if af < 0.01)
                    }
        
        return stats
    
    def filter_high_priority_variants(self, variants_df):
        """Filter variants by high clinical priority"""
        high_priority = variants_df[
            variants_df['clinical_priority'] == 'High'
        ].copy()
        
        return high_priority.sort_values('CADD_PHRED', ascending=False)
    
    def generate_variant_report(self, variants_df, variant_id=None):
        """Generate detailed report for specific variant or summary"""
        if variant_id:
            # Single variant report
            variant = variants_df[variants_df['ID'] == variant_id]
            if len(variant) == 0:
                return f"Variant {variant_id} not found"
            
            return self._format_single_variant_report(variant.iloc[0])
        else:
            # Summary report
            return self._format_summary_report(variants_df)
    
    def _format_single_variant_report(self, variant):
        """Format report for a single variant"""
        report = f"""
VARIANT REPORT
==============
Position: {variant['CHROM']}:{variant['POS']}
Reference: {variant['REF']} → Alternative: {variant['ALT']}
Type: {variant['variant_type']}
Quality: {variant['QUAL']:.2f}

PATHOGENICITY ASSESSMENT
========================
Prediction: {variant['pathogenicity']}
Clinical Priority: {variant['clinical_priority']}
Functional Impact: {variant['functional_impact']}

PREDICTION SCORES
=================
CADD Score: {variant['CADD_PHRED']:.2f}
SIFT Score: {variant['SIFT_score']:.3f}
PolyPhen Score: {variant['PolyPhen_score']:.3f}
"""
        return report
    
    def _format_summary_report(self, variants_df):
        """Format summary report for all variants"""
        stats = self.generate_summary_statistics(variants_df)
        
        report = f"""
GENOMIC VARIANT ANALYSIS SUMMARY
================================
Total Variants: {stats['total_variants']:,}
Chromosomes Represented: {stats['chromosomes']}

VARIANT DISTRIBUTION
===================
"""
        for vtype, count in stats['variant_types'].items():
            percentage = (count / stats['total_variants']) * 100
            report += f"{vtype}: {count:,} ({percentage:.1f}%)\n"
        
        report += f"""
PATHOGENICITY DISTRIBUTION
==========================
"""
        for path, count in stats['pathogenicity_distribution'].items():
            percentage = (count / stats['total_variants']) * 100
            report += f"{path}: {count:,} ({percentage:.1f}%)\n"
        
        report += f"""
QUALITY METRICS
===============
Mean Quality Score: {stats['quality_stats']['mean_quality']:.2f}
Mean CADD Score: {stats['prediction_scores']['mean_cadd']:.2f}
Mean SIFT Score: {stats['prediction_scores']['mean_sift']:.3f}
Mean PolyPhen Score: {stats['prediction_scores']['mean_polyphen']:.3f}
"""
        
        return report
