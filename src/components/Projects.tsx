
import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Code2, BarChart3, Database } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Shortly URL Shortener App",
      description: "Responsive web application built with Tailwind CSS and JavaScript that shortens URLs using the CleanURI API, featuring copy-to-clipboard functionality and mobile-first design.",
      tech: ["JavaScript", "Tailwind CSS", "API Integration", "Responsive Design"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      github: "https://github.com/BulutHamali/url-shortening-api",
      live: "https://shortly-url-app.netlify.app/",
      category: "Web Development"
    },
    {
      title: "Personal Blog Application",
      description: "Clean, minimal blog interface with mobile-friendly responsive design. Built with vanilla HTML, CSS, and JavaScript focusing on user experience and accessibility.",
      tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop",
      github: "https://github.com/BulutHamali/personal-blog-sba",
      live: "https://personal-blog-app-buluthamali.netlify.app",
      category: "Web Development"
    },
    {
      title: "Task Management System",
      description: "Interactive task tracking application with full CRUD functionality - add, complete, delete, and organize tasks with persistent local storage.",
      tech: ["JavaScript", "Local Storage", "DOM Manipulation", "CSS3"],
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      github: "https://github.com/BulutHamali/task-management-app",
      live: "https://task-management-app-buluthamali.netlify.app/",
      category: "Web Development"
    },
    {
      title: "Single-Cell RNA-seq Analysis Pipeline",
      summary: "Comprehensive scRNA-seq analysis identifying cell types and biomarkers in cancer tissue samples.",
      background: "Analyzed 10,000+ single cells from tumor biopsies to identify distinct cell populations and their gene expression profiles, focusing on immune cell infiltration patterns.",
      goal: "Characterize cellular heterogeneity in tumor microenvironment and identify potential therapeutic targets through differential expression analysis.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
      codeSnippets: [
        {
          title: "Data Loading & QC",
          language: "R",
          code: `# Load libraries
library(Seurat)
library(dplyr)
library(ggplot2)

# Load 10X data
data <- Read10X(data.dir = "filtered_feature_bc_matrix/")
seurat_obj <- CreateSeuratObject(counts = data, 
                                project = "tumor_scrna",
                                min.cells = 3, 
                                min.features = 200)

# Quality control metrics
seurat_obj[["percent.mt"]] <- PercentageFeatureSet(seurat_obj, pattern = "^MT-")
VlnPlot(seurat_obj, features = c("nFeature_RNA", "nCount_RNA", "percent.mt"))`
        },
        {
          title: "Clustering Analysis",
          language: "R", 
          code: `# Normalization and scaling
seurat_obj <- NormalizeData(seurat_obj)
seurat_obj <- FindVariableFeatures(seurat_obj, nfeatures = 2000)
seurat_obj <- ScaleData(seurat_obj)

# PCA and clustering
seurat_obj <- RunPCA(seurat_obj, npcs = 50)
seurat_obj <- FindNeighbors(seurat_obj, dims = 1:20)
seurat_obj <- FindClusters(seurat_obj, resolution = 0.5)
seurat_obj <- RunUMAP(seurat_obj, dims = 1:20)

# Visualization
DimPlot(seurat_obj, reduction = "umap", label = TRUE)`
        }
      ],
      results: "Identified 8 distinct cell clusters including T cells (35%), macrophages (22%), cancer cells (18%), and B cells (12%). Discovered 156 differentially expressed genes with significant immune activation signatures.",
      tech: ["R", "Seurat", "Bioconductor", "scRNA-seq", "UMAP", "PCA"],
      category: "Bioinformatics",
      isDetailed: true
    },
    {
      title: "Spatial Transcriptomics Data Visualization",
      summary: "Interactive spatial analysis of gene expression patterns in tissue architecture using 10X Visium technology.",
      background: "Processed spatial transcriptomics data from mouse brain sections to map gene expression patterns across anatomical regions and understand spatial organization of cellular functions.",
      goal: "Create comprehensive spatial gene expression maps and identify region-specific biomarkers through integrative analysis of histology and transcriptomics data.",
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&h=400&fit=crop",
      codeSnippets: [
        {
          title: "Spatial Data Processing",
          language: "Python",
          code: `import scanpy as sc
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Load spatial data
adata = sc.read_visium("sample_data/")
adata.var_names_unique()

# Basic filtering
sc.pp.filter_cells(adata, min_genes=200)
sc.pp.filter_genes(adata, min_cells=3)

# Calculate QC metrics
adata.var['mt'] = adata.var_names.str.startswith('Mt-')
sc.pp.calculate_qc_metrics(adata, percent_top=None, 
                          log1p=False, inplace=True)`
        },
        {
          title: "Spatial Clustering",
          language: "Python",
          code: `# Normalization and highly variable genes
sc.pp.normalize_total(adata, target_sum=1e4)
sc.pp.log1p(adata)
sc.pp.highly_variable_genes(adata, min_mean=0.0125, 
                           max_mean=3, min_disp=0.5)

# PCA and neighborhood graph
sc.pp.pca(adata, n_comps=50)
sc.pp.neighbors(adata, n_neighbors=10, n_pcs=40)
sc.tl.umap(adata)
sc.tl.leiden(adata, resolution=0.5)

# Spatial plots
sc.pl.spatial(adata, color=['total_counts', 'leiden'],
              spot_size=1.5, save='_spatial_overview.pdf')`
        }
      ],
      results: "Mapped 15,000+ spatial spots revealing 12 distinct tissue regions. Identified 89 spatially variable genes including key neuronal markers (Slc17a7, Gad2) with 95% spatial correlation accuracy.",
      tech: ["Python", "scanpy", "matplotlib", "10X Visium", "Spatial Analysis"],
      category: "Bioinformatics", 
      isDetailed: true
    },
    {
      title: "Genomic Variant Analysis Dashboard",
      summary: "Interactive web dashboard for analyzing and visualizing genomic variants from whole-exome sequencing data.",
      background: "Developed a comprehensive analysis pipeline for processing VCF files from clinical exome sequencing, focusing on rare disease variant interpretation and pathogenicity assessment.",
      goal: "Create an intuitive interface for clinicians to explore variant data, assess pathogenicity scores, and generate automated reports for rare disease diagnosis.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
      codeSnippets: [
        {
          title: "Variant Data Processing",
          language: "Python",
          code: `import pandas as pd
import numpy as np
from cyvcf2 import VCF
import plotly.graph_objects as go
import dash
from dash import dcc, html, Input, Output

# Load and process VCF file
def process_vcf(vcf_path):
    variants = []
    for variant in VCF(vcf_path):
        variants.append({
            'chr': variant.CHROM,
            'pos': variant.POS,
            'ref': variant.REF,
            'alt': variant.ALT[0],
            'qual': variant.QUAL,
            'af': variant.INFO.get('AF', 0),
            'cadd_score': variant.INFO.get('CADD_PHRED', 0)
        })
    return pd.DataFrame(variants)

df_variants = process_vcf('sample.vcf.gz')`
        },
        {
          title: "Interactive Dashboard",
          language: "Python",
          code: `# Create Dash app
app = dash.Dash(__name__)

app.layout = html.Div([
    html.H1("Genomic Variant Analysis Dashboard"),
    
    dcc.Graph(id='variant-scatter'),
    
    dcc.Dropdown(
        id='chromosome-filter',
        options=[{'label': f'Chr {i}', 'value': str(i)} 
                for i in range(1, 23)] + [{'label': 'All', 'value': 'all'}],
        value='all'
    )
])

@app.callback(
    Output('variant-scatter', 'figure'),
    Input('chromosome-filter', 'value')
)
def update_scatter(selected_chr):
    filtered_df = df_variants if selected_chr == 'all' else \
                 df_variants[df_variants['chr'] == selected_chr]
    
    fig = go.Scatter(x=filtered_df['af'], y=filtered_df['cadd_score'],
                    mode='markers', name='Variants')
    return {'data': [fig]}`
        }
      ],
      results: "Processed 25,000+ variants across 50 patient samples. Dashboard enables real-time filtering by chromosome, frequency, and pathogenicity scores. Reduced variant interpretation time by 60%.",
      tech: ["Python", "Dash", "plotly", "pandas", "cyvcf2", "HTML/CSS"],
      category: "Bioinformatics",
      isDetailed: true
    },
    {
      title: "Machine Learning for Protein Structure Prediction",
      summary: "Deep learning model to predict protein secondary structure from amino acid sequences with high accuracy.",
      background: "Implemented a neural network approach to predict protein secondary structures (alpha-helix, beta-sheet, coil) from primary sequences, addressing the critical gap in structural bioinformatics.",
      goal: "Develop an accurate prediction model achieving >85% accuracy for secondary structure prediction to aid in protein function annotation and drug design.",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=400&fit=crop",
      codeSnippets: [
        {
          title: "Data Preprocessing",
          language: "Python",
          code: `import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.utils import to_categorical
from Bio import SeqIO

# Load protein sequences and structures
def load_protein_data(fasta_file, dssp_file):
    sequences = []
    structures = []
    
    for record in SeqIO.parse(fasta_file, "fasta"):
        sequences.append(str(record.seq))
    
    # Parse DSSP secondary structure
    with open(dssp_file, 'r') as f:
        for line in f:
            if line.startswith('>'):
                continue
            structures.append(line.strip())
    
    return sequences, structures

# Encode sequences
amino_acids = 'ACDEFGHIKLMNPQRSTVWY'
aa_to_int = {aa: i for i, aa in enumerate(amino_acids)}

def encode_sequence(seq, max_len=500):
    encoded = np.zeros(max_len)
    for i, aa in enumerate(seq[:max_len]):
        if aa in aa_to_int:
            encoded[i] = aa_to_int[aa]
    return encoded`
        },
        {
          title: "Neural Network Model",
          language: "Python",
          code: `from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout, Embedding
from tensorflow.keras.optimizers import Adam

# Build LSTM model
def create_model(vocab_size=20, max_len=500, num_classes=3):
    model = Sequential([
        Embedding(vocab_size + 1, 128, input_length=max_len),
        LSTM(256, return_sequences=True, dropout=0.3),
        LSTM(128, return_sequences=True, dropout=0.3),
        Dense(64, activation='relu'),
        Dropout(0.5),
        Dense(num_classes, activation='softmax')
    ])
    
    model.compile(
        optimizer=Adam(learning_rate=0.001),
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    return model

# Train model
model = create_model()
history = model.fit(X_train, y_train, 
                   validation_data=(X_val, y_val),
                   epochs=50, batch_size=32, verbose=1)`
        }
      ],
      results: "Achieved 87.3% accuracy on test set across 1,200 protein sequences. Model successfully predicted secondary structures with precision scores: α-helix (0.89), β-sheet (0.85), coil (0.87).",
      tech: ["Python", "TensorFlow", "Keras", "BioPython", "LSTM", "Deep Learning"],
      category: "Research",
      isDetailed: true
    },
    {
      title: "Mobile Apps - Coming Soon",
      description: "Exciting mobile applications are currently in development. Stay tuned for innovative solutions that bridge the gap between scientific research and mobile technology.",
      tech: ["React Native", "TypeScript", "Mobile Development", "Coming Soon"],
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop",
      github: "#",
      live: "#",
      category: "Mobile Apps",
      isComingSoon: true
    }
  ];

  const categories = ["All", "Web Development", "Bioinformatics", "Research", "Mobile Apps"];
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [expandedProject, setExpandedProject] = React.useState(null);

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const toggleProjectExpansion = (index) => {
    setExpandedProject(expandedProject === index ? null : index);
  };

  return (
    <section id="projects" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4 text-slate-800">Featured Projects</h2>
        <p className="text-center text-slate-600 mb-8 max-w-3xl mx-auto">
          A showcase of both software engineering projects and computational biology research
        </p>
        
        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-lg p-2 shadow-md">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md mr-2 transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.category === 'Web Development' ? 'bg-blue-100 text-blue-800' :
                      project.category === 'Bioinformatics' ? 'bg-purple-100 text-purple-800' :
                      project.category === 'Mobile Apps' ? 'bg-orange-100 text-orange-800' :
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {project.category}
                    </span>
                  </div>
                  {project.isComingSoon && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white text-lg font-semibold bg-orange-600 px-4 py-2 rounded-lg">
                        Coming Soon
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-semibold mb-3 text-slate-800">{project.title}</h3>
                  
                  {project.isDetailed ? (
                    <div className="space-y-4">
                      <p className="text-sm text-blue-600 font-medium">{project.summary}</p>
                      
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium text-slate-700 mb-1">Background & Goal</h4>
                          <p className="text-sm text-slate-600">{project.background}</p>
                          <p className="text-sm text-slate-600 mt-1"><strong>Goal:</strong> {project.goal}</p>
                        </div>
                        
                        {expandedProject === index && (
                          <div className="space-y-4 animate-fade-in">
                            <div>
                              <h4 className="font-medium text-slate-700 mb-2 flex items-center">
                                <Code2 size={16} className="mr-2" />
                                Code Implementation
                              </h4>
                              {project.codeSnippets.map((snippet, idx) => (
                                <div key={idx} className="mb-4">
                                  <div className="bg-slate-800 rounded-t-lg px-4 py-2">
                                    <span className="text-green-400 text-sm font-mono">{snippet.title} ({snippet.language})</span>
                                  </div>
                                  <pre className="bg-slate-900 text-green-300 p-4 rounded-b-lg overflow-x-auto text-xs font-mono">
                                    <code>{snippet.code}</code>
                                  </pre>
                                </div>
                              ))}
                            </div>
                            
                            <div>
                              <h4 className="font-medium text-slate-700 mb-2 flex items-center">
                                <BarChart3 size={16} className="mr-2" />
                                Results & Impact
                              </h4>
                              <p className="text-sm text-slate-600 bg-green-50 p-3 rounded-lg">{project.results}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className="text-slate-600 mb-4 text-sm leading-relaxed">{project.description}</p>
                  )}
                  
                  <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                    <Database size={14} className="text-slate-500 mt-1" />
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={`px-2 py-1 rounded-md text-xs font-medium ${
                          project.isComingSoon 
                            ? 'bg-orange-100 text-orange-700' 
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-3 mt-auto">
                    {!project.isComingSoon ? (
                      <>
                        {project.isDetailed && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => toggleProjectExpansion(index)}
                            className="flex items-center space-x-2"
                          >
                            <Code2 size={16} />
                            <span>{expandedProject === index ? 'Hide Details' : 'View Details'}</span>
                          </Button>
                        )}
                        
                        {project.github && project.github !== "#" && (
                          <Button size="sm" variant="outline" className="flex items-center space-x-2" asChild>
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github size={16} />
                              <span>Code</span>
                            </a>
                          </Button>
                        )}
                        
                        {project.live && project.category === 'Web Development' && (
                          <Button size="sm" className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700" asChild>
                            <a href={project.live} target="_blank" rel="noopener noreferrer">
                              <ExternalLink size={16} />
                              <span>Live Demo</span>
                            </a>
                          </Button>
                        )}
                      </>
                    ) : (
                      <Button size="sm" disabled className="flex items-center space-x-2 bg-gray-400 cursor-not-allowed">
                        <Github size={16} />
                        <span>Coming Soon</span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-slate-800">Research Publications</h3>
            <p className="text-slate-600 mb-4">
              8+ peer-reviewed publications in computational biology, including work on cancer research, 
              genomics, and bioinformatics published in top-tier journals.
            </p>
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
              <Github size={16} className="mr-2" />
              View Research Portfolio
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
