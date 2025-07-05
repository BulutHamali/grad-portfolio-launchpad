
# Complete Machine Learning Pipeline Template for Google Colab
# This template demonstrates classification with medical focus

# Install required packages
!pip install pandas numpy matplotlib seaborn scikit-learn plotly xgboost

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots

# Machine Learning imports
from sklearn.datasets import load_iris, load_breast_cancer
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
from sklearn.metrics import (classification_report, confusion_matrix, 
                           accuracy_score, roc_curve, auc, roc_auc_score)
import xgboost as xgb

import warnings
warnings.filterwarnings('ignore')

# Set style
plt.style.use('seaborn-v0_8')
sns.set_palette("husl")

class MLAnalyzer:
    def __init__(self):
        self.data = None
        self.X = None
        self.y = None
        self.X_train = None
        self.X_test = None
        self.y_train = None
        self.y_test = None
        self.models = {}
        self.results = {}
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
            self.X = pd.DataFrame(data.data, columns=data.feature_names)
            self.y = pd.Series(data.target, name='target')
            self.target_names = data.target_names
            self.dataset_info = {
                'name': 'Iris Flower Classification',
                'type': 'Classification',
                'classes': 3,
                'features': 4,
                'samples': len(self.X)
            }
            # Create combined dataframe
            self.data = pd.concat([self.X, self.y], axis=1)
            
        elif dataset_name == 'drug':
            # Create drug classification dataset
            self.data = self.create_drug_dataset()
            
            # Encode categorical variables
            categorical_cols = ['Sex', 'BP', 'Cholesterol']
            
            # Create a copy for processing
            data_encoded = self.data.copy()
            
            for col in categorical_cols:
                le = LabelEncoder()
                data_encoded[col] = le.fit_transform(self.data[col])
                self.label_encoders[col] = le
            
            # Separate features and target
            self.X = data_encoded.drop('Drug', axis=1)
            
            # Encode target variable
            le_target = LabelEncoder()
            self.y = pd.Series(le_target.fit_transform(self.data['Drug']), name='Drug')
            self.label_encoders['Drug'] = le_target
            self.target_names = le_target.classes_
            
            self.dataset_info = {
                'name': 'Drug Classification for Patients',
                'type': 'Multiclass Classification',
                'classes': len(self.target_names),
                'features': len(self.X.columns),
                'samples': len(self.X)
            }
            
        elif dataset_name == 'breast_cancer':
            data = load_breast_cancer()
            self.X = pd.DataFrame(data.data, columns=data.feature_names)
            self.y = pd.Series(data.target, name='target')
            self.target_names = data.target_names
            self.dataset_info = {
                'name': 'Breast Cancer Detection',
                'type': 'Binary Classification',
                'classes': 2,
                'features': 30,
                'samples': len(self.X)
            }
            # Create combined dataframe
            self.data = pd.concat([self.X, self.y], axis=1)
        
        print(f"✅ Loaded {self.dataset_info['name']} dataset")
        print(f"   📊 {self.dataset_info['samples']} samples, {self.dataset_info['features']} features")
        print(f"   🎯 {self.dataset_info['classes']} classes: {list(self.target_names)}")
        
        return self.data
    
    def explore_data(self):
        """Comprehensive data exploration"""
        print("🔍 DATA EXPLORATION")
        print("=" * 50)
        
        # Basic info
        print(f"\n📋 Dataset Shape: {self.data.shape}")
        print(f"📋 Missing Values: {self.data.isnull().sum().sum()}")
        
        # Show sample data
        print(f"\n📋 Sample Data:")
        display(self.data.head(10))
        
        # Statistical summary
        print(f"\n📊 Statistical Summary:")
        display(self.data.describe())
        
        # Target distribution
        print(f"\n🎯 Target Distribution:")
        if 'Drug' in self.data.columns:
            drug_counts = self.data['Drug'].value_counts()
            for drug, count in drug_counts.items():
                print(f"   {drug}: {count} ({count/len(self.data)*100:.1f}%)")
        else:
            target_counts = self.y.value_counts()
            for i, count in enumerate(target_counts):
                class_name = self.target_names[i] if hasattr(self, 'target_names') else f"Class {i}"
                print(f"   {class_name}: {count} ({count/len(self.y)*100:.1f}%)")
        
        # Correlation analysis
        corr_matrix = pd.concat([self.X, self.y], axis=1).corr()
        
        # Visualizations
        self._create_exploration_plots(corr_matrix)
        
    def _create_exploration_plots(self, corr_matrix):
        """Create comprehensive exploration plots"""
        
        # 1. Correlation heatmap
        plt.figure(figsize=(12, 8))
        mask = np.triu(np.ones_like(corr_matrix, dtype=bool))
        sns.heatmap(corr_matrix, annot=True, cmap='coolwarm', center=0, 
                   square=True, fmt='.2f', cbar_kws={"shrink": .8}, mask=mask)
        plt.title('Feature Correlation Matrix')
        plt.tight_layout()
        plt.show()
        
        # 2. Target distribution
        fig, axes = plt.subplots(1, 2, figsize=(15, 5))
        
        # Pie chart
        if 'Drug' in self.data.columns:
            target_counts = self.data['Drug'].value_counts()
            axes[0].pie(target_counts.values, labels=target_counts.index, 
                       autopct='%1.1f%%', startangle=90)
            axes[0].set_title('Drug Distribution')
        else:
            target_counts = self.y.value_counts()
            axes[0].pie(target_counts.values, labels=[self.target_names[i] for i in target_counts.index], 
                       autopct='%1.1f%%', startangle=90)
            axes[0].set_title('Target Class Distribution')
        
        # Bar chart
        axes[1].bar(range(len(target_counts)), target_counts.values, 
                   color=sns.color_palette("husl", len(target_counts)))
        axes[1].set_xlabel('Class')
        axes[1].set_ylabel('Count')
        axes[1].set_title('Target Class Counts')
        axes[1].set_xticks(range(len(target_counts)))
        if 'Drug' in self.data.columns:
            axes[1].set_xticklabels(target_counts.index)
        else:
            axes[1].set_xticklabels([self.target_names[i] for i in target_counts.index])
        
        plt.tight_layout()
        plt.show()
        
        # 3. Feature distributions by class (for first 4 features)
        n_features = min(4, len(self.X.columns))
        fig, axes = plt.subplots(2, 2, figsize=(15, 10))
        axes = axes.ravel()
        
        for i in range(n_features):
            feature = self.X.columns[i]
            for class_idx in self.y.unique():
                class_data = self.X[self.y == class_idx][feature]
                class_name = self.target_names[class_idx] if hasattr(self, 'target_names') else f"Class {class_idx}"
                axes[i].hist(class_data, alpha=0.7, 
                           label=class_name, bins=20)
            axes[i].set_xlabel(feature)
            axes[i].set_ylabel('Frequency')
            axes[i].set_title(f'Distribution of {feature}')
            axes[i].legend()
        
        plt.tight_layout()
        plt.show()
        
    def prepare_data(self, test_size=0.2, scale_features=True):
        """Prepare data for machine learning"""
        
        # Split the data
        self.X_train, self.X_test, self.y_train, self.y_test = train_test_split(
            self.X, self.y, test_size=test_size, random_state=42, stratify=self.y
        )
        
        # Scale features if requested
        if scale_features:
            self.X_train_scaled = self.scaler.fit_transform(self.X_train)
            self.X_test_scaled = self.scaler.transform(self.X_test)
        else:
            self.X_train_scaled = self.X_train
            self.X_test_scaled = self.X_test
            
        print(f"✅ Data prepared:")
        print(f"   Training set: {self.X_train.shape[0]} samples")
        print(f"   Test set: {self.X_test.shape[0]} samples")
        print(f"   Features scaled: {scale_features}")
        
    def train_models(self):
        """Train multiple ML models"""
        
        print("🤖 TRAINING MACHINE LEARNING MODELS")
        print("=" * 50)
        
        # Define models
        models = {
            'Logistic Regression': LogisticRegression(random_state=42, max_iter=1000),
            'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42),
            'XGBoost': xgb.XGBClassifier(random_state=42, eval_metric='logloss'),
            'SVM': SVC(random_state=42, probability=True),
            'K-Nearest Neighbors': KNeighborsClassifier(n_neighbors=5)
        }
        
        # Train and evaluate each model
        for name, model in models.items():
            print(f"\n🔄 Training {name}...")
            
            # Use scaled data for models that benefit from it
            if name in ['Logistic Regression', 'SVM', 'K-Nearest Neighbors']:
                X_train_use = self.X_train_scaled
                X_test_use = self.X_test_scaled
            else:
                X_train_use = self.X_train
                X_test_use = self.X_test
            
            # Train model
            model.fit(X_train_use, self.y_train)
            
            # Make predictions
            y_pred = model.predict(X_test_use)
            y_pred_proba = model.predict_proba(X_test_use) if hasattr(model, 'predict_proba') else None
            
            # Calculate metrics
            accuracy = accuracy_score(self.y_test, y_pred)
            
            # Cross-validation score
            cv_scores = cross_val_score(model, X_train_use, self.y_train, cv=5)
            
            # Store results
            self.models[name] = model
            self.results[name] = {
                'accuracy': accuracy,
                'cv_mean': cv_scores.mean(),
                'cv_std': cv_scores.std(),
                'predictions': y_pred,
                'probabilities': y_pred_proba
            }
            
            print(f"   ✅ Accuracy: {accuracy:.3f}")
            print(f"   ✅ CV Score: {cv_scores.mean():.3f} (±{cv_scores.std():.3f})")
        
        # Display results summary
        self._display_results_summary()
        
    def _display_results_summary(self):
        """Display model comparison summary"""
        
        print(f"\n📊 MODEL COMPARISON SUMMARY")
        print("-" * 60)
        print(f"{'Model':<20} {'Accuracy':<10} {'CV Score':<15} {'CV Std':<10}")
        print("-" * 60)
        
        # Sort by accuracy
        sorted_results = sorted(self.results.items(), key=lambda x: x[1]['accuracy'], reverse=True)
        
        for name, results in sorted_results:
            print(f"{name:<20} {results['accuracy']:<10.3f} {results['cv_mean']:<15.3f} {results['cv_std']:<10.3f}")
        
        # Best model
        best_model = sorted_results[0][0]
        print(f"\n🏆 Best Model: {best_model} (Accuracy: {sorted_results[0][1]['accuracy']:.3f})")
        
    def create_visualizations(self):
        """Create comprehensive ML visualizations"""
        
        print("\n📈 CREATING VISUALIZATIONS")
        print("=" * 30)
        
        # 1. Model comparison
        self._plot_model_comparison()
        
        # 2. Confusion matrices
        self._plot_confusion_matrices()
        
        # 3. ROC curves (for binary/multiclass)
        self._plot_roc_curves()
        
        # 4. Feature importance
        self._plot_feature_importance()
        
        # 5. PCA visualization
        self._plot_pca_analysis()
        
    def _plot_model_comparison(self):
        """Plot model performance comparison"""
        
        models = list(self.results.keys())
        accuracies = [self.results[model]['accuracy'] for model in models]
        cv_scores = [self.results[model]['cv_mean'] for model in models]
        cv_stds = [self.results[model]['cv_std'] for model in models]
        
        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 6))
        
        # Accuracy comparison
        bars1 = ax1.bar(models, accuracies, color=sns.color_palette("husl", len(models)))
        ax1.set_title('Model Accuracy Comparison')
        ax1.set_ylabel('Accuracy')
        ax1.set_ylim(0, 1)
        
        # Add value labels on bars
        for bar, acc in zip(bars1, accuracies):
            ax1.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.01, 
                    f'{acc:.3f}', ha='center', va='bottom')
        
        # Rotate x-axis labels
        ax1.tick_params(axis='x', rotation=45)
        
        # CV scores with error bars
        bars2 = ax2.bar(models, cv_scores, yerr=cv_stds, capsize=5,
                       color=sns.color_palette("husl", len(models)))
        ax2.set_title('Cross-Validation Scores')
        ax2.set_ylabel('CV Score')
        ax2.set_ylim(0, 1)
        
        # Add value labels
        for bar, score in zip(bars2, cv_scores):
            ax2.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.01, 
                    f'{score:.3f}', ha='center', va='bottom')
        
        ax2.tick_params(axis='x', rotation=45)
        
        plt.tight_layout()
        plt.show()
        
    def _plot_confusion_matrices(self):
        """Plot confusion matrices for all models"""
        
        n_models = len(self.models)
        cols = 3
        rows = (n_models + cols - 1) // cols
        
        fig, axes = plt.subplots(rows, cols, figsize=(15, 5*rows))
        axes = axes.flatten() if n_models > 1 else [axes]
        
        for i, (name, model) in enumerate(self.models.items()):
            if i >= len(axes):
                break
                
            y_pred = self.results[name]['predictions']
            cm = confusion_matrix(self.y_test, y_pred)
            
            sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', 
                       xticklabels=self.target_names, 
                       yticklabels=self.target_names, ax=axes[i])
            axes[i].set_title(f'{name}\nAccuracy: {self.results[name]["accuracy"]:.3f}')
            axes[i].set_xlabel('Predicted')
            axes[i].set_ylabel('Actual')
        
        # Hide unused subplots
        for i in range(len(self.models), len(axes)):
            axes[i].set_visible(False)
        
        plt.tight_layout()
        plt.show()
        
    def _plot_roc_curves(self):
        """Plot ROC curves"""
        
        if len(self.target_names) == 2:  # Binary classification
            plt.figure(figsize=(10, 8))
            
            for name, model in self.models.items():
                if self.results[name]['probabilities'] is not None:
                    y_prob = self.results[name]['probabilities'][:, 1]
                    fpr, tpr, _ = roc_curve(self.y_test, y_prob)
                    auc_score = auc(fpr, tpr)
                    
                    plt.plot(fpr, tpr, label=f'{name} (AUC = {auc_score:.3f})')
            
            plt.plot([0, 1], [0, 1], 'k--', label='Random')
            plt.xlabel('False Positive Rate')
            plt.ylabel('True Positive Rate')
            plt.title('ROC Curves Comparison')
            plt.legend()
            plt.grid(True)
            plt.show()
        else:
            print("ROC curves skipped (multiclass classification)")
            
    def _plot_feature_importance(self):
        """Plot feature importance for tree-based models"""
        
        tree_models = ['Random Forest', 'XGBoost']
        available_tree_models = [name for name in tree_models if name in self.models]
        
        if not available_tree_models:
            print("No tree-based models for feature importance")
            return
        
        fig, axes = plt.subplots(1, len(available_tree_models), 
                                figsize=(8*len(available_tree_models), 6))
        if len(available_tree_models) == 1:
            axes = [axes]
        
        for i, model_name in enumerate(available_tree_models):
            model = self.models[model_name]
            importance = model.feature_importances_
            feature_names = self.X.columns
            
            # Sort features by importance
            indices = np.argsort(importance)[::-1]
            
            axes[i].bar(range(len(importance)), importance[indices])
            axes[i].set_title(f'Feature Importance - {model_name}')
            axes[i].set_xlabel('Features')
            axes[i].set_ylabel('Importance')
            axes[i].set_xticks(range(len(importance)))
            axes[i].set_xticklabels([feature_names[j] for j in indices], rotation=45)
        
        plt.tight_layout()
        plt.show()
        
    def _plot_pca_analysis(self):
        """Plot PCA analysis"""
        
        # Perform PCA
        pca = PCA()
        X_pca = pca.fit_transform(self.X_train_scaled)
        
        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 6))
        
        # Explained variance
        cumsum_var = np.cumsum(pca.explained_variance_ratio_)
        ax1.plot(range(1, len(cumsum_var) + 1), cumsum_var, 'bo-')
        ax1.set_xlabel('Number of Components')
        ax1.set_ylabel('Cumulative Explained Variance')
        ax1.set_title('PCA Explained Variance')
        ax1.grid(True)
        
        # 2D PCA visualization
        pca_2d = PCA(n_components=2)
        X_pca_2d = pca_2d.fit_transform(self.X_train_scaled)
        
        scatter = ax2.scatter(X_pca_2d[:, 0], X_pca_2d[:, 1], 
                             c=self.y_train, cmap='viridis', alpha=0.7)
        ax2.set_xlabel(f'PC1 ({pca_2d.explained_variance_ratio_[0]:.2%} variance)')
        ax2.set_ylabel(f'PC2 ({pca_2d.explained_variance_ratio_[1]:.2%} variance)')
        ax2.set_title('PCA 2D Visualization')
        
        # Add colorbar
        cbar = plt.colorbar(scatter, ax=ax2)
        cbar.set_label('Target Class')
        
        plt.tight_layout()
        plt.show()
        
    def hyperparameter_tuning(self, model_name='Random Forest'):
        """Perform hyperparameter tuning for specified model"""
        
        print(f"\n🔧 HYPERPARAMETER TUNING - {model_name}")
        print("=" * 50)
        
        if model_name == 'Random Forest':
            param_grid = {
                'n_estimators': [50, 100, 200],
                'max_depth': [None, 10, 20],
                'min_samples_split': [2, 5, 10]
            }
            model = RandomForestClassifier(random_state=42)
            
        elif model_name == 'XGBoost':
            param_grid = {
                'n_estimators': [50, 100, 200],
                'max_depth': [3, 6, 9],
                'learning_rate': [0.01, 0.1, 0.2]
            }
            model = xgb.XGBClassifier(random_state=42, eval_metric='logloss')
            
        else:
            print(f"Hyperparameter tuning not implemented for {model_name}")
            return
        
        # Perform grid search
        grid_search = GridSearchCV(model, param_grid, cv=5, scoring='accuracy', n_jobs=-1)
        grid_search.fit(self.X_train, self.y_train)
        
        # Results
        print(f"🏆 Best parameters: {grid_search.best_params_}")
        print(f"🏆 Best CV score: {grid_search.best_score_:.3f}")
        
        # Test the best model
        best_model = grid_search.best_estimator_
        y_pred = best_model.predict(self.X_test)
        test_accuracy = accuracy_score(self.y_test, y_pred)
        
        print(f"🏆 Test accuracy: {test_accuracy:.3f}")
        
        return best_model
        
    def generate_report(self):
        """Generate comprehensive ML analysis report"""
        
        print("\n" + "="*80)
        print("🤖 MACHINE LEARNING ANALYSIS REPORT")
        print("="*80)
        
        # Dataset info
        print(f"\n📊 DATASET: {self.dataset_info['name']}")
        print(f"   Type: {self.dataset_info['type']}")
        print(f"   Samples: {self.dataset_info['samples']:,}")
        print(f"   Features: {self.dataset_info['features']}")
        print(f"   Classes: {self.dataset_info['classes']} {list(self.target_names)}")
        
        # Model performance
        print(f"\n🏆 MODEL PERFORMANCE RANKING:")
        sorted_results = sorted(self.results.items(), key=lambda x: x[1]['accuracy'], reverse=True)
        
        for i, (name, results) in enumerate(sorted_results, 1):
            print(f"   {i}. {name}")
            print(f"      • Accuracy: {results['accuracy']:.3f}")
            print(f"      • CV Score: {results['cv_mean']:.3f} (±{results['cv_std']:.3f})")
        
        # Best model details
        best_model_name = sorted_results[0][0]
        best_results = sorted_results[0][1]
        
        print(f"\n🥇 BEST MODEL: {best_model_name}")
        print(f"   • Test Accuracy: {best_results['accuracy']:.3f}")
        print(f"   • Cross-validation: {best_results['cv_mean']:.3f}")
        
        # Classification report for best model
        y_pred_best = best_results['predictions']
        print(f"\n📋 DETAILED CLASSIFICATION REPORT ({best_model_name}):")
        print(classification_report(self.y_test, y_pred_best, 
                                  target_names=self.target_names))
        
        print(f"\n✅ Analysis Complete!")
        print(f"💡 Recommendations:")
        print(f"   • Best performing model: {best_model_name}")
        print(f"   • Consider hyperparameter tuning for further improvement")
        print(f"   • Try ensemble methods for better performance")
        print(f"   • Collect more data if accuracy is insufficient")

# MAIN MACHINE LEARNING PIPELINE
print("🤖 COMPLETE MACHINE LEARNING ANALYSIS PIPELINE")
print("="*60)

# Initialize analyzer
analyzer = MLAnalyzer()

# Load dataset (try different datasets: 'iris', 'drug', 'breast_cancer')
print("\n1️⃣ LOADING DATASET...")
dataset_choice = 'drug'  # Change this to try different datasets
data = analyzer.load_dataset(dataset_choice)

# Explore the data
print("\n2️⃣ EXPLORING DATA...")
analyzer.explore_data()

# Prepare data for ML
print("\n3️⃣ PREPARING DATA...")
analyzer.prepare_data(test_size=0.2, scale_features=True)

# Train multiple models
print("\n4️⃣ TRAINING MODELS...")
analyzer.train_models()

# Create visualizations
print("\n5️⃣ CREATING VISUALIZATIONS...")
analyzer.create_visualizations()

# Hyperparameter tuning (optional)
print("\n6️⃣ HYPERPARAMETER TUNING...")
best_tuned_model = analyzer.hyperparameter_tuning('Random Forest')

# Generate comprehensive report
print("\n7️⃣ GENERATING REPORT...")
analyzer.generate_report()

print("\n🎉 MACHINE LEARNING ANALYSIS COMPLETE!")
print("\nNext Steps:")
print("• Try different datasets by changing 'dataset_choice' variable")
print("• Available datasets: 'iris', 'drug', 'breast_cancer'")
print("• Experiment with different models and hyperparameters")
print("• Add feature engineering techniques")
print("• Try ensemble methods for better performance")
print("• Deploy the best model for predictions")
