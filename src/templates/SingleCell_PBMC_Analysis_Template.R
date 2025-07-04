
# Single-Cell RNA-seq Analysis of 10X PBMC Data
# Template for Google Colab with R kernel
# Author: Your Name
# Date: 2024

# =============================================================================
# SETUP AND INSTALLATION
# =============================================================================

# Install required packages (run this cell first in Google Colab)
if (!require("BiocManager", quietly = TRUE))
    install.packages("BiocManager")

# Install Bioconductor packages
BiocManager::install(c("SingleCellExperiment", "scater", "scran"))

# Install CRAN packages
install.packages(c("Seurat", "dplyr", "ggplot2", "patchwork", "RColorBrewer", 
                   "pheatmap", "viridis", "Matrix", "readr", "stringr"))

# Load libraries
library(Seurat)
library(dplyr)
library(ggplot2)
library(patchwork)
library(Matrix)
library(RColorBrewer)
library(pheatmap)
library(viridis)

# Set working directory (Google Colab specific)
setwd("/content")

# =============================================================================
# DATA DOWNLOAD AND LOADING
# =============================================================================

# Download 10X PBMC data (3k PBMCs from a healthy donor)
# This will download the filtered feature-barcode matrix
system("wget https://cf.10xgenomics.com/samples/cell/pbmc3k/pbmc3k_filtered_gene_bc_matrices.tar.gz")
system("tar -xzf pbmc3k_filtered_gene_bc_matrices.tar.gz")

# Load the PBMC dataset
pbmc.data <- Read10X(data.dir = "filtered_gene_bc_matrices/hg19/")

# Initialize the Seurat object with the raw (non-normalized data)
pbmc <- CreateSeuratObject(counts = pbmc.data, 
                          project = "pbmc3k", 
                          min.cells = 3, 
                          min.features = 200)

# Check basic information
print(paste("Number of cells:", ncol(pbmc)))
print(paste("Number of genes:", nrow(pbmc)))

# =============================================================================
# QUALITY CONTROL METRICS
# =============================================================================

# Calculate mitochondrial gene percentage
pbmc[["percent.mt"]] <- PercentageFeatureSet(pbmc, pattern = "^MT-")

# Calculate ribosomal gene percentage
pbmc[["percent.rb"]] <- PercentageFeatureSet(pbmc, pattern = "^RP[SL]")

# Visualize QC metrics as violin plots
VlnPlot(pbmc, features = c("nFeature_RNA", "nCount_RNA", "percent.mt"), ncol = 3)

# Visualize feature-feature relationships
plot1 <- FeatureScatter(pbmc, feature1 = "nCount_RNA", feature2 = "percent.mt")
plot2 <- FeatureScatter(pbmc, feature1 = "nCount_RNA", feature2 = "nFeature_RNA")
plot1 + plot2

# Display QC statistics
summary(pbmc$nFeature_RNA)
summary(pbmc$nCount_RNA)
summary(pbmc$percent.mt)

# =============================================================================
# CELL FILTERING
# =============================================================================

# Filter cells that have unique feature counts over 2,500 or less than 200
# Filter cells that have >5% mitochondrial counts
pbmc <- subset(pbmc, subset = nFeature_RNA > 200 & nFeature_RNA < 2500 & percent.mt < 5)

print(paste("Cells after filtering:", ncol(pbmc)))

# =============================================================================
# NORMALIZATION
# =============================================================================

# Normalize the data using LogNormalize method
pbmc <- NormalizeData(pbmc, normalization.method = "LogNormalize", scale.factor = 10000)

# =============================================================================
# HIGHLY VARIABLE FEATURES
# =============================================================================

# Find highly variable features
pbmc <- FindVariableFeatures(pbmc, selection.method = "vst", nfeatures = 2000)

# Identify the 10 most highly variable genes
top10 <- head(VariableFeatures(pbmc), 10)
print("Top 10 highly variable genes:")
print(top10)

# Plot variable features with and without labels
plot1 <- VariableFeaturePlot(pbmc)
plot2 <- LabelPoints(plot = plot1, points = top10, repel = TRUE)
plot1 + plot2

# =============================================================================
# SCALING AND PCA
# =============================================================================

# Scale the data
all.genes <- rownames(pbmc)
pbmc <- ScaleData(pbmc, features = all.genes)

# Perform linear dimensional reduction (PCA)
pbmc <- RunPCA(pbmc, features = VariableFeatures(object = pbmc))

# Examine and visualize PCA results
print(pbmc[["pca"]], dims = 1:5, nfeatures = 5)

VizDimLoadings(pbmc, dims = 1:2, reduction = "pca")

DimPlot(pbmc, reduction = "pca")

# Heatmap of PCA
DimHeatmap(pbmc, dims = 1, cells = 500, balanced = TRUE)

# =============================================================================
# DETERMINE DIMENSIONALITY
# =============================================================================

# Use JackStraw to determine significant PCs
pbmc <- JackStraw(pbmc, num.replicate = 100)
pbmc <- ScoreJackStraw(pbmc, dims = 1:20)

JackStrawPlot(pbmc, dims = 1:15)

# Elbow plot
ElbowPlot(pbmc)

# =============================================================================
# CLUSTERING
# =============================================================================

# Find neighbors and clusters
pbmc <- FindNeighbors(pbmc, dims = 1:10)
pbmc <- FindClusters(pbmc, resolution = 0.5)

# Look at cluster IDs of the first 5 cells
head(Idents(pbmc), 5)

# =============================================================================
# NON-LINEAR DIMENSIONAL REDUCTION (UMAP)
# =============================================================================

# Run UMAP
pbmc <- RunUMAP(pbmc, dims = 1:10)

# Plot UMAP
DimPlot(pbmc, reduction = "umap", label = TRUE)

# Save the analysis
saveRDS(pbmc, file = "pbmc_analysis.rds")

# =============================================================================
# FIND CLUSTER BIOMARKERS
# =============================================================================

# Find markers for every cluster compared to all remaining cells
pbmc.markers <- FindAllMarkers(pbmc, only.pos = TRUE, min.pct = 0.25, logfc.threshold = 0.25)

# Group by cluster and show top 2 markers per cluster
pbmc.markers %>%
    group_by(cluster) %>%
    slice_max(n = 2, order_by = avg_log2FC)

# Find markers for cluster 2
cluster2.markers <- FindMarkers(pbmc, ident.1 = 2, min.pct = 0.25)
head(cluster2.markers, n = 5)

# Visualize marker expression
VlnPlot(pbmc, features = c("MS4A1", "CD79A"))

# Feature plot on UMAP
FeaturePlot(pbmc, features = c("MS4A1", "GNLY", "CD3E", "CD14", "FCER1A", "FCGR3A", "LYZ", "PPBP", "CD8A"))

# Heatmap of top markers
pbmc.markers %>%
    group_by(cluster) %>%
    top_n(n = 10, wt = avg_log2FC) -> top10

DoHeatmap(pbmc, features = top10$gene) + NoLegend()

# =============================================================================
# CELL TYPE ANNOTATION
# =============================================================================

# Based on canonical markers, assign cell type identity to clusters
new.cluster.ids <- c("Naive CD4 T", "CD14+ Mono", "Memory CD4 T", "B", "CD8 T", "FCGR3A+ Mono",
                     "NK", "DC", "Platelet")
names(new.cluster.ids) <- levels(pbmc)
pbmc <- RenameIdents(pbmc, new.cluster.ids)

# Plot with cell type labels
DimPlot(pbmc, reduction = "umap", label = TRUE, pt.size = 0.5) + NoLegend()

# =============================================================================
# CELL TYPE DISTRIBUTION ANALYSIS
# =============================================================================

# Calculate cell type proportions
cell_counts <- table(Idents(pbmc))
cell_proportions <- prop.table(cell_counts) * 100

print("Cell Type Distribution:")
print(round(cell_proportions, 2))

# Create a bar plot of cell type distribution
cell_type_df <- data.frame(
  CellType = names(cell_proportions),
  Percentage = as.numeric(cell_proportions),
  Count = as.numeric(cell_counts)
)

ggplot(cell_type_df, aes(x = reorder(CellType, -Percentage), y = Percentage)) +
  geom_bar(stat = "identity", fill = "steelblue") +
  theme_minimal() +
  labs(title = "Cell Type Distribution in PBMC Sample",
       x = "Cell Type",
       y = "Percentage (%)") +
  theme(axis.text.x = element_text(angle = 45, hjust = 1))

# =============================================================================
# DIFFERENTIAL EXPRESSION ANALYSIS
# =============================================================================

# Compare B cells vs all other cells
b_cell_markers <- FindMarkers(pbmc, ident.1 = "B", min.pct = 0.25)
head(b_cell_markers, n = 10)

# Compare CD14+ Monocytes vs FCGR3A+ Monocytes
mono_markers <- FindMarkers(pbmc, ident.1 = "CD14+ Mono", ident.2 = "FCGR3A+ Mono", min.pct = 0.25)
head(mono_markers, n = 10)

# Volcano plot for B cell markers
library(EnhancedVolcano)
if (!require("EnhancedVolcano")) {
  BiocManager::install("EnhancedVolcano")
  library(EnhancedVolcano)
}

EnhancedVolcano(b_cell_markers,
                lab = rownames(b_cell_markers),
                x = 'avg_log2FC',
                y = 'p_val_adj',
                title = 'B cells vs All other cells',
                pCutoff = 0.05,
                FCcutoff = 0.5)

# =============================================================================
# PATHWAY ANALYSIS (OPTIONAL)
# =============================================================================

# Install and load clusterProfiler for pathway analysis
if (!require("clusterProfiler")) {
  BiocManager::install("clusterProfiler")
  library(clusterProfiler)
}

if (!require("org.Hs.eg.db")) {
  BiocManager::install("org.Hs.eg.db")
  library(org.Hs.eg.db)
}

# Get significant B cell markers
significant_b_markers <- rownames(b_cell_markers[b_cell_markers$p_val_adj < 0.05 & b_cell_markers$avg_log2FC > 0.5, ])

# Convert gene symbols to Entrez IDs
gene_list <- bitr(significant_b_markers, fromType = "SYMBOL", toType = "ENTREZID", OrgDb = org.Hs.eg.db)

# GO enrichment analysis
go_results <- enrichGO(gene = gene_list$ENTREZID,
                       OrgDb = org.Hs.eg.db,
                       ont = "BP",
                       pAdjustMethod = "BH",
                       pvalueCutoff = 0.05)

# Plot GO results
dotplot(go_results, showCategory = 10)

# =============================================================================
# SAVE RESULTS
# =============================================================================

# Save the final Seurat object
saveRDS(pbmc, file = "/content/pbmc_final_analysis.rds")

# Export cell type assignments
cell_metadata <- data.frame(
  Barcode = colnames(pbmc),
  CellType = Idents(pbmc),
  nFeature_RNA = pbmc$nFeature_RNA,
  nCount_RNA = pbmc$nCount_RNA,
  percent_mt = pbmc$percent.mt
)

write.csv(cell_metadata, "/content/cell_metadata.csv", row.names = FALSE)

# Export marker genes
write.csv(pbmc.markers, "/content/cluster_markers.csv", row.names = TRUE)

# Summary statistics
cat("\n=== ANALYSIS SUMMARY ===\n")
cat("Total cells analyzed:", ncol(pbmc), "\n")
cat("Total genes:", nrow(pbmc), "\n")
cat("Number of clusters:", length(unique(Idents(pbmc))), "\n")
cat("Cell types identified:", paste(unique(Idents(pbmc)), collapse = ", "), "\n")
cat("\nCell type distribution:\n")
print(cell_type_df)

print("Analysis complete! Check /content/ for saved files.")

# =============================================================================
# ADDITIONAL VISUALIZATIONS
# =============================================================================

# Create a comprehensive figure
p1 <- DimPlot(pbmc, reduction = "umap", group.by = "orig.ident")
p2 <- DimPlot(pbmc, reduction = "umap", label = TRUE, repel = TRUE)
p3 <- FeaturePlot(pbmc, features = "nCount_RNA")
p4 <- FeaturePlot(pbmc, features = "nFeature_RNA")

# Combine plots
combined_plot <- (p1 | p2) / (p3 | p4)
print(combined_plot)

# Feature plots for key markers
key_markers <- c("CD3E", "CD14", "MS4A1", "GNLY", "CD8A", "FCGR3A")
FeaturePlot(pbmc, features = key_markers, ncol = 3)

print("Template notebook complete! You now have a full single-cell RNA-seq analysis pipeline.")

