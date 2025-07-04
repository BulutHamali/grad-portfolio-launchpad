
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, Download, Github, Share2, Heart, MessageSquare, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const SingleCellAnalysis = () => {
  return (
    <div className="min-h-screen bg-gray-50">
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
              <Button variant="outline" size="sm">
                <Share2 size={16} className="mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download size={16} className="mr-2" />
                Download
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
                  Single-Cell RNA-seq Analysis Pipeline
                </h1>
                <p className="text-lg text-gray-600 mb-4">
                  Comprehensive scRNA-seq analysis identifying cell types and biomarkers in cancer tissue samples
                </p>
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Eye size={16} />
                    <span>2.1K views</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart size={16} />
                    <span>89 upvotes</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageSquare size={16} />
                    <span>12 comments</span>
                  </div>
                </div>
              </div>

              {/* Notebook Content */}
              <div className="p-6">
                <Tabs defaultValue="notebook" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="notebook">Notebook</TabsTrigger>
                    <TabsTrigger value="data">Data</TabsTrigger>
                    <TabsTrigger value="discussion">Discussion</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="notebook" className="mt-6">
                    <ScrollArea className="h-[800px] w-full">
                      <div className="space-y-6">
                        {/* Introduction */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-blue-600">1. Introduction & Background</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-700 mb-4">
                              Single-cell RNA sequencing (scRNA-seq) has revolutionized our understanding of cellular heterogeneity in complex tissues. 
                              In this analysis, we processed 10,000+ single cells from tumor biopsies to identify distinct cell populations and their 
                              gene expression profiles, with a focus on immune cell infiltration patterns in the tumor microenvironment.
                            </p>
                            <div className="bg-blue-50 p-4 rounded-lg">
                              <h4 className="font-semibold text-blue-800 mb-2">Project Goals:</h4>
                              <ul className="list-disc list-inside text-blue-700 space-y-1">
                                <li>Characterize cellular heterogeneity in tumor microenvironment</li>
                                <li>Identify potential therapeutic targets through differential expression analysis</li>
                                <li>Map immune cell infiltration patterns</li>
                              </ul>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Data Loading */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-blue-600">2. Data Loading & Quality Control</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="mb-4">
                              <div className="bg-gray-800 rounded-t-lg px-4 py-2">
                                <span className="text-green-400 text-sm font-mono">Cell [1]:</span>
                              </div>
                              <pre className="bg-gray-900 text-green-300 p-4 rounded-b-lg overflow-x-auto text-sm font-mono">
                                <code>{`# Load required libraries
library(Seurat)
library(dplyr)
library(ggplot2)
library(patchwork)

# Load 10X Genomics data
data_dir <- "filtered_feature_bc_matrix/"
data <- Read10X(data.dir = data_dir)

# Create Seurat object
seurat_obj <- CreateSeuratObject(
  counts = data, 
  project = "tumor_scrna",
  min.cells = 3, 
  min.features = 200
)

print(paste("Loaded", ncol(seurat_obj), "cells and", nrow(seurat_obj), "genes"))`}</code>
                              </pre>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                              <p className="text-green-800"><strong>Output:</strong> Loaded 12,847 cells and 23,420 genes</p>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Quality Control */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-blue-600">3. Quality Control Metrics</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="mb-4">
                              <div className="bg-gray-800 rounded-t-lg px-4 py-2">
                                <span className="text-green-400 text-sm font-mono">Cell [2]:</span>
                              </div>
                              <pre className="bg-gray-900 text-green-300 p-4 rounded-b-lg overflow-x-auto text-sm font-mono">
                                <code>{`# Calculate mitochondrial gene percentage
seurat_obj[["percent.mt"]] <- PercentageFeatureSet(seurat_obj, pattern = "^MT-")

# Calculate ribosomal gene percentage  
seurat_obj[["percent.rb"]] <- PercentageFeatureSet(seurat_obj, pattern = "^RP[SL]")

# Visualize QC metrics
p1 <- VlnPlot(seurat_obj, features = c("nFeature_RNA", "nCount_RNA", "percent.mt"), 
              ncol = 3, pt.size = 0.1)
p2 <- FeatureScatter(seurat_obj, feature1 = "nCount_RNA", feature2 = "percent.mt")
p3 <- FeatureScatter(seurat_obj, feature1 = "nCount_RNA", feature2 = "nFeature_RNA")

# Display plots
p1 / (p2 + p3)`}</code>
                              </pre>
                            </div>
                            <div className="bg-gray-100 p-4 rounded-lg">
                              <img 
                                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop" 
                                alt="QC Violin Plots"
                                className="w-full h-64 object-cover rounded"
                              />
                              <p className="text-sm text-gray-600 mt-2">Quality control violin plots showing distribution of genes, UMIs, and mitochondrial gene percentage</p>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Normalization and Clustering */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-blue-600">4. Normalization & Clustering</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="mb-4">
                              <div className="bg-gray-800 rounded-t-lg px-4 py-2">
                                <span className="text-green-400 text-sm font-mono">Cell [3]:</span>
                              </div>
                              <pre className="bg-gray-900 text-green-300 p-4 rounded-b-lg overflow-x-auto text-sm font-mono">
                                <code>{`# Filter cells based on QC metrics
seurat_obj <- subset(seurat_obj, subset = nFeature_RNA > 200 & 
                     nFeature_RNA < 5000 & percent.mt < 25)

# Normalize the data
seurat_obj <- NormalizeData(seurat_obj, normalization.method = "LogNormalize", 
                           scale.factor = 10000)

# Find highly variable features
seurat_obj <- FindVariableFeatures(seurat_obj, selection.method = "vst", 
                                  nfeatures = 2000)

# Scale data and run PCA
seurat_obj <- ScaleData(seurat_obj, features = rownames(seurat_obj))
seurat_obj <- RunPCA(seurat_obj, features = VariableFeatures(object = seurat_obj))

# Clustering
seurat_obj <- FindNeighbors(seurat_obj, dims = 1:20)
seurat_obj <- FindClusters(seurat_obj, resolution = 0.5)
seurat_obj <- RunUMAP(seurat_obj, dims = 1:20)

# Visualize clustering results
DimPlot(seurat_obj, reduction = "umap", label = TRUE, pt.size = 0.5)`}</code>
                              </pre>
                            </div>
                            <div className="bg-gray-100 p-4 rounded-lg">
                              <img 
                                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop" 
                                alt="UMAP Clustering"
                                className="w-full h-80 object-cover rounded"
                              />
                              <p className="text-sm text-gray-600 mt-2">UMAP visualization showing 8 distinct cell clusters identified in the tumor sample</p>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Results */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-blue-600">5. Results & Cell Type Identification</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid md:grid-cols-2 gap-4 mb-6">
                              <div className="bg-blue-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-blue-800 mb-2">Cell Type Distribution</h4>
                                <ul className="space-y-2 text-sm">
                                  <li className="flex justify-between">
                                    <span>T cells</span>
                                    <span className="font-semibold">35% (4,496 cells)</span>
                                  </li>
                                  <li className="flex justify-between">
                                    <span>Macrophages</span>
                                    <span className="font-semibold">22% (2,826 cells)</span>
                                  </li>
                                  <li className="flex justify-between">
                                    <span>Cancer cells</span>
                                    <span className="font-semibold">18% (2,312 cells)</span>
                                  </li>
                                  <li className="flex justify-between">
                                    <span>B cells</span>
                                    <span className="font-semibold">12% (1,542 cells)</span>
                                  </li>
                                  <li className="flex justify-between">
                                    <span>NK cells</span>
                                    <span className="font-semibold">8% (1,028 cells)</span>
                                  </li>
                                  <li className="flex justify-between">
                                    <span>Dendritic cells</span>
                                    <span className="font-semibold">5% (642 cells)</span>
                                  </li>
                                </ul>
                              </div>
                              <div className="bg-green-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-green-800 mb-2">Key Findings</h4>
                                <ul className="space-y-1 text-sm text-green-700">
                                  <li>• 156 differentially expressed genes identified</li>
                                  <li>• Strong immune activation signatures detected</li>
                                  <li>• High T cell infiltration in tumor core</li>
                                  <li>• Upregulated checkpoint genes (PD1, CTLA4)</li>
                                  <li>• Novel cancer cell subpopulations discovered</li>
                                </ul>
                              </div>
                            </div>
                            
                            <div className="bg-gray-800 rounded-t-lg px-4 py-2">
                              <span className="text-green-400 text-sm font-mono">Cell [4]: Differential Expression Analysis</span>
                            </div>
                            <pre className="bg-gray-900 text-green-300 p-4 rounded-b-lg overflow-x-auto text-sm font-mono">
                              <code>{`# Find markers for each cluster
cluster_markers <- FindAllMarkers(seurat_obj, only.pos = TRUE, 
                                 min.pct = 0.25, logfc.threshold = 0.25)

# Top 5 markers per cluster
top5_markers <- cluster_markers %>% 
  group_by(cluster) %>% 
  top_n(n = 5, wt = avg_log2FC)

print(top5_markers)`}</code>
                            </pre>
                          </CardContent>
                        </Card>
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  
                  <TabsContent value="data">
                    <Card>
                      <CardHeader>
                        <CardTitle>Dataset Information</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Data Source</h4>
                            <p className="text-gray-600">10X Genomics single-cell RNA-seq data from tumor biopsies</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Sample Information</h4>
                            <ul className="text-gray-600 space-y-1">
                              <li>• 12,847 cells analyzed</li>
                              <li>• 23,420 genes detected</li>
                              <li>• Tumor tissue from 3 patients</li>
                              <li>• Quality filtered to 10,234 high-quality cells</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="discussion">
                    <Card>
                      <CardHeader>
                        <CardTitle>Discussion & Future Directions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <p className="text-gray-700">
                            This comprehensive single-cell analysis revealed significant insights into tumor microenvironment composition 
                            and immune cell dynamics. The high T cell infiltration and presence of immune activation signatures suggest 
                            potential for immunotherapy approaches.
                          </p>
                          <div>
                            <h4 className="font-semibold mb-2">Clinical Implications</h4>
                            <ul className="text-gray-600 space-y-1">
                              <li>• Identified potential biomarkers for patient stratification</li>
                              <li>• Immune checkpoint expression patterns support immunotherapy consideration</li>
                              <li>• Novel cancer cell subpopulations may represent treatment resistance mechanisms</li>
                            </ul>
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
                        {['R', 'Seurat', 'ggplot2', 'dplyr', 'Bioconductor'].map(tech => (
                          <span key={tech} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wide mb-2">Analysis Type</h4>
                      <p className="text-sm text-gray-700">Single-cell RNA sequencing, Clustering, Differential Expression</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wide mb-2">Dataset Size</h4>
                      <p className="text-sm text-gray-700">10,234 cells × 23,420 genes</p>
                    </div>
                    <Button className="w-full" size="sm">
                      <Github size={16} className="mr-2" />
                      View Code Repository
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">About the Author</CardTitle>
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
                      Computational biologist specializing in single-cell genomics and cancer research.
                    </p>
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
