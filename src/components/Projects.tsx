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
  imagePosition?: string;
  highlight?: string;
  github?: string;
  live?: string;
  category: string;
  status?: "in-development";
  developmentNote?: string;
  isDetailed?: boolean;
  projectPath?: string;
}

const Projects = () => {
  const projects: Project[] = [

    {
      title: "Genomics",
      description: "Live Genomics Reproducell platform guiding researchers from aligned reads and a reference genome to variant calling, quality checks, reviewable reports, and a reproducible workflow record.",
      highlight: "A reviewable path from aligned reads and a reference genome to variants, quality checks, scientific validation, and exportable provenance—so every call can be defended and reproduced.",
      tech: ["Genomics", "Variant Calling", "GATK", "AWS", "React"],
      image: "/project-screenshots/genomics.jpg",
      live: "https://genomics-reproducell.vercel.app",
      category: "Bioinformatics"
    },
    {
      title: "Multi-omics",
      description: "Live Multiomics Reproducell platform guiding researchers from scRNA-seq, scATAC-seq, and spatial inputs to integrated states, regulatory programs, and reproducible biological insights.",
      highlight: "A reproducible way to compare RNA, ATAC, and spatial signals in one workflow, with frozen inputs, AWS evaluation, and provenance that makes integrated states easier to audit.",
      tech: ["Multi-omics", "scRNA-seq", "scATAC-seq", "AWS", "React"],
      image: "/project-screenshots/multiomics.jpg",
      live: "https://multiomics-reproducell.vercel.app",
      category: "Bioinformatics"
    },
    {
      title: "Perturb-seq",
      description: "Live Perturb Reproducell platform guiding researchers from guide-level metadata and single-cell counts to perturbation effects, responder states, and reproducible reports for the next experiment.",
      highlight: "A structured path from guide-level metadata and single-cell counts to perturbation signatures, responder states, and effect sizes, with a frozen benchmark and reproducible report.",
      tech: ["Perturb-seq", "scRNA-seq", "AWS", "React"],
      image: "/project-screenshots/perturb-seq.jpg",
      live: "https://perturb-reproducell.vercel.app",
      category: "Bioinformatics"
    },
    {
      title: "Spatial Transcriptomics",
      description: "Live Spatial Reproducell platform for reproducible spatial-transcriptomics analysis, guiding researchers from spatial expression and image metadata through quality control, neighborhood structure, cell populations, and a reproducible export bundle.",
      highlight: "A reproducible path from spatial expression and image metadata to quality control, neighborhood analysis, cell populations, and exportable results, with workflow provenance captured for every run.",
      tech: ["Spatial Transcriptomics", "Seurat", "Scanpy", "AWS", "React"],
      image: "/project-screenshots/spatial-transcriptomics.jpg",
      live: "https://spatial-reproducell.vercel.app",
      category: "Bioinformatics"
    },


    // ── Featured / Recent projects ──────────────────────────────────────────
    {
      title: "scRNA-Reproducell",
      description: "Reproducibility-first single-cell RNA-seq analysis platform for QC, clustering, UMAP, marker discovery, and manifest-backed exports.",
      highlight: "A full workflow from matrix upload to reproducible export, with every parameter and software version captured in a run manifest.",
      tech: ["Python", "Scanpy", "React", "AWS", "Nextflow"],
      image: "/project-screenshots/scrna-reproducell.jpg",
      live: "https://scrna-reproducell.buluthamali.com/",
      category: "Bioinformatics"
    },
    {
      title: "Drug Discovery Target Prioritization",
      description: "Leakage-safe ML pipeline that combines population genetics, functional genomics, and clinical-phase labels to rank druggable targets.",
      highlight: "Prospective evaluation produced 5.59× enrichment in the top 1% of ranked genes against a later clinical-phase release.",
      tech: ["Python", "AWS Batch", "Nextflow", "XGBoost", "Terraform"],
      image: "https://raw.githubusercontent.com/BulutHamali/drug-discovery-target-prioritization/main/docs/figures/enrichment_curve.png",
      live: "https://drugtargets.buluthamali.com/",
      category: "Bioinformatics"
    },

    // ── AI/ML & Cloud projects ──────────────────────────────────────────────
    {
      title: "BioSignal Radar",
      description: "Full-stack trend detection platform that surfaces emerging bioinformatics research from bioRxiv preprints using Claude API, PubMed, and GitHub signals.",
      tech: ["Next.js", "Claude API", "Python", "Vercel"],
      image: "/project-screenshots/biosignal-radar.jpg",
      live: "https://biosignal-radar.vercel.app",
      // TODO: verify — add GitHub link once repo is public
      category: "AI/ML & Cloud"
    },
    {
      title: "ClinPilot",
      description: "Multi-agent clinical trial analysis platform using CrewAI and Anthropic's Claude API with cost-optimized orchestration and email notifications.",
      tech: ["CrewAI", "Anthropic API", "Python", "Streamlit"],
      image: "/project-screenshots/clinpilot.jpg",
      live: "https://clinpilot.buluthamali.com",
      category: "AI/ML & Cloud"
    },
    {
      title: "UsePhrased",
      description: "Micro-SaaS writing improvement tool with paywalled writing tools and free viral translators for growth.",
      tech: ["Next.js", "Claude Haiku", "Stripe", "Supabase", "Vercel"],
      image: "/project-screenshots/phrased.jpg",
      live: "https://usephrased.com",
      // TODO: verify — add GitHub link if repo becomes public
      category: "AI/ML & Cloud"
    },
    {
      title: "ResearchGapFinder",
      description: "AI pipeline for detecting scientific knowledge gaps from biomedical literature with a model-agnostic LLM interface supporting Groq, Anthropic, and Ollama.",
      tech: ["Python", "Groq", "Anthropic", "Ollama"],
      image: "/project-screenshots/research-gap-finder.jpg",
      live: "https://researchgapfinder.buluthamali.com",
      category: "AI/ML & Cloud"
    },

    // ── Reproducell platforms in progress ──────────────────────────────────
    {
      title: "BioFlow MLOps",
      description: "A validated hybrid Kubernetes and HPC MLOps platform for reproducible bioinformatics inference, connecting durable orchestration, portable scientific workflows, and real HPC scheduling.",
      highlight: "Every result is tied back to its model, data, code, execution environment, and verified artifacts so long-running scientific workflows remain reproducible and auditable.",
      tech: ["Temporal", "Nextflow", "SLURM", "Kubernetes", "FastAPI"],
      image: "https://bioflow-mlops.vercel.app/og.png",
      live: "https://bioflow-mlops.vercel.app/",
      category: "In Development",
      status: "in-development",
      developmentNote: "Currently building — the public technical overview and validated local execution evidence are live."
    },
    {
      title: "OncoAtlas — Breast Cancer Multi-Omics Explorer",
      description: "A reproducible computational oncology atlas connecting independent public breast cancer cohorts across transcriptomics, single-cell states, spatial context, tumor methylation, and plasma cfDNA.",
      highlight: "Designed to trace candidate signals across independent cohorts without implying patient matching, with release gates that keep unavailable evidence visibly unavailable.",
      tech: ["Multi-omics", "Oncology", "Nextflow", "AWS", "React"],
      image: "/project-screenshots/oncology-multiomics-atlas.jpg",
      live: "https://oncology-multiomics-atlas.vercel.app",
      category: "In Development",
      status: "in-development",
      developmentNote: "Currently building — the public read-only demo is live while validated scientific artifacts are released."
    },


    // ── Bioinformatics & Research projects ─────────────────────────────────


    {
      title: "MLAnalyzer: Drug Classification Workflow",
      summary: "Complete machine learning pipeline for drug classification using patient characteristics with 99.5% accuracy.",
      background: "Developed a comprehensive ML workflow analyzing synthetic patient records to predict optimal drug treatment based on age, sex, blood pressure, cholesterol, and Na/K ratio.",
      results: "Achieved 99.5% test accuracy using Random Forest. Comprehensive comparison of 5 ML algorithms with cross-validation, hyperparameter tuning, and detailed performance analysis.",
      tech: ["Python", "Scikit-learn", "XGBoost", "Pandas", "Matplotlib", "Seaborn"],
      image: "/project-screenshots/ml-analyzer.png",
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
      image: "/project-screenshots/sdtm-adam.png",
      imagePosition: "center 28%",
      github: "https://github.com/BulutHamali/sdtm-adam-pipeline",
      category: "Bioinformatics",
      isDetailed: true
    }
  ];

  const categories = ["All", "AI/ML & Cloud", "Bioinformatics", "In Development"];
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(project => project.category === selectedCategory);
  const activeProjects = filteredProjects.filter(project => !project.status);
  const upcomingProjects = filteredProjects.filter(project => project.status === "in-development");

  const renderProjectCard = (project: Project, index: number) => (
    <div key={`${project.title}-${index}`} className="group">
      <div className={`bg-white rounded-xl shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col ${project.status === "in-development" ? "border border-amber-200 hover:shadow-xl" : "hover:shadow-xl"}`}>
        <div className="relative aspect-video overflow-hidden bg-slate-100">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            style={{ objectPosition: project.imagePosition ?? "center" }}
          />
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              project.category === 'AI/ML & Cloud'
                ? 'bg-blue-100 text-blue-800'
                : project.status === 'in-development'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-purple-100 text-purple-800'
            }`}>
              {project.category}
            </span>
          </div>
        </div>

        <div className="p-6 flex-grow flex flex-col">
          <h3 className="text-xl font-semibold mb-3 text-slate-800">{project.title}</h3>

          {project.highlight && (
            <div className="mb-4 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-700 mb-1">Why it matters</p>
              <p className="text-sm leading-relaxed text-slate-700">{project.highlight}</p>
            </div>
          )}

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

          {project.status === "in-development" && (
            <p className="text-xs font-medium text-amber-700 mb-2">
              {project.developmentNote ?? "Currently building — features and validated outputs are still being released."}
            </p>
          )}

          <div className="flex flex-wrap gap-2 my-4">
            {project.tech.map((tech, techIndex) => (
              <span key={techIndex} className="px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
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
  );

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

        {activeProjects.length > 0 && (
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
            {activeProjects.map(renderProjectCard)}
          </div>
        )}

        {upcomingProjects.length > 0 && (
          <div className={activeProjects.length > 0 ? "mt-16" : "mt-6"}>
            <div className="max-w-3xl mx-auto text-center mb-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-amber-700 mb-2">Currently building</p>
              <h3 className="text-2xl font-bold text-slate-700 mb-2">Projects in development</h3>
              <p className="text-slate-500">
                Active builds with public previews. Interfaces are live while validated scientific artifacts and features continue through release gates.
              </p>
            </div>
            <div className={`grid gap-8 ${upcomingProjects.length === 1 ? "max-w-3xl mx-auto" : "md:grid-cols-1 lg:grid-cols-2"}`}>
              {upcomingProjects.map(renderProjectCard)}
            </div>
          </div>
        )}

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
