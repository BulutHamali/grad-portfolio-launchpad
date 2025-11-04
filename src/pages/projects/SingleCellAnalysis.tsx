import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, Download, Github, Share2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/SEO';

const SingleCellAnalysis = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Single-Cell RNA-seq Analysis | PBMC Dataset Project - Bulut Hamali"
        description="Comprehensive single-cell RNA sequencing analysis of 10X PBMC data using Seurat. Cell type identification, clustering, quality control, and differential expression analysis."
        canonical="https://buluthamali.com/projects/single-cell-analysis"
        ogType="article"
        keywords="single-cell RNA-seq, scRNA-seq, Seurat, PBMC analysis, cell clustering, bioinformatics project, 10X Genomics, cell type annotation"
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
                  href="https://github.com/BulutHamali/Single-Cell-RNA-seq_Analysis_of_10X_PBMC_Data" 
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
                  Single-Cell RNA-seq Analysis of 10X PBMC Data
                </h1>
                <p className="text-lg text-gray-600 mb-4">
                  Comprehensive analysis of peripheral blood mononuclear cells using Seurat package for quality control, clustering, and cell type identification
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>10X Genomics PBMC Dataset</span>
                  <span>•</span>
                  <span>2,700 cells analyzed</span>
                  <span>•</span>
                  <span>R/Seurat Pipeline</span>
                </div>
              </div>

              {/* Notebook Content */}
              <div className="p-6">
                <Tabs defaultValue="notebook" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="notebook">Analysis</TabsTrigger>
                    <TabsTrigger value="results">Results</TabsTrigger>
                    <TabsTrigger value="methods">Methods</TabsTrigger>
                    <TabsTrigger value="code">Code</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="notebook" className="mt-6">
                    <ScrollArea className="h-[800px] w-full">
                      <div className="space-y-6">
                        {/* Introduction */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-blue-600">Project Overview</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-700 mb-4">
                              This project demonstrates a complete single-cell RNA sequencing analysis workflow using the 10X Genomics 
                              PBMC 3k dataset. The analysis follows best practices for scRNA-seq data processing, including quality control, 
                              normalization, dimensionality reduction, clustering, and cell type annotation.
                            </p>
                            <div className="bg-blue-50 p-4 rounded-lg">
                              <h4 className="font-semibold text-blue-800 mb-2">Key Objectives:</h4>
                              <ul className="list-disc list-inside text-blue-700 space-y-1">
                                <li>Process and quality filter single-cell RNA-seq data</li>
                                <li>Identify distinct cell populations through unsupervised clustering</li>
                                <li>Annotate cell types using canonical marker genes</li>
                                <li>Perform differential expression analysis between cell types</li>
                                <li>Generate publication-ready visualizations</li>
                              </ul>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Quality Control */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-blue-600">Quality Control & Filtering</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="mb-4">
                              <div className="bg-gray-800 rounded-t-lg px-4 py-2">
                                <span className="text-green-400 text-sm font-mono">Quality Control Metrics</span>
                              </div>
                              <pre className="bg-gray-900 text-green-300 p-4 rounded-b-lg overflow-x-auto text-sm font-mono">
                                <code>{`# Load and examine the data
pbmc.data <- Read10X(data.dir = "filtered_gene_bc_matrices/hg19/")
pbmc <- CreateSeuratObject(counts = pbmc.data, project = "pbmc3k", 
                          min.cells = 3, min.features = 200)

# Calculate QC metrics
pbmc[["percent.mt"]] <- PercentageFeatureSet(pbmc, pattern = "^MT-")

# Visualize QC metrics
VlnPlot(pbmc, features = c("nFeature_RNA", "nCount_RNA", "percent.mt"), ncol = 3)`}</code>
                              </pre>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-green-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-green-800 mb-2">Initial Dataset</h4>
                                <ul className="space-y-1 text-sm text-green-700">
                                  <li>• 2,700 cells</li>
                                  <li>• 32,738 genes</li>
                                  <li>• 10X Genomics PBMC 3k</li>
                                </ul>
                              </div>
                              <div className="bg-blue-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-blue-800 mb-2">After Filtering</h4>
                                <ul className="space-y-1 text-sm text-blue-700">
                                  <li>• 2,638 high-quality cells</li>
                                  <li>• Features: 200-2,500 per cell</li>
                                  <li>• Mitochondrial genes: less than 5%</li>
                                </ul>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Clustering Results */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-blue-600">Clustering & Dimensionality Reduction</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="mb-4">
                              <div className="bg-gray-800 rounded-t-lg px-4 py-2">
                                <span className="text-green-400 text-sm font-mono">Normalization & Clustering Pipeline</span>
                              </div>
                              <pre className="bg-gray-900 text-green-300 p-4 rounded-b-lg overflow-x-auto text-sm font-mono">
                                <code>{`# Normalization and scaling
pbmc <- NormalizeData(pbmc)
pbmc <- FindVariableFeatures(pbmc, selection.method = "vst", nfeatures = 2000)
pbmc <- ScaleData(pbmc, features = all.genes)

# PCA and clustering
pbmc <- RunPCA(pbmc, features = VariableFeatures(object = pbmc))
pbmc <- FindNeighbors(pbmc, dims = 1:10)
pbmc <- FindClusters(pbmc, resolution = 0.5)
pbmc <- RunUMAP(pbmc, dims = 1:10)

# Visualization
DimPlot(pbmc, reduction = "umap")`}</code>
                              </pre>
                            </div>
                            <div className="bg-gray-100 p-4 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold">UMAP Visualization</h4>
                                <Button variant="outline" size="sm" asChild>
                                  <a 
                                    href="https://github.com/BulutHamali/Single-Cell-RNA-seq_Analysis_of_10X_PBMC_Data/blob/main/Single_Cell_RNA_seq_Analysis_of_10X_PBMC_Data.ipynb" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-1"
                                  >
                                    <ExternalLink size={14} />
                                    <span>View Full Notebook</span>
                                  </a>
                                </Button>
                              </div>
                              <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-64 rounded flex items-center justify-center text-white">
                                <div className="text-center">
                                  <div className="text-6xl mb-2">📊</div>
                                  <p className="text-lg font-semibold">9 Distinct Cell Clusters Identified</p>
                                  <p className="text-sm opacity-90">UMAP visualization showing clear cell type separation</p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Cell Type Identification */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-blue-600">Cell Type Annotation</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="mb-4">
                              <div className="bg-gray-800 rounded-t-lg px-4 py-2">
                                <span className="text-green-400 text-sm font-mono">Marker Gene Analysis</span>
                              </div>
                              <pre className="bg-gray-900 text-green-300 p-4 rounded-b-lg overflow-x-auto text-sm font-mono">
                                <code>{`# Find all markers
pbmc.markers <- FindAllMarkers(pbmc, only.pos = TRUE, min.pct = 0.25, 
                              logfc.threshold = 0.25)

# Cell type annotation based on canonical markers
new.cluster.ids <- c("Naive CD4 T", "CD14+ Mono", "Memory CD4 T", "B", 
                     "CD8 T", "FCGR3A+ Mono", "NK", "DC", "Platelet")
names(new.cluster.ids) <- levels(pbmc)
pbmc <- RenameIdents(pbmc, new.cluster.ids)`}</code>
                              </pre>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-purple-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-purple-800 mb-3">Identified Cell Types</h4>
                                <ul className="space-y-2 text-sm">
                                  <li className="flex justify-between">
                                    <span>Naive CD4+ T cells</span>
                                    <span className="font-semibold text-purple-600">Cluster 0</span>
                                  </li>
                                  <li className="flex justify-between">
                                    <span>CD14+ Monocytes</span>
                                    <span className="font-semibold text-purple-600">Cluster 1</span>
                                  </li>
                                  <li className="flex justify-between">
                                    <span>Memory CD4+ T cells</span>
                                    <span className="font-semibold text-purple-600">Cluster 2</span>
                                  </li>
                                  <li className="flex justify-between">
                                    <span>B cells</span>
                                    <span className="font-semibold text-purple-600">Cluster 3</span>
                                  </li>
                                  <li className="flex justify-between">
                                    <span>CD8+ T cells</span>
                                    <span className="font-semibold text-purple-600">Cluster 4</span>
                                  </li>
                                  <li className="flex justify-between">
                                    <span>FCGR3A+ Monocytes</span>
                                    <span className="font-semibold text-purple-600">Cluster 5</span>
                                  </li>
                                  <li className="flex justify-between">
                                    <span>NK cells</span>
                                    <span className="font-semibold text-purple-600">Cluster 6</span>
                                  </li>
                                  <li className="flex justify-between">
                                    <span>Dendritic cells</span>
                                    <span className="font-semibold text-purple-600">Cluster 7</span>
                                  </li>
                                  <li className="flex justify-between">
                                    <span>Platelets</span>
                                    <span className="font-semibold text-purple-600">Cluster 8</span>
                                  </li>
                                </ul>
                              </div>
                              <div className="bg-orange-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-orange-800 mb-3">Key Marker Genes</h4>
                                <ul className="space-y-2 text-sm text-orange-700">
                                  <li><strong>T cells:</strong> CD3E, CD3D, CD2</li>
                                  <li><strong>B cells:</strong> MS4A1, CD79A, CD79B</li>
                                  <li><strong>Monocytes:</strong> CD14, LYZ, S100A9</li>
                                  <li><strong>NK cells:</strong> GNLY, NKG7, KLRB1</li>
                                  <li><strong>DC:</strong> FCER1A, CST3</li>
                                  <li><strong>Platelets:</strong> PPBP, PF4</li>
                                </ul>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  
                  <TabsContent value="results" className="mt-6">
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Analysis Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-3 gap-6">
                            <div className="text-center">
                              <div className="text-3xl font-bold text-blue-600 mb-2">2,638</div>
                              <div className="text-sm text-gray-600">High-quality cells</div>
                            </div>
                            <div className="text-center">
                              <div className="text-3xl font-bold text-green-600 mb-2">9</div>
                              <div className="text-sm text-gray-600">Cell clusters identified</div>
                            </div>
                            <div className="text-center">
                              <div className="text-3xl font-bold text-purple-600 mb-2">2,000</div>
                              <div className="text-sm text-gray-600">Variable features</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Cell Type Distribution</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Naive CD4+ T cells</span>
                              <div className="flex items-center space-x-2">
                                <div className="w-24 h-2 bg-gray-200 rounded-full">
                                  <div className="w-1/3 h-2 bg-blue-500 rounded-full"></div>
                                </div>
                                <span className="text-sm font-medium">33%</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">CD14+ Monocytes</span>
                              <div className="flex items-center space-x-2">
                                <div className="w-24 h-2 bg-gray-200 rounded-full">
                                  <div className="w-1/4 h-2 bg-green-500 rounded-full"></div>
                                </div>
                                <span className="text-sm font-medium">25%</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Memory CD4+ T cells</span>
                              <div className="flex items-center space-x-2">
                                <div className="w-24 h-2 bg-gray-200 rounded-full">
                                  <div className="w-1/5 h-2 bg-purple-500 rounded-full"></div>
                                </div>
                                <span className="text-sm font-medium">20%</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Other cell types</span>
                              <div className="flex items-center space-x-2">
                                <div className="w-24 h-2 bg-gray-200 rounded-full">
                                  <div className="w-1/5 h-2 bg-orange-500 rounded-full"></div>
                                </div>
                                <span className="text-sm font-medium">22%</span>
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
                        <CardTitle>Methodology</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-semibold mb-2">Data Preprocessing</h4>
                            <ul className="text-sm text-gray-600 space-y-1 ml-4">
                              <li>• Quality filtering: 200-2,500 features per cell</li>
                              <li>• Mitochondrial gene threshold: less than 5%</li>
                              <li>• Log-normalization with scale factor 10,000</li>
                              <li>• Identification of 2,000 highly variable features</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Dimensionality Reduction</h4>
                            <ul className="text-sm text-gray-600 space-y-1 ml-4">
                              <li>• Principal Component Analysis (PCA)</li>
                              <li>• Top 10 PCs used for downstream analysis</li>
                              <li>• UMAP for visualization</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Clustering & Annotation</h4>
                            <ul className="text-sm text-gray-600 space-y-1 ml-4">
                              <li>• Shared nearest neighbor (SNN) clustering</li>
                              <li>• Resolution parameter: 0.5</li>
                              <li>• Cell type annotation using canonical markers</li>
                              <li>• Differential expression analysis with Wilcoxon test</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="code" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>Source Code</span>
                          <Button variant="outline" size="sm" asChild>
                            <a 
                              href="https://github.com/BulutHamali/Single-Cell-RNA-seq_Analysis_of_10X_PBMC_Data/blob/main/Single_Cell_RNA_seq_Analysis_of_10X_PBMC_Data.ipynb" 
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
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Repository Information</h4>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <ul className="text-sm space-y-2">
                                <li><strong>Repository:</strong> Single-Cell-RNA-seq_Analysis_of_10X_PBMC_Data</li>
                                <li><strong>Main Notebook:</strong> Single_Cell_RNA_seq_Analysis_of_10X_PBMC_Data.ipynb</li>
                                <li><strong>Language:</strong> R with Seurat package</li>
                                <li><strong>Dataset:</strong> 10X Genomics PBMC 3k</li>
                              </ul>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Key Libraries Used</h4>
                            <div className="flex flex-wrap gap-2">
                              {['Seurat', 'dplyr', 'Biobase', 'ggplot2', 'cowplot', 'Matrix', 'RANN'].map(lib => (
                                <span key={lib} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                  {lib}
                                </span>
                              ))}
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
                        {['R', 'Seurat', 'ggplot2', 'dplyr', 'Jupyter'].map(tech => (
                          <span key={tech} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wide mb-2">Analysis Type</h4>
                      <p className="text-sm text-gray-700">Single-cell RNA-seq, Quality Control, Clustering, Cell Type Annotation</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wide mb-2">Dataset</h4>
                      <p className="text-sm text-gray-700">10X Genomics PBMC 3k<br/>2,638 cells × 32,738 genes</p>
                    </div>
                    <Button className="w-full" size="sm" asChild>
                      <a 
                        href="https://github.com/BulutHamali/Single-Cell-RNA-seq_Analysis_of_10X_PBMC_Data" 
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
                  <CardTitle className="text-lg">About the Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                        BH
                      </div>
                      <div>
                        <h4 className="font-semibold">Bulut Hamali</h4>
                        <p className="text-sm text-gray-600">Bioinformatics Researcher</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Comprehensive single-cell analysis of human peripheral blood mononuclear cells using state-of-the-art computational methods for cell type identification and characterization.
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
                        href="https://github.com/BulutHamali/Single-Cell-RNA-seq_Analysis_of_10X_PBMC_Data/blob/main/Single_Cell_RNA_seq_Analysis_of_10X_PBMC_Data.ipynb" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={16} className="mr-2" />
                        View Jupyter Notebook
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                      <a 
                        href="https://github.com/BulutHamali/Single-Cell-RNA-seq_Analysis_of_10X_PBMC_Data" 
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

export default SingleCellAnalysis;
