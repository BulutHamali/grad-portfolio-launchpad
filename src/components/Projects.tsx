import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Code2, BarChart3, Database, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Projects = () => {
  const projects = [
    {
      title: "Recipe Discovery App",
      description: "Full-stack TypeScript application with modern React features for discovering and managing recipes. Built with responsive design, API integration, and user-friendly interface for culinary enthusiasts.",
      tech: ["TypeScript", "React", "API Integration", "Responsive Design"],
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
      github: "https://github.com/BulutHamali/recipe-discovery-app-ts",
      live: "https://fantastic-platypus-d118c5.netlify.app/",
      category: "Web Development"
    },
    {
      title: "IP Address Tracker",
      description: "Interactive web application that tracks and displays IP address information with geolocation mapping. Features real-time IP lookup, geographic visualization, and detailed network information display.",
      tech: ["TypeScript", "React", "Geolocation API", "Interactive Maps"],
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop",
      github: "https://github.com/BulutHamali/ip-tracker-app-ts",
      live: "https://radiant-phoenix-c1ae72.netlify.app/",
      category: "Web Development"
    },
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
      summary: "Comprehensive scRNA-seq analysis of PBMC dataset identifying cell types and biomarkers using R/Seurat pipeline.",
      background: "Analyzed 2,700 peripheral blood mononuclear cells from 10X Genomics PBMC 3k dataset to identify distinct cell populations and their gene expression profiles, focusing on immune cell characterization.",
      goal: "Characterize cellular heterogeneity in peripheral blood and identify cell type-specific markers through comprehensive single-cell transcriptomic analysis.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
      results: "Identified 8 distinct cell clusters including T cells (35%), monocytes (22%), B cells (18%), and NK cells (12%). Discovered 156 differentially expressed genes with significant immune cell signatures.",
      tech: ["R", "Seurat", "Bioconductor", "scRNA-seq", "UMAP", "PCA"],
      category: "Bioinformatics",
      isDetailed: true,
      projectPath: "/projects/single-cell-analysis"
    },
    {
      title: "Spatial Transcriptomics Data Visualization",
      description: "Advanced spatial analysis tool for mapping gene expression patterns across tissue architecture. This innovative project will integrate cutting-edge visualization techniques with spatial biology data to provide unprecedented insights into cellular organization and function.",
      tech: ["Python", "Spatial Analysis", "Data Visualization", "Coming Soon"],
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&h=400&fit=crop",
      github: "#",
      live: "#",
      category: "Bioinformatics",
      isComingSoon: true
    },
    {
      title: "Genomic Variant Analysis Tool",
      description: "Advanced computational pipeline for analyzing and visualizing genomic variants from whole-exome sequencing data. This comprehensive tool will provide intuitive interfaces for variant interpretation, pathogenicity assessment, and automated report generation for clinical genomics applications.",
      tech: ["Python", "Bioinformatics", "Data Analysis", "Coming Soon"],
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
      github: "#",
      live: "#",
      category: "Bioinformatics",
      isComingSoon: true
    },
    {
      title: "MLAnalyzer: Drug Classification Workflow",
      summary: "Complete machine learning pipeline for drug classification using patient characteristics with 99.5% accuracy.",
      background: "Developed a comprehensive ML workflow analyzing synthetic patient records to predict optimal drug treatment based on age, sex, blood pressure, cholesterol, and Na/K ratio.",
      goal: "Create an accurate multiclass classification model to assist healthcare providers in drug selection, achieving high accuracy across 5 different drug classes.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
      results: "Achieved 99.5% test accuracy using Random Forest. Comprehensive comparison of 5 ML algorithms with cross-validation, hyperparameter tuning, and detailed performance analysis.",
      tech: ["Python", "Scikit-learn", "XGBoost", "Pandas", "Matplotlib", "Seaborn"],
      category: "Research",
      isDetailed: true,
      projectPath: "/projects/protein-prediction"
    },
    {
      title: "SDTM & ADaM Clinical Data Portfolio",
      summary: "Comprehensive clinical data pipeline using CDISC SDTM and ADaM standards required by FDA and EMA for regulatory submissions.",
      background: "Developed a complete clinical programming workflow using CDISC Pilot Study data to demonstrate industry-standard clinical data processing. Created analysis-ready datasets (ADaM) and generated tables, listings, and figures (TLFs) following regulatory guidelines used in actual pharmaceutical submissions.",
      goal: "Showcase clinical programming skills by transforming raw SDTM datasets into ADaM analysis datasets and producing recruiter-friendly regulatory outputs including adverse event summaries and demographic breakdowns.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
      results: "Successfully created ADSL (subject-level) and ADAE (adverse events) datasets with treatment-emergent flags, age groups, and automated pipeline. Generated regulatory-style summary tables and visualizations showing AE distribution and demographics by treatment arm.",
      tech: ["R", "CDISC Standards", "SDTM", "ADaM", "Clinical Programming", "Regulatory Affairs", "Data Visualization"],
      category: "Research",
      isDetailed: true,
      github: "https://github.com/BulutHamali/sdtm-adam-pipeline"
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

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section id="projects" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4 text-slate-800">Featured Projects</h2>
        <p className="text-center text-slate-600 mb-8 max-w-3xl mx-auto">
          A showcase of both software engineering projects and computational biology research
        </p>
        
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
                      <p className="text-sm text-slate-600">{project.background}</p>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-xs text-green-700 font-medium">Key Results: {project.results}</p>
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
                        {project.isDetailed && project.projectPath ? (
                          <Button size="sm" className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700" asChild>
                            <Link to={project.projectPath}>
                              <Code2 size={16} />
                              <span>View Project</span>
                              <ArrowRight size={16} />
                            </Link>
                          </Button>
                        ) : (
                          <>
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
