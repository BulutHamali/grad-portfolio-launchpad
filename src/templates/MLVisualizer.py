
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
from sklearn.metrics import confusion_matrix, roc_curve, auc
from sklearn.decomposition import PCA

class MLVisualizer:
    def __init__(self):
        # Set style
        plt.style.use('seaborn-v0_8')
        sns.set_palette("husl")
        
    def create_exploration_plots(self, corr_matrix, X, y, target_names, data):
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
        if 'Drug' in data.columns:
            target_counts = data['Drug'].value_counts()
            axes[0].pie(target_counts.values, labels=target_counts.index, 
                       autopct='%1.1f%%', startangle=90)
            axes[0].set_title('Drug Distribution')
        else:
            target_counts = y.value_counts()
            axes[0].pie(target_counts.values, labels=[target_names[i] for i in target_counts.index], 
                       autopct='%1.1f%%', startangle=90)
            axes[0].set_title('Target Class Distribution')
        
        # Bar chart
        axes[1].bar(range(len(target_counts)), target_counts.values, 
                   color=sns.color_palette("husl", len(target_counts)))
        axes[1].set_xlabel('Class')
        axes[1].set_ylabel('Count')
        axes[1].set_title('Target Class Counts')
        axes[1].set_xticks(range(len(target_counts)))
        if 'Drug' in data.columns:
            axes[1].set_xticklabels(target_counts.index)
        else:
            axes[1].set_xticklabels([target_names[i] for i in target_counts.index])
        
        plt.tight_layout()
        plt.show()
        
        # 3. Feature distributions by class (for first 4 features)
        n_features = min(4, len(X.columns))
        fig, axes = plt.subplots(2, 2, figsize=(15, 10))
        axes = axes.ravel()
        
        for i in range(n_features):
            feature = X.columns[i]
            for class_idx in y.unique():
                class_data = X[y == class_idx][feature]
                class_name = target_names[class_idx] if target_names is not None else f"Class {class_idx}"
                axes[i].hist(class_data, alpha=0.7, 
                           label=class_name, bins=20)
            axes[i].set_xlabel(feature)
            axes[i].set_ylabel('Frequency')
            axes[i].set_title(f'Distribution of {feature}')
            axes[i].legend()
        
        plt.tight_layout()
        plt.show()
        
    def plot_model_comparison(self, results):
        """Plot model performance comparison"""
        
        models = list(results.keys())
        accuracies = [results[model]['accuracy'] for model in models]
        cv_scores = [results[model]['cv_mean'] for model in models]
        cv_stds = [results[model]['cv_std'] for model in models]
        
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
        
    def plot_confusion_matrices(self, models, results, y_test, target_names):
        """Plot confusion matrices for all models"""
        
        n_models = len(models)
        cols = 3
        rows = (n_models + cols - 1) // cols
        
        fig, axes = plt.subplots(rows, cols, figsize=(15, 5*rows))
        axes = axes.flatten() if n_models > 1 else [axes]
        
        for i, (name, model) in enumerate(models.items()):
            if i >= len(axes):
                break
                
            y_pred = results[name]['predictions']
            cm = confusion_matrix(y_test, y_pred)
            
            sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', 
                       xticklabels=target_names, 
                       yticklabels=target_names, ax=axes[i])
            axes[i].set_title(f'{name}\nAccuracy: {results[name]["accuracy"]:.3f}')
            axes[i].set_xlabel('Predicted')
            axes[i].set_ylabel('Actual')
        
        # Hide unused subplots
        for i in range(len(models), len(axes)):
            axes[i].set_visible(False)
        
        plt.tight_layout()
        plt.show()
        
    def plot_roc_curves(self, models, results, y_test, target_names):
        """Plot ROC curves"""
        
        if len(target_names) == 2:  # Binary classification
            plt.figure(figsize=(10, 8))
            
            for name, model in models.items():
                if results[name]['probabilities'] is not None:
                    y_prob = results[name]['probabilities'][:, 1]
                    fpr, tpr, _ = roc_curve(y_test, y_prob)
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
            
    def plot_feature_importance(self, models, X):
        """Plot feature importance for tree-based models"""
        
        tree_models = ['Random Forest', 'XGBoost']
        available_tree_models = [name for name in tree_models if name in models]
        
        if not available_tree_models:
            print("No tree-based models for feature importance")
            return
        
        fig, axes = plt.subplots(1, len(available_tree_models), 
                                figsize=(8*len(available_tree_models), 6))
        if len(available_tree_models) == 1:
            axes = [axes]
        
        for i, model_name in enumerate(available_tree_models):
            model = models[model_name]
            importance = model.feature_importances_
            feature_names = X.columns
            
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
        
    def plot_pca_analysis(self, X_train_scaled, y_train):
        """Plot PCA analysis"""
        
        # Perform PCA
        pca = PCA()
        X_pca = pca.fit_transform(X_train_scaled)
        
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
        X_pca_2d = pca_2d.fit_transform(X_train_scaled)
        
        scatter = ax2.scatter(X_pca_2d[:, 0], X_pca_2d[:, 1], 
                             c=y_train, cmap='viridis', alpha=0.7)
        ax2.set_xlabel(f'PC1 ({pca_2d.explained_variance_ratio_[0]:.2%} variance)')
        ax2.set_ylabel(f'PC2 ({pca_2d.explained_variance_ratio_[1]:.2%} variance)')
        ax2.set_title('PCA 2D Visualization')
        
        # Add colorbar
        cbar = plt.colorbar(scatter, ax=ax2)
        cbar.set_label('Target Class')
        
        plt.tight_layout()
        plt.show()
