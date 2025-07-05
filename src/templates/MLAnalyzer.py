
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report
from MLDataProcessor import MLDataProcessor
from MLModelTrainer import MLModelTrainer
from MLVisualizer import MLVisualizer

class MLAnalyzer:
    def __init__(self):
        self.data = None
        self.X = None
        self.y = None
        self.target_names = None
        self.dataset_info = None
        self.X_train = None
        self.X_test = None
        self.y_train = None
        self.y_test = None
        self.X_train_scaled = None
        self.X_test_scaled = None
        
        # Initialize components
        self.data_processor = MLDataProcessor()
        self.model_trainer = MLModelTrainer(self.data_processor.scaler)
        self.visualizer = MLVisualizer()
        
    def load_dataset(self, dataset_name='iris'):
        """Load dataset using data processor"""
        self.data, self.X, self.y, self.target_names, self.dataset_info = self.data_processor.load_dataset(dataset_name)
        return self.data
    
    def explore_data(self):
        """Comprehensive data exploration"""
        corr_matrix = self.data_processor.explore_data_info(self.data, self.X, self.y, self.target_names)
        self.visualizer.create_exploration_plots(corr_matrix, self.X, self.y, self.target_names, self.data)
        
    def prepare_data(self, test_size=0.2, scale_features=True):
        """Prepare data for machine learning"""
        self.X_train, self.X_test, self.y_train, self.y_test, self.X_train_scaled, self.X_test_scaled = \
            self.model_trainer.prepare_data(self.X, self.y, test_size, scale_features)
        
    def train_models(self):
        """Train multiple ML models"""
        self.model_trainer.train_models(
            self.X_train, self.X_test, self.y_train, self.y_test, self.X_train_scaled, self.X_test_scaled
        )
        
    def create_visualizations(self):
        """Create comprehensive ML visualizations"""
        print("\nCREATING VISUALIZATIONS")
        print("=" * 30)
        
        # Model comparison
        self.visualizer.plot_model_comparison(self.model_trainer.results)
        
        # Confusion matrices
        self.visualizer.plot_confusion_matrices(
            self.model_trainer.models, self.model_trainer.results, self.y_test, self.target_names
        )
        
        # ROC curves
        self.visualizer.plot_roc_curves(
            self.model_trainer.models, self.model_trainer.results, self.y_test, self.target_names
        )
        
        # Feature importance
        self.visualizer.plot_feature_importance(self.model_trainer.models, self.X)
        
        # PCA analysis
        self.visualizer.plot_pca_analysis(self.X_train_scaled, self.y_train)
        
    def hyperparameter_tuning(self, model_name='Random Forest'):
        """Perform hyperparameter tuning for specified model"""
        return self.model_trainer.hyperparameter_tuning(
            self.X_train, self.y_train, self.X_test, self.y_test, model_name
        )
        
    def generate_report(self):
        """Generate comprehensive ML analysis report"""
        
        print("\n" + "="*80)
        print("MACHINE LEARNING ANALYSIS REPORT")
        print("="*80)
        
        # Dataset info
        print(f"\nDATASET: {self.dataset_info['name']}")
        print(f"   Type: {self.dataset_info['type']}")
        print(f"   Samples: {self.dataset_info['samples']:,}")
        print(f"   Features: {self.dataset_info['features']}")
        print(f"   Classes: {self.dataset_info['classes']} {list(self.target_names)}")
        
        # Model performance
        print(f"\nMODEL PERFORMANCE RANKING:")
        sorted_results = sorted(self.model_trainer.results.items(), key=lambda x: x[1]['accuracy'], reverse=True)
        
        for i, (name, results) in enumerate(sorted_results, 1):
            print(f"   {i}. {name}")
            print(f"      • Accuracy: {results['accuracy']:.3f}")
            print(f"      • CV Score: {results['cv_mean']:.3f} (±{results['cv_std']:.3f})")
        
        # Best model details
        best_model_name = sorted_results[0][0]
        best_results = sorted_results[0][1]
        
        print(f"\nBEST MODEL: {best_model_name}")
        print(f"   • Test Accuracy: {best_results['accuracy']:.3f}")
        print(f"   • Cross-validation: {best_results['cv_mean']:.3f}")
        
        # Classification report for best model
        y_pred_best = best_results['predictions']
        print(f"\nDETAILED CLASSIFICATION REPORT ({best_model_name}):")
        print(classification_report(self.y_test, y_pred_best, 
                                  target_names=self.target_names))
        
        print(f"\nAnalysis Complete!")
        print(f"Recommendations:")
        print(f"   • Best performing model: {best_model_name}")
        print(f"   • Consider hyperparameter tuning for further improvement")
        print(f"   • Try ensemble methods for better performance")
        print(f"   • Collect more data if accuracy is insufficient")
