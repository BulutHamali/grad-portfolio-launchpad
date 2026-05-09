import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowRight, Code2 } from "lucide-react";
import { Link } from "react-router-dom";

interface Project {
  title: string;
  description?: string;
  summary?: string;
  background?: string;
  results?: string;
  tech: string[];
  image: string;
  github?: string;
  live?: string;
  category: string;
  isDetailed?: boolean;
  projectPath?: string;
}

const Projects = () => {
  const projects: Project[] = [
    // ── AI/ML & Cloud projects ──────────────────────────────────────────────
    {
      title: "BioSignal Radar",
      description: "Full-stack trend detection platform that surfaces emerging bioinformatics research from bioRxiv preprints using Claude API, PubMed, and GitHub signals.",
      tech: ["Next.js", "Claude API", "Python", "Vercel"],
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
      live: "https://biosignal-radar.vercel.app",
      // TODO: verify — add GitHub link once repo is public
      category: "AI/ML & Cloud"
    },
    {
      title: "ClinPilot",
      description: "Multi-agent clinical trial analysis platform using CrewAI and Anthropic's Claude API with cost-optimized orchestration and email notifications.",
      tech: ["CrewAI", "Anthropic API", "Python", "Streamlit"],
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
      live: "https://clinpilot.buluthamali.com",
      category: "AI/ML & Cloud"
    },
    {
      title: "Phrased",
      description: "Micro-SaaS writing improvement tool with paywalled writing tools and free viral translators for growth.",
      tech: ["Next.js", "Claude Haiku", "Stripe", "Supabase", "Vercel"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      live: "https://usephrased.com",
      // TODO: verify — add GitHub link if repo becomes public
      category: "AI/ML & Cloud"
    },
    {
      title: "ResearchGapFinder",
      description: "AI pipeline for detecting scientific knowledge gaps from biomedical literature with a model-agnostic LLM interface supporting Groq, Anthropic, and Ollama.",
      tech: ["Python", "Groq", "Anthropic", "Ollama"],
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop",
      live: "https://researchgapfinder.buluthamali.com",
      category: "AI/ML & Cloud"
    },

    // ── Bioinformatics & Research projects ─────────────────────────────────
    {
      title: "Single-Cell RNA-seq Analysis Pipeline",
      summary: "Comprehensive scRNA-seq analysis of PBMC dataset identifying cell types and biomarkers using R/Seurat pipeline.",
      background: "Analyzed 2,700 peripheral blood mononuclear cells from 10X Genomics PBMC 3k dataset to identify distinct cell populations and their gene expression profiles, focusing on immune cell characterization.",
      results: "Identified 8 distinct cell clusters including T cells (35%), monocytes (22%), B cells (18%), and NK cells (12%). Discovered 156 differentially expressed genes with significant immune cell signatures.",
      tech: ["R", "Seurat", "Bioconductor", "scRNA-seq", "UMAP", "PCA"],
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
      category: "Bioinformatics",
      isDetailed: true,
      projectPath: "/projects/single-cell-analysis"
    },
    {
      title: "MLAnalyzer: Drug Classification Workflow",
      summary: "Complete machine learning pipeline for drug classification using patient characteristics with 99.5% accuracy.",
      background: "Developed a comprehensive ML workflow analyzing synthetic patient records to predict optimal drug treatment based on age, sex, blood pressure, cholesterol, and Na/K ratio.",
      results: "Achieved 99.5% test accuracy using Random Forest. Comprehensive comparison of 5 ML algorithms with cross-validation, hyperparameter tuning, and detailed performance analysis.",
      tech: ["Python", "Scikit-learn", "XGBoost", "Pandas", "Matplotlib", "Seaborn"],
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
      category: "Bioinformatics",
      isDetailed: true,
      projectPath: "/projects/protein-prediction"
    },
    {
      title: "SDTM & ADaM Clinical Data Portfolio",
      summary: "Comprehensive clinical data pipeline using CDISC SDTM and ADaM standards required by FDA and EMA for regulatory submissions.",
      background: "Developed a complete clinical programming workflow using CDISC Pilot Study data to demonstrate industry-standard clinical data processing. Created analysis-ready datasets (ADaM) and generated tables, listings, and figures (TLFs) following regulatory guidelines.",
      results: "Successfully created ADSL and ADAE datasets with treatment-emergent flags, age groups, and automated pipeline. Generated regulatory-style summary tables and visualizations for adverse event and demographic analysis.",
      tech: ["R", "CDISC Standards", "SDTM", "ADaM", "Clinical Programming", "Regulatory Affairs"],
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
      github: "https://github.com/BulutHamali/sdtm-adam-pipeline",
      category: "Bioinformatics",
      isDetailed: true
    }
  ];

  const categories = ["All", "AI/ML & Cloud", "Bioinformatics"];
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section id="projects" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4 text-slate-800">Featured Projects</h2>
        <p className="text-center text-slate-600 mb-8 max-w-3xl mx-auto">
          Projects at the intersection of cloud infrastructure, AI/ML, and computational biology.
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
                      project.category === 'AI/ML & Cloud'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-semibold mb-3 text-slate-800">{project.title}</h3>

                  {project.isDetailed ? (
                    <div className="space-y-3 flex-grow">
                      <p className="text-sm text-blue-600 font-medium">{project.summary}</p>
                      <p className="text-sm text-slate-600">{project.background}</p>
                      {project.results && (
                        <div className="bg-green-50 p-3 rounded-lg">
                          <p className="text-xs text-green-700 font-medium">Key Results: {project.results}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-slate-600 mb-4 text-sm leading-relaxed flex-grow">
                      {project.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 my-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-3 mt-auto">
                    {project.isDetailed && project.projectPath ? (
                      <Button size="sm" className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700" asChild>
                        <Link to={project.projectPath}>
                          <Code2 size={16} />
                          <span>View Project</span>
                          <ArrowRight size={16} />
                        </Link>
                      </Button>
                    ) : null}
                    {project.github && (
                      <Button size="sm" variant="outline" className="flex items-center space-x-2" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github size={16} />
                          <span>Code</span>
                        </a>
                      </Button>
                    )}
                    {project.live && (
                      <Button size="sm" className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700" asChild>
                        <a href={project.live} target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={16} />
                          <span>Live Demo</span>
                        </a>
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
              5+ peer-reviewed publications in computational biology, including work on cancer research,
              genomics, and bioinformatics published in top-tier journals.
            </p>
            <Button
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
              onClick={() => window.open("https://scholar.google.com.sg/citations?user=aQ0Ml_wAAAAJ&hl=en", "_blank")}
            >
              View Research Portfolio
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
