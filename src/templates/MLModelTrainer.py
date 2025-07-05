
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import (classification_report, confusion_matrix, 
                           accuracy_score, roc_curve, auc, roc_auc_score)
import xgboost as xgb

class MLModelTrainer:
    def __init__(self, scaler):
        self.models = {}
        self.results = {}
        self.scaler = scaler
        
    def prepare_data(self, X, y, test_size=0.2, scale_features=True):
        """Prepare data for machine learning"""
        
        # Split the data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=test_size, random_state=42, stratify=y
        )
        
        # Scale features if requested
        if scale_features:
            X_train_scaled = self.scaler.fit_transform(X_train)
            X_test_scaled = self.scaler.transform(X_test)
        else:
            X_train_scaled = X_train
            X_test_scaled = X_test
            
        print(f"Data prepared:")
        print(f"   Training set: {X_train.shape[0]} samples")
        print(f"   Test set: {X_test.shape[0]} samples")
        print(f"   Features scaled: {scale_features}")
        
        return X_train, X_test, y_train, y_test, X_train_scaled, X_test_scaled
        
    def train_models(self, X_train, X_test, y_train, y_test, X_train_scaled, X_test_scaled):
        """Train multiple ML models"""
        
        print("TRAINING MACHINE LEARNING MODELS")
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
            print(f"\nTraining {name}...")
            
            # Use scaled data for models that benefit from it
            if name in ['Logistic Regression', 'SVM', 'K-Nearest Neighbors']:
                X_train_use = X_train_scaled
                X_test_use = X_test_scaled
            else:
                X_train_use = X_train
                X_test_use = X_test
            
            # Train model
            model.fit(X_train_use, y_train)
            
            # Make predictions
            y_pred = model.predict(X_test_use)
            y_pred_proba = model.predict_proba(X_test_use) if hasattr(model, 'predict_proba') else None
            
            # Calculate metrics
            accuracy = accuracy_score(y_test, y_pred)
            
            # Cross-validation score
            cv_scores = cross_val_score(model, X_train_use, y_train, cv=5)
            
            # Store results
            self.models[name] = model
            self.results[name] = {
                'accuracy': accuracy,
                'cv_mean': cv_scores.mean(),
                'cv_std': cv_scores.std(),
                'predictions': y_pred,
                'probabilities': y_pred_proba
            }
            
            print(f"   Accuracy: {accuracy:.3f}")
            print(f"   CV Score: {cv_scores.mean():.3f} (±{cv_scores.std():.3f})")
        
        # Display results summary
        self.display_results_summary()
        
    def display_results_summary(self):
        """Display model comparison summary"""
        
        print(f"\nMODEL COMPARISON SUMMARY")
        print("-" * 60)
        print(f"{'Model':<20} {'Accuracy':<10} {'CV Score':<15} {'CV Std':<10}")
        print("-" * 60)
        
        # Sort by accuracy
        sorted_results = sorted(self.results.items(), key=lambda x: x[1]['accuracy'], reverse=True)
        
        for name, results in sorted_results:
            print(f"{name:<20} {results['accuracy']:<10.3f} {results['cv_mean']:<15.3f} {results['cv_std']:<10.3f}")
        
        # Best model
        best_model = sorted_results[0][0]
        print(f"\nBest Model: {best_model} (Accuracy: {sorted_results[0][1]['accuracy']:.3f})")
        
    def hyperparameter_tuning(self, X_train, y_train, X_test, y_test, model_name='Random Forest'):
        """Perform hyperparameter tuning for specified model"""
        
        print(f"\nHYPERPARAMETER TUNING - {model_name}")
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
        grid_search.fit(X_train, y_train)
        
        # Results
        print(f"Best parameters: {grid_search.best_params_}")
        print(f"Best CV score: {grid_search.best_score_:.3f}")
        
        # Test the best model
        best_model = grid_search.best_estimator_
        y_pred = best_model.predict(X_test)
        test_accuracy = accuracy_score(y_test, y_pred)
        
        print(f"Test accuracy: {test_accuracy:.3f}")
        
        return best_model
