
import { ArrowLeft, ExternalLink, Github, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ProteinPrediction = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Machine Learning Projects
          </h1>
          <p className="text-xl text-gray-600">
            Advanced machine learning applications in drug discovery and protein analysis
          </p>
        </div>

        {/* ML for Protein Structure Prediction Project */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>ML for Protein Structure Prediction</CardTitle>
            <CardDescription>
              Deep learning approach for predicting protein secondary structures and folding patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Project Overview</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Neural network models for protein structure prediction</li>
                  <li>• Secondary structure classification (alpha-helix, beta-sheet, coil)</li>
                  <li>• Feature extraction from amino acid sequences</li>
                  <li>• Advanced deep learning architectures</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Python</Badge>
                  <Badge variant="secondary">TensorFlow</Badge>
                  <Badge variant="secondary">Keras</Badge>
                  <Badge variant="secondary">BioPython</Badge>
                  <Badge variant="secondary">NumPy</Badge>
                  <Badge variant="secondary">Pandas</Badge>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Key Achievements</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
                  <p className="text-sm font-semibold text-blue-800">Model Accuracy</p>
                  <p className="text-lg font-bold text-blue-700">85.2%</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
                  <p className="text-sm font-semibold text-green-800">Dataset Size</p>
                  <p className="text-lg font-bold text-green-700">10,000+ proteins</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg border-l-4 border-purple-500">
                  <p className="text-sm font-semibold text-purple-800">Features</p>
                  <p className="text-lg font-bold text-purple-700">500+ extracted</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* MLAnalyzer: Drug Classification Workflow Project */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>MLAnalyzer: Drug Classification Workflow</CardTitle>
            <CardDescription>
              Complete machine learning pipeline for drug classification using patient characteristics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Dataset</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 1,000 synthetic patient records</li>
                  <li>• 5 features: Age, Sex, BP, Cholesterol, Na/K ratio</li>
                  <li>• 5 drug classes (drugA, drugB, drugC, drugX, drugY)</li>
                  <li>• Multiclass classification problem</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Key Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Python</Badge>
                  <Badge variant="secondary">Scikit-learn</Badge>
                  <Badge variant="secondary">XGBoost</Badge>
                  <Badge variant="secondary">Pandas</Badge>
                  <Badge variant="secondary">Matplotlib</Badge>
                  <Badge variant="secondary">Seaborn</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Results */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Drug Classification Results</CardTitle>
            <CardDescription>
              Comprehensive comparison of 5 different machine learning algorithms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
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
                  <h4 className="font-semibold text-purple-800">Hyperparameter Tuning</h4>
                  <p className="text-2xl font-bold text-purple-700">99.7%</p>
                  <p className="text-sm text-purple-600">Optimized Random Forest</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-3">Model Comparison Rankings</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>1. Random Forest</span>
                    <span className="font-mono">99.5% accuracy</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>2. XGBoost</span>
                    <span className="font-mono">99.5% accuracy</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>3. SVM</span>
                    <span className="font-mono">98.0% accuracy</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>4. K-Nearest Neighbors</span>
                    <span className="font-mono">95.0% accuracy</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>5. Logistic Regression</span>
                    <span className="font-mono">74.0% accuracy</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical Implementation */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Technical Implementation</CardTitle>
            <CardDescription>
              Professional MLAnalyzer class with modular architecture
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Data Processing</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Synthetic dataset generation with realistic medical logic</li>
                  <li>• Label encoding for categorical variables</li>
                  <li>• Feature scaling for distance-based algorithms</li>
                  <li>• 80/20 train-test split with stratification</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Model Training</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 5-fold cross-validation for robust evaluation</li>
                  <li>• Automatic feature scaling selection per algorithm</li>
                  <li>• Grid search hyperparameter optimization</li>
                  <li>• Comprehensive performance metrics</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Visualizations</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Correlation heatmaps</li>
                  <li>• Confusion matrices for all models</li>
                  <li>• Feature importance plots</li>
                  <li>• PCA analysis and visualization</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Code Quality</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Object-oriented design with MLAnalyzer class</li>
                  <li>• Modular functions for each analysis step</li>
                  <li>• Professional documentation and reporting</li>
                  <li>• Clean, reproducible workflow</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Insights */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Key Insights & Findings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                <h4 className="font-semibold text-yellow-800 mb-2">Algorithm Performance</h4>
                <p className="text-sm text-yellow-700">
                  Tree-based models (Random Forest, XGBoost) significantly outperformed linear models, 
                  achieving near-perfect classification with 99.5% accuracy on the drug classification task.
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold text-green-800 mb-2">Feature Engineering Impact</h4>
                <p className="text-sm text-green-700">
                  The synthetic dataset's logical drug assignment rules created clear decision boundaries 
                  that tree-based algorithms could easily learn and generalize.
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-800 mb-2">Hyperparameter Optimization</h4>
                <p className="text-sm text-blue-700">
                  Grid search optimization improved Random Forest performance from 99.5% to 99.7%, 
                  demonstrating the value of systematic hyperparameter tuning.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Links and Actions */}
        <div className="flex flex-wrap gap-4">
          <Button asChild>
            <a 
              href="https://github.com/BulutHamali/MLAnalyzer_Classification_Workflow"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              <Github className="mr-2 h-4 w-4" />
              View Drug Classification Project
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a 
              href="https://github.com/BulutHamali/MLAnalyzer_Classification_Workflow/blob/main/MLAnalyzer_Classification_Workflow.ipynb"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              View Jupyter Notebook
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a 
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              <Github className="mr-2 h-4 w-4" />
              View Protein Prediction Project
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProteinPrediction;
