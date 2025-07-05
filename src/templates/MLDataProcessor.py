
import pandas as pd
import numpy as np
from sklearn.datasets import load_iris, load_breast_cancer
from sklearn.preprocessing import StandardScaler, LabelEncoder

class MLDataProcessor:
    def __init__(self):
        self.scaler = StandardScaler()
        self.label_encoders = {}
        
    def create_drug_dataset(self):
        """Create synthetic drug classification dataset"""
        np.random.seed(42)
        
        # Generate synthetic patient data
        n_samples = 1000
        
        # Age (20-70 years)
        age = np.random.randint(20, 71, n_samples)
        
        # Sex (M/F)
        sex = np.random.choice(['M', 'F'], n_samples)
        
        # Blood Pressure (LOW, NORMAL, HIGH)
        bp = np.random.choice(['LOW', 'NORMAL', 'HIGH'], n_samples, p=[0.2, 0.6, 0.2])
        
        # Cholesterol (NORMAL, HIGH)
        cholesterol = np.random.choice(['NORMAL', 'HIGH'], n_samples, p=[0.7, 0.3])
        
        # Sodium to Potassium ratio (continuous)
        na_to_k = np.random.normal(15, 5, n_samples)
        na_to_k = np.clip(na_to_k, 5, 35)  # Realistic range
        
        # Create drug assignment logic based on patient characteristics
        drugs = []
        for i in range(n_samples):
            # Drug assignment logic (simplified medical decision tree)
            if bp[i] == 'HIGH':
                if cholesterol[i] == 'HIGH':
                    if na_to_k[i] > 20:
                        drug = 'drugY'
                    else:
                        drug = 'drugX'
                else:
                    if age[i] > 50:
                        drug = 'drugC'
                    else:
                        drug = 'drugA'
            elif bp[i] == 'LOW':
                if age[i] < 30:
                    drug = 'drugA'
                else:
                    drug = 'drugB'
            else:  # NORMAL BP
                if cholesterol[i] == 'HIGH' and na_to_k[i] > 18:
                    drug = 'drugC'
                else:
                    drug = 'drugA'
            
            drugs.append(drug)
        
        # Create DataFrame
        data = pd.DataFrame({
            'Age': age,
            'Sex': sex,
            'BP': bp,
            'Cholesterol': cholesterol,
            'Na_to_K': na_to_k,
            'Drug': drugs
        })
        
        return data
        
    def load_dataset(self, dataset_name='iris'):
        """Load various datasets for analysis"""
        
        if dataset_name == 'iris':
            data = load_iris()
            X = pd.DataFrame(data.data, columns=data.feature_names)
            y = pd.Series(data.target, name='target')
            target_names = data.target_names
            dataset_info = {
                'name': 'Iris Flower Classification',
                'type': 'Classification',
                'classes': 3,
                'features': 4,
                'samples': len(X)
            }
            # Create combined dataframe
            combined_data = pd.concat([X, y], axis=1)
            
        elif dataset_name == 'drug':
            # Create drug classification dataset
            combined_data = self.create_drug_dataset()
            
            # Encode categorical variables
            categorical_cols = ['Sex', 'BP', 'Cholesterol']
            
            # Create a copy for processing
            data_encoded = combined_data.copy()
            
            for col in categorical_cols:
                le = LabelEncoder()
                data_encoded[col] = le.fit_transform(combined_data[col])
                self.label_encoders[col] = le
            
            # Separate features and target
            X = data_encoded.drop('Drug', axis=1)
            
            # Encode target variable
            le_target = LabelEncoder()
            y = pd.Series(le_target.fit_transform(combined_data['Drug']), name='Drug')
            self.label_encoders['Drug'] = le_target
            target_names = le_target.classes_
            
            dataset_info = {
                'name': 'Drug Classification for Patients',
                'type': 'Multiclass Classification',
                'classes': len(target_names),
                'features': len(X.columns),
                'samples': len(X)
            }
            
        elif dataset_name == 'breast_cancer':
            data = load_breast_cancer()
            X = pd.DataFrame(data.data, columns=data.feature_names)
            y = pd.Series(data.target, name='target')
            target_names = data.target_names
            dataset_info = {
                'name': 'Breast Cancer Detection',
                'type': 'Binary Classification',
                'classes': 2,
                'features': 30,
                'samples': len(X)
            }
            # Create combined dataframe
            combined_data = pd.concat([X, y], axis=1)
        
        print(f"Loaded {dataset_info['name']} dataset")
        print(f"   {dataset_info['samples']} samples, {dataset_info['features']} features")
        print(f"   {dataset_info['classes']} classes: {list(target_names)}")
        
        return combined_data, X, y, target_names, dataset_info
    
    def explore_data_info(self, data, X, y, target_names):
        """Print basic data exploration information"""
        print("DATA EXPLORATION")
        print("=" * 50)
        
        # Basic info
        print(f"\nDataset Shape: {data.shape}")
        print(f"Missing Values: {data.isnull().sum().sum()}")
        
        # Show sample data
        print(f"\nSample Data:")
        print(data.head(10))
        
        # Statistical summary
        print(f"\nStatistical Summary:")
        print(data.describe())
        
        # Target distribution
        print(f"\nTarget Distribution:")
        if 'Drug' in data.columns:
            drug_counts = data['Drug'].value_counts()
            for drug, count in drug_counts.items():
                print(f"   {drug}: {count} ({count/len(data)*100:.1f}%)")
        else:
            target_counts = y.value_counts()
            for i, count in enumerate(target_counts):
                class_name = target_names[i] if target_names is not None else f"Class {i}"
                print(f"   {class_name}: {count} ({count/len(y)*100:.1f}%)")
        
        return pd.concat([X, y], axis=1).corr()
