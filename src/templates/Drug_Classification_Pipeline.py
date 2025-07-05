
# Complete Machine Learning Pipeline Template for Google Colab
# Professional version - clean, focused analysis

# Install required packages
#!pip install pandas numpy matplotlib seaborn scikit-learn plotly xgboost

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import warnings
warnings.filterwarnings('ignore')

from MLAnalyzer import MLAnalyzer

# MAIN MACHINE LEARNING PIPELINE
print("COMPLETE MACHINE LEARNING ANALYSIS PIPELINE")
print("="*60)

# Initialize analyzer
analyzer = MLAnalyzer()

# Load dataset (try different datasets: 'iris', 'drug', 'breast_cancer')
print("\n1. LOADING DATASET...")
dataset_choice = 'drug'  # Change this to try different datasets
data = analyzer.load_dataset(dataset_choice)

# Explore the data
print("\n2. EXPLORING DATA...")
analyzer.explore_data()

# Prepare data for ML
print("\n3. PREPARING DATA...")
analyzer.prepare_data(test_size=0.2, scale_features=True)

# Train multiple models
print("\n4. TRAINING MODELS...")
analyzer.train_models()

# Create visualizations
print("\n5. CREATING VISUALIZATIONS...")
analyzer.create_visualizations()

# Hyperparameter tuning (optional)
print("\n6. HYPERPARAMETER TUNING...")
best_tuned_model = analyzer.hyperparameter_tuning('Random Forest')

# Generate comprehensive report
print("\n7. GENERATING REPORT...")
analyzer.generate_report()

print("\nMACHINE LEARNING ANALYSIS COMPLETE!")
print("\nNext Steps:")
print("• Try different datasets by changing 'dataset_choice' variable")
print("• Available datasets: 'iris', 'drug', 'breast_cancer'")
print("• Experiment with different models and hyperparameters")
print("• Add feature engineering techniques")
print("• Try ensemble methods for better performance")
print("• Deploy the best model for predictions")
