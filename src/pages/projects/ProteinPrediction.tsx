
import { ArrowLeft, ExternalLink, Github, Download, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SEO } from "@/components/SEO";

const ProteinPrediction = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Protein Structure Prediction | ML Classification Project - Bulut Hamali"
        description="Machine learning pipeline for protein structure and drug classification. Advanced ML techniques including Random Forest, XGBoost, and deep learning for bioinformatics applications."
        canonical="https://buluthamali.com/projects/protein-prediction"
        ogType="article"
        keywords="protein structure prediction, machine learning, drug classification, Random Forest, XGBoost, bioinformatics ML, computational biology, protein analysis"
      />
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/" className="flex items-center space-x-2">
                  <ArrowLeft size={16} />
                  <span>Back to Portfolio</span>
                </Link>
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" asChild>
                <a 
                  href="https://github.com/BulutHamali/MLAnalyzer_Classification_Workflow" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <Github size={16} />
                  <span>View on GitHub</span>
                </a>
              </Button>
              <Button variant="outline" size="sm">
                <Share2 size={16} className="mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Project Header */}
              <div className="p-6 border-b">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  MLAnalyzer: Drug Classification Workflow
                </h1>
                <p className="text-lg text-gray-600 mb-4">
                  Complete machine learning pipeline for drug classification using patient characteristics with 99.5% accuracy
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>Synthetic Dataset</span>
                  <span>•</span>
                  <span>1,000 patient records</span>
                  <span>•</span>
                  <span>Python/Scikit-learn</span>
                </div>
              </div>

              {/* Tabbed Content */}
              <div className="p-6">
                <Tabs defaultValue="analysis" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="analysis">Analysis</TabsTrigger>
                    <TabsTrigger value="results">Results</TabsTrigger>
                    <TabsTrigger value="methods">Methods</TabsTrigger>
                    <TabsTrigger value="code">Code</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="analysis" className="mt-6">
                    <ScrollArea className="h-[800px] w-full">
                      <div className="space-y-6">
                        {/* Project Overview */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-blue-600">Project Overview</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-700 mb-4">
                              This project demonstrates a comprehensive machine learning workflow for healthcare decision support. 
                              Using synthetic patient data, we developed a multiclass classification model to predict optimal drug 
                              treatment based on patient characteristics including age, sex, blood pressure, cholesterol levels, and Na/K ratio.
                            </p>
                            <div className="bg-blue-50 p-4 rounded-lg">
                              <h4 className="font-semibold text-blue-800 mb-2">Key Objectives:</h4>
                              <ul className="list-disc list-inside text-blue-700 space-y-1">
                                <li>Develop accurate multiclass classification models for drug selection</li>
                                <li>Compare performance across 5 different machine learning algorithms</li>
                                <li>Implement comprehensive hyperparameter optimization</li>
                                <li>Create professional MLAnalyzer class with modular architecture</li>
                                <li>Generate detailed performance analysis and visualizations</li>
                              </ul>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Dataset Analysis */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-blue-600">Dataset Characteristics</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="mb-4">
                              <div className="bg-gray-800 rounded-t-lg px-4 py-2">
                                <span className="text-green-400 text-sm font-mono">Dataset Generation & Exploration</span>
                              </div>
                              <pre className="bg-gray-900 text-green-300 p-4 rounded-b-lg overflow-x-auto text-sm font-mono">
                                <code>{`# Dataset Overview
print("Dataset Shape:", df.shape)
print("Features:", df.columns.tolist())
print("Target Classes:", df['Drug'].value_counts())

# Feature Statistics
df.describe()`}</code>
                              </pre>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-green-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-green-800 mb-2">Dataset Properties</h4>
                                <ul className="space-y-1 text-sm text-green-700">
                                  <li>• 1,000 synthetic patient records</li>
                                  <li>• 5 input features + 1 target variable</li>
                                  <li>• Balanced multiclass distribution</li>
                                  <li>• No missing values</li>
                                </ul>
                              </div>
                              <div className="bg-purple-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-purple-800 mb-2">Features & Target</h4>
                                <ul className="space-y-1 text-sm text-purple-700">
                                  <li>• Age: 15-74 years</li>
                                  <li>• Sex: Male/Female (encoded)</li>
                                  <li>• Blood Pressure: High/Low/Normal</li>
                                  <li>• Cholesterol: High/Normal</li>
                                  <li>• Na/K Ratio: Continuous variable</li>
                                  <li>• Target: 5 drug classes (A, B, C, X, Y)</li>
                                </ul>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Model Training Process */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-blue-600">Model Training & Evaluation</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="mb-4">
                              <div className="bg-gray-800 rounded-t-lg px-4 py-2">
                                <span className="text-green-400 text-sm font-mono">MLAnalyzer Training Pipeline</span>
                              </div>
                              <pre className="bg-gray-900 text-green-300 p-4 rounded-b-lg overflow-x-auto text-sm font-mono">
                                <code>{`# Initialize MLAnalyzer
analyzer = MLAnalyzer()

# Load and preprocess data
analyzer.load_data('drug_dataset.csv')
analyzer.preprocess_data()

# Train multiple models
models = ['RandomForest', 'XGBoost', 'SVM', 'KNN', 'LogisticRegression']
for model in models:
    analyzer.train_model(model)
    analyzer.evaluate_model(model)

# Hyperparameter optimization
analyzer.optimize_hyperparameters('RandomForest')
analyzer.generate_report()`}</code>
                              </pre>
                            </div>
                            <div className="bg-yellow-50 p-4 rounded-lg">
                              <h4 className="font-semibold text-yellow-800 mb-2">Training Strategy</h4>
                              <p className="text-sm text-yellow-700">
                                The MLAnalyzer class implements a systematic approach to model comparison, using 5-fold cross-validation 
                                for robust performance estimation, automatic feature scaling selection per algorithm, and comprehensive 
                                metrics tracking including accuracy, precision, recall, and F1-score for each model.
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  
                  <TabsContent value="results" className="mt-6">
                    <div className="space-y-6">
                      {/* Performance Summary */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Model Performance Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                              <h4 className="font-semibold text-green-800">Best Model</h4>
                              <p className="text-2xl font-bold text-green-700">Random Forest</p>
                              <p className="text-sm text-green-600">99.5% Test Accuracy</p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                              <h4 className="font-semibold text-blue-800">Cross-Validation</h4>
                              <p className="text-2xl font-bold text-blue-700">99.5%</p>
                              <p className="text-sm text-blue-600">±0.5% std deviation</p>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                              <h4 className="font-semibold text-purple-800">Optimized Performance</h4>
                              <p className="text-2xl font-bold text-purple-700">99.7%</p>
                              <p className="text-sm text-purple-600">After hyperparameter tuning</p>
                            </div>
                          </div>
                          
                          <div className="mt-6">
                            <h4 className="font-semibold mb-3">Model Comparison Rankings</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center p-3 bg-green-50 rounded border-l-4 border-green-500">
                                <span className="font-semibold">1. Random Forest</span>
                                <span className="font-mono font-bold text-green-700">99.5% accuracy</span>
                              </div>
                              <div className="flex justify-between items-center p-3 bg-blue-50 rounded border-l-4 border-blue-500">
                                <span className="font-semibold">2. XGBoost</span>
                                <span className="font-mono font-bold text-blue-700">99.5% accuracy</span>
                              </div>
                              <div className="flex justify-between items-center p-3 bg-purple-50 rounded border-l-4 border-purple-500">
                                <span className="font-semibold">3. Support Vector Machine</span>
                                <span className="font-mono font-bold text-purple-700">98.0% accuracy</span>
                              </div>
                              <div className="flex justify-between items-center p-3 bg-orange-50 rounded border-l-4 border-orange-500">
                                <span className="font-semibold">4. K-Nearest Neighbors</span>
                                <span className="font-mono font-bold text-orange-700">95.0% accuracy</span>
                              </div>
                              <div className="flex justify-between items-center p-3 bg-gray-50 rounded border-l-4 border-gray-500">
                                <span className="font-semibold">5. Logistic Regression</span>
                                <span className="font-mono font-bold text-gray-700">74.0% accuracy</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Detailed Metrics */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Detailed Performance Metrics</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-3">Classification Report (Random Forest)</h4>
                              <div className="bg-gray-900 text-green-300 p-4 rounded-lg font-mono text-sm">
                                <pre>{`              precision    recall  f1-score
Drug A           1.00      1.00      1.00
Drug B           0.99      1.00      0.99
Drug C           1.00      0.98      0.99
Drug X           1.00      1.00      1.00
Drug Y           0.99      1.00      0.99

Avg/Total        0.996     0.995     0.995`}</pre>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-3">Feature Importance</h4>
                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm">Na/K Ratio</span>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-24 h-2 bg-gray-200 rounded-full">
                                      <div className="w-full h-2 bg-blue-500 rounded-full"></div>
                                    </div>
                                    <span className="text-sm font-medium">0.45</span>
                                  </div>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm">Age</span>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-24 h-2 bg-gray-200 rounded-full">
                                      <div className="w-3/4 h-2 bg-green-500 rounded-full"></div>
                                    </div>
                                    <span className="text-sm font-medium">0.32</span>
                                  </div>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm">Blood Pressure</span>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-24 h-2 bg-gray-200 rounded-full">
                                      <div className="w-1/2 h-2 bg-purple-500 rounded-full"></div>
                                    </div>
                                    <span className="text-sm font-medium">0.15</span>
                                  </div>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm">Cholesterol</span>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-24 h-2 bg-gray-200 rounded-full">
                                      <div className="w-1/4 h-2 bg-orange-500 rounded-full"></div>
                                    </div>
                                    <span className="text-sm font-medium">0.06</span>
                                  </div>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm">Sex</span>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-24 h-2 bg-gray-200 rounded-full">
                                      <div className="w-1/12 h-2 bg-red-500 rounded-full"></div>
                                    </div>
                                    <span className="text-sm font-medium">0.02</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="methods" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Methodology & Implementation</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-semibold mb-3">Data Preprocessing Pipeline</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-blue-50 p-4 rounded-lg">
                                <h5 className="font-semibold text-blue-800 mb-2">Data Cleaning</h5>
                                <ul className="text-sm text-blue-700 space-y-1">
                                  <li>• Synthetic dataset with no missing values</li>
                                  <li>• Categorical encoding for Sex and BP variables</li>
                                  <li>• Label encoding for target drug classes</li>
                                  <li>• Feature scaling for distance-based algorithms</li>
                                </ul>
                              </div>
                              <div className="bg-green-50 p-4 rounded-lg">
                                <h5 className="font-semibold text-green-800 mb-2">Train-Test Split</h5>
                                <ul className="text-sm text-green-700 space-y-1">
                                  <li>• 80/20 stratified train-test split</li>
                                  <li>• Random state fixed for reproducibility</li>
                                  <li>• Balanced class distribution maintained</li>
                                  <li>• Cross-validation on training set</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-3">Machine Learning Algorithms</h4>
                            <div className="space-y-3">
                              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                                <h5 className="font-semibold text-purple-800">Tree-Based Models</h5>
                                <p className="text-sm text-purple-700 mt-1">
                                  <strong>Random Forest & XGBoost:</strong> Ensemble methods that performed exceptionally well 
                                  due to the dataset's clear decision boundaries and logical drug assignment rules.
                                </p>
                              </div>
                              <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                                <h5 className="font-semibold text-orange-800">Distance-Based Models</h5>
                                <p className="text-sm text-orange-700 mt-1">
                                  <strong>SVM & K-NN:</strong> Support Vector Machine with RBF kernel and K-Nearest Neighbors 
                                  with automatic feature scaling for optimal performance.
                                </p>
                              </div>
                              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-500">
                                <h5 className="font-semibold text-gray-800">Linear Models</h5>
                                <p className="text-sm text-gray-700 mt-1">
                                  <strong>Logistic Regression:</strong> Multinomial logistic regression as baseline model 
                                  for multiclass classification comparison.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-3">Model Evaluation & Optimization</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <h5 className="font-semibold mb-2">Cross-Validation</h5>
                                <ul className="text-sm text-gray-600 space-y-1">
                                  <li>• 5-fold stratified cross-validation</li>
                                  <li>• Mean and standard deviation tracking</li>
                                  <li>• Robust performance estimation</li>
                                  <li>• Overfitting prevention</li>
                                </ul>
                              </div>
                              <div>
                                <h5 className="font-semibold mb-2">Hyperparameter Tuning</h5>
                                <ul className="text-sm text-gray-600 space-y-1">
                                  <li>• Grid search optimization</li>
                                  <li>• Random Forest parameter sweep</li>
                                  <li>• n_estimators, max_depth, min_samples_split</li>
                                  <li>• Performance improvement validation</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="code" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>Source Code & Implementation</span>
                          <Button variant="outline" size="sm" asChild>
                            <a 
                              href="https://github.com/BulutHamali/MLAnalyzer_Classification_Workflow/blob/main/MLAnalyzer_Classification_Workflow.ipynb"
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2"
                            >
                              <Github size={16} />
                              <span>View Full Notebook</span>
                            </a>
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-semibold mb-3">MLAnalyzer Class Structure</h4>
                            <div className="bg-gray-900 text-green-300 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                              <pre>{`class MLAnalyzer:
    def __init__(self):
        self.data = None
        self.X_train, self.X_test = None, None
        self.y_train, self.y_test = None, None
        self.models = {}
        self.results = {}
    
    def load_data(self, filepath):
        """Load dataset from CSV file"""
        
    def preprocess_data(self):
        """Handle encoding and train-test split"""
        
    def train_model(self, model_name):
        """Train specified ML model"""
        
    def evaluate_model(self, model_name):
        """Evaluate model with cross-validation"""
        
    def optimize_hyperparameters(self, model_name):
        """Grid search hyperparameter optimization"""
        
    def generate_visualizations(self):
        """Create performance plots and charts"""
        
    def generate_report(self):
        """Comprehensive analysis report"""`}</pre>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-3">Repository Structure</h4>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <ul className="text-sm space-y-2">
                                <li><strong>Repository:</strong> MLAnalyzer_Classification_Workflow</li>
                                <li><strong>Main Notebook:</strong> MLAnalyzer_Classification_Workflow.ipynb</li>
                                <li><strong>Language:</strong> Python with Scikit-learn ecosystem</li>
                                <li><strong>Dataset:</strong> Synthetic drug classification dataset</li>
                                <li><strong>Output:</strong> Comprehensive model comparison and analysis</li>
                              </ul>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-3">Key Dependencies</h4>
                            <div className="flex flex-wrap gap-2">
                              {['Python', 'Scikit-learn', 'XGBoost', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Jupyter'].map(lib => (
                                <span key={lib} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                  {lib}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-3">Code Highlights</h4>
                            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                              <ul className="text-sm text-yellow-800 space-y-1">
                                <li>• Object-oriented design with modular MLAnalyzer class</li>
                                <li>• Professional error handling and logging</li>
                                <li>• Comprehensive documentation and comments</li>
                                <li>• Reproducible results with fixed random states</li>
                                <li>• Publication-ready visualizations and reports</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Project Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wide mb-2">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {['Python', 'Scikit-learn', 'XGBoost', 'Pandas', 'Matplotlib'].map(tech => (
                          <span key={tech} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wide mb-2">Analysis Type</h4>
                      <p className="text-sm text-gray-700">Machine Learning, Classification, Model Comparison, Hyperparameter Tuning</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wide mb-2">Dataset</h4>
                      <p className="text-sm text-gray-700">Synthetic Drug Classification<br/>1,000 patients × 5 features</p>
                    </div>
                    <Button className="w-full" size="sm" asChild>
                      <a 
                        href="https://github.com/BulutHamali/MLAnalyzer_Classification_Workflow" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2"
                      >
                        <Github size={16} />
                        <span>View Repository</span>
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">About the Project</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                        BH
                      </div>
                      <div>
                        <h4 className="font-semibold">Bulut Hamali</h4>
                        <p className="text-sm text-gray-600">ML Engineer & Researcher</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Professional machine learning workflow demonstrating best practices in healthcare AI, 
                      model comparison, and systematic hyperparameter optimization for drug classification.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Access</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                      <a 
                        href="https://github.com/BulutHamali/MLAnalyzer_Classification_Workflow/blob/main/MLAnalyzer_Classification_Workflow.ipynb" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={16} className="mr-2" />
                        View Jupyter Notebook
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                      <a 
                        href="https://github.com/BulutHamali/MLAnalyzer_Classification_Workflow" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Github size={16} className="mr-2" />
                        GitHub Repository
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProteinPrediction;
