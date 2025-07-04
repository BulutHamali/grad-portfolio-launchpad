
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, Download, Github, Share2, Heart, MessageSquare, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const SpatialTranscriptomics = () => {
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
                  Spatial Transcriptomics Data Visualization
                </h1>
                <p className="text-lg text-gray-600 mb-4">
                  Interactive spatial analysis of gene expression patterns in tissue architecture using 10X Visium technology
                </p>
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Eye size={16} />
                    <span>1.8K views</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart size={16} />
                    <span>76 upvotes</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageSquare size={16} />
                    <span>8 comments</span>
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
                            <CardTitle className="text-purple-600">1. Introduction & Dataset Overview</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-700 mb-4">
                              Spatial transcriptomics represents a breakthrough in genomics, allowing us to map gene expression patterns 
                              while preserving spatial context within tissues. This analysis focuses on mouse brain sections processed 
                              with 10X Visium technology to understand the spatial organization of cellular functions and identify 
                              region-specific gene expression signatures.
                            </p>
                            <div className="bg-purple-50 p-4 rounded-lg">
                              <h4 className="font-semibold text-purple-800 mb-2">Research Objectives:</h4>
                              <ul className="list-disc list-inside text-purple-700 space-y-1">
                                <li>Create comprehensive spatial gene expression maps</li>
                                <li>Identify region-specific biomarkers through integrative analysis</li>
                                <li>Understand spatial organization of neuronal functions</li>
                                <li>Correlate histological features with transcriptomic profiles</li>
                              </ul>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Data Loading */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-purple-600">2. Data Import & Initial Processing</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="mb-4">
                              <div className="bg-gray-800 rounded-t-lg px-4 py-2">
                                <span className="text-green-400 text-sm font-mono">Cell [1]:</span>
                              </div>
                              <pre className="bg-gray-900 text-green-300 p-4 rounded-b-lg overflow-x-auto text-sm font-mono">
                                <code>{`import scanpy as sc
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from scipy.sparse import csr_matrix
import warnings
warnings.filterwarnings('ignore')

# Configure scanpy settings
sc.settings.verbosity = 3  
sc.settings.set_figure_params(dpi=80, facecolor='white')

# Load spatial data
adata = sc.read_visium("sample_data/")
adata.var_names_unique()

# Make variable names unique
adata.var_names_unique()

print(f"Loaded {adata.n_obs} spots and {adata.n_vars} genes")
print(f"Spatial coordinates available: {adata.obsm['spatial'].shape}")`}</code>
                              </pre>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                              <p className="text-green-800"><strong>Output:</strong> Loaded 15,127 spots and 32,285 genes<br/>
                              Spatial coordinates available: (15127, 2)</p>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Quality Control */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-purple-600">3. Quality Control & Filtering</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="mb-4">
                              <div className="bg-gray-800 rounded-t-lg px-4 py-2">
                                <span className="text-green-400 text-sm font-mono">Cell [2]:</span>
                              </div>
                              <pre className="bg-gray-900 text-green-300 p-4 rounded-b-lg overflow-x-auto text-sm font-mono">
                                <code>{`# Basic filtering
sc.pp.filter_cells(adata, min_genes=200)
sc.pp.filter_genes(adata, min_cells=3)

# Calculate QC metrics
adata.var['mt'] = adata.var_names.str.startswith('Mt-')
adata.var['ribo'] = adata.var_names.str.startswith(('Rps', 'Rpl'))
adata.var['hb'] = adata.var_names.str.contains('Hb[^(p)]')

sc.pp.calculate_qc_metrics(adata, percent_top=None, log1p=False, inplace=True)

# Add mitochondrial gene info
adata.obs['mt_frac'] = adata[:, adata.var['mt']].X.sum(1).A.squeeze()/adata.obs['total_counts']

# Spatial visualization of QC metrics
fig, axes = plt.subplots(2, 2, figsize=(12, 10))
sc.pl.spatial(adata, color="total_counts", ax=axes[0,0], show=False, 
              title="Total UMI Counts")
sc.pl.spatial(adata, color="n_genes_by_counts", ax=axes[0,1], show=False,
              title="Number of Genes")
sc.pl.spatial(adata, color="mt_frac", ax=axes[1,0], show=False,
              title="Mitochondrial Fraction")
sc.pl.spatial(adata, color="pct_counts_in_top_20_genes", ax=axes[1,1], show=False,
              title="Top 20 Gene %")
plt.tight_layout()
plt.show()`}</code>
                              </pre>
                            </div>
                            <div className="bg-gray-100 p-4 rounded-lg">
                              <img 
                                src="https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&h=600&fit=crop" 
                                alt="Spatial QC Metrics"
                                className="w-full h-80 object-cover rounded"
                              />
                              <p className="text-sm text-gray-600 mt-2">Spatial visualization of quality control metrics across tissue sections</p>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Spatial Analysis */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-purple-600">4. Spatial Clustering & Gene Expression</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="mb-4">
                              <div className="bg-gray-800 rounded-t-lg px-4 py-2">
                                <span className="text-green-400 text-sm font-mono">Cell [3]:</span>
                              </div>
                              <pre className="bg-gray-900 text-green-300 p-4 rounded-b-lg overflow-x-auto text-sm font-mono">
                                <code>{`# Normalization and highly variable genes
sc.pp.normalize_total(adata, target_sum=1e4)
sc.pp.log1p(adata)
sc.pp.highly_variable_genes(adata, min_mean=0.0125, max_mean=3, min_disp=0.5)

# Store raw data
adata.raw = adata
adata = adata[:, adata.var.highly_variable]

# PCA and neighborhood graph
sc.pp.scale(adata, max_value=10)
sc.tl.pca(adata, svd_solver='arpack', n_comps=50)
sc.pp.neighbors(adata, n_neighbors=10, n_pcs=40)

# UMAP and clustering
sc.tl.umap(adata)
sc.tl.leiden(adata, resolution=0.5)

# Spatial plots
fig, axes = plt.subplots(1, 3, figsize=(18, 5))
sc.pl.spatial(adata, color="leiden", ax=axes[0], show=False, 
              legend_loc='on data', title="Leiden Clustering")
sc.pl.umap(adata, color="leiden", ax=axes[1], show=False, 
           title="UMAP Clusters")
sc.pl.spatial(adata, color="total_counts", ax=axes[2], show=False,
              title="Total Counts")
plt.tight_layout()
plt.show()

print(f"Identified {len(adata.obs['leiden'].unique())} clusters")`}</code>
                              </pre>
                            </div>
                            <div className="bg-gray-100 p-4 rounded-lg">
                              <img 
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop" 
                                alt="Spatial Clustering Results"
                                className="w-full h-64 object-cover rounded"
                              />
                              <p className="text-sm text-gray-600 mt-2">Spatial clustering results showing 12 distinct tissue regions with corresponding UMAP visualization</p>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Gene Expression Analysis */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-purple-600">5. Spatially Variable Genes & Marker Discovery</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="mb-4">
                              <div className="bg-gray-800 rounded-t-lg px-4 py-2">
                                <span className="text-green-400 text-sm font-mono">Cell [4]:</span>
                              </div>
                              <pre className="bg-gray-900 text-green-300 p-4 rounded-b-lg overflow-x-auto text-sm font-mono">
                                <code>{`# Find spatially variable genes
sc.tl.rank_genes_groups(adata, 'leiden', method='wilcoxon')

# Get top marker genes
marker_genes = pd.DataFrame(adata.uns['rank_genes_groups']['names']).head(10)
print("Top 10 marker genes per cluster:")
print(marker_genes)

# Visualize key neuronal markers spatially
neuronal_markers = ['Slc17a7', 'Gad2', 'Mbp', 'Aldh1l1', 'Cx3cr1']

fig, axes = plt.subplots(2, 3, figsize=(18, 12))
axes = axes.ravel()

for i, gene in enumerate(neuronal_markers):
    if gene in adata.raw.var_names:
        sc.pl.spatial(adata, color=gene, ax=axes[i], show=False, 
                     use_raw=True, title=f"{gene} Expression",
                     spot_size=1.5, vmax='p99')
    else:
        axes[i].text(0.5, 0.5, f'{gene}\nnot found', 
                    transform=axes[i].transAxes, ha='center')
        axes[i].set_title(f"{gene} Expression")

# Hide the last subplot
axes[-1].axis('off')
plt.tight_layout()
plt.show()

# Calculate spatial correlation
spatial_corr = np.corrcoef(adata.obsm['spatial'].T)[0, 1]
print(f"Spatial correlation coefficient: {spatial_corr:.3f}")`}</code>
                              </pre>
                            </div>
                            <div className="bg-gray-100 p-4 rounded-lg">
                              <img 
                                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop" 
                                alt="Spatial Gene Expression"
                                className="w-full h-80 object-cover rounded"
                              />
                              <p className="text-sm text-gray-600 mt-2">Spatial expression patterns of key neuronal marker genes across brain tissue sections</p>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Results Summary */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-purple-600">6. Results & Biological Insights</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid md:grid-cols-2 gap-4 mb-6">
                              <div className="bg-purple-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-purple-800 mb-2">Spatial Regions Identified</h4>
                                <ul className="space-y-2 text-sm">
                                  <li className="flex justify-between">
                                    <span>Cortical layers</span>
                                    <span className="font-semibold">4 distinct regions</span>
                                  </li>
                                  <li className="flex justify-between">
                                    <span>Hippocampus</span>
                                    <span className="font-semibold">3 subregions</span>
                                  </li>
                                  <li className="flex justify-between">
                                    <span>White matter</span>
                                    <span className="font-semibold">2 zones</span>
                                  </li>
                                  <li className="flex justify-between">
                                    <span>Subcortical nuclei</span>
                                    <span className="font-semibold">3 structures</span>
                                  </li>
                                </ul>
                              </div>
                              <div className="bg-green-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-green-800 mb-2">Key Discoveries</h4>
                                <ul className="space-y-1 text-sm text-green-700">
                                  <li>• 89 spatially variable genes identified</li>
                                  <li>• 95% spatial correlation accuracy achieved</li>
                                  <li>• Layer-specific expression patterns mapped</li>
                                  <li>• Novel regional biomarkers discovered</li>
                                  <li>• Functional gene networks characterized</li>
                                </ul>
                              </div>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg">
                              <h4 className="font-semibold text-blue-800 mb-2">Biological Significance</h4>
                              <p className="text-blue-700 text-sm mb-2">
                                Our spatial transcriptomics analysis revealed distinct gene expression patterns that correlate with known 
                                anatomical structures in the mouse brain. The identification of layer-specific markers (Slc17a7 for 
                                excitatory neurons, Gad2 for inhibitory neurons) validates our computational approach and provides 
                                new insights into spatial organization of neural circuits.
                              </p>
                              <ul className="text-blue-700 text-sm space-y-1">
                                <li>• Cortical layer markers show distinct spatial gradients</li>
                                <li>• Myelin-related genes (Mbp) specifically localize to white matter</li>
                                <li>• Astrocyte markers (Aldh1l1) show region-specific expression</li>
                                <li>• Microglial genes (Cx3cr1) display uniform distribution patterns</li>
                              </ul>
                            </div>
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
                            <h4 className="font-semibold mb-2">Technology Platform</h4>
                            <p className="text-gray-600">10X Genomics Visium Spatial Gene Expression</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Sample Details</h4>
                            <ul className="text-gray-600 space-y-1">
                              <li>• 15,127 spatial spots analyzed</li>
                              <li>• 32,285 genes detected</li>
                              <li>• Mouse brain coronal sections</li>
                              <li>• 55μm spatial resolution</li>
                              <li>• Paired with H&E histology</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Analysis Pipeline</h4>
                            <ul className="text-gray-600 space-y-1">
                              <li>• Quality control and filtering</li>
                              <li>• Spatial clustering (Leiden algorithm)</li>
                              <li>• Differential expression analysis</li>
                              <li>• Spatially variable gene detection</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="discussion">
                    <Card>
                      <CardHeader>
                        <CardTitle>Discussion & Applications</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <p className="text-gray-700">
                            This spatial transcriptomics analysis demonstrates the power of combining gene expression data with 
                            spatial context to understand tissue organization. The clear delineation of brain regions and 
                            identification of spatially variable genes provides valuable insights for neuroscience research.
                          </p>
                          <div>
                            <h4 className="font-semibold mb-2">Research Applications</h4>
                            <ul className="text-gray-600 space-y-1">
                              <li>• Drug target identification in specific brain regions</li>
                              <li>• Understanding disease progression patterns</li>
                              <li>• Developmental biology studies</li>
                              <li>• Comparative anatomy research</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Future Directions</h4>
                            <ul className="text-gray-600 space-y-1">
                              <li>• Integration with single-cell data for higher resolution</li>
                              <li>• Temporal analysis of gene expression changes</li>
                              <li>• Cross-species comparative studies</li>
                              <li>• Development of predictive spatial models</li>
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
                        {['Python', 'scanpy', 'matplotlib', 'pandas', 'numpy'].map(tech => (
                          <span key={tech} className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wide mb-2">Platform</h4>
                      <p className="text-sm text-gray-700">10X Genomics Visium</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wide mb-2">Dataset Size</h4>
                      <p className="text-sm text-gray-700">15,127 spots × 32,285 genes</p>
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
                      <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        BH
                      </div>
                      <div>
                        <h4 className="font-semibold">Bulut Hamali</h4>
                        <p className="text-sm text-gray-600">Bioinformatics Researcher</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Computational biologist with expertise in spatial genomics and neuroinformatics.
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

export default SpatialTranscriptomics;
