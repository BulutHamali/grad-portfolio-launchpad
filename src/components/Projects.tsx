
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Shortly URL Shortener App",
      description: "Responsive web application built with Tailwind CSS and JavaScript that shortens URLs using the CleanURI API, featuring copy-to-clipboard functionality and mobile-first design.",
      tech: ["JavaScript", "Tailwind CSS", "API Integration", "Responsive Design"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      github: "#",
      live: "#",
      category: "Web Development"
    },
    {
      title: "Personal Blog Application",
      description: "Clean, minimal blog interface with mobile-friendly responsive design. Built with vanilla HTML, CSS, and JavaScript focusing on user experience and accessibility.",
      tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
      image: "https://images.unsplash.com/photo-1486312338219-ce68e2c54346?w=600&h=400&fit=crop",
      github: "#",
      live: "#",
      category: "Web Development"
    },
    {
      title: "Task Management System",
      description: "Interactive task tracking application with full CRUD functionality - add, complete, delete, and organize tasks with persistent local storage.",
      tech: ["JavaScript", "Local Storage", "DOM Manipulation", "CSS3"],
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      github: "#",
      live: "#",
      category: "Web Development"
    },
    {
      title: "Spatial Transcriptomics Analysis",
      description: "Self-directed research project analyzing 10x Genomics Visium and Xenium datasets using VoltRon in R. Performed cell type deconvolution, H&E image alignment, and spatial molecular visualization.",
      tech: ["R", "VoltRon", "Bioinformatics", "10x Genomics", "Data Visualization"],
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
      github: "#",
      live: "#",
      category: "Bioinformatics"
    },
    {
      title: "Single-Cell RNA Sequencing Pipeline",
      description: "Comprehensive analysis of scRNA-seq data from HER2+ breast cancer models using Seurat and Scanpy. Includes quality control, normalization, clustering, and differential expression analysis.",
      tech: ["Python", "R", "Seurat", "Scanpy", "HPC/SLURM", "Statistical Analysis"],
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&h=400&fit=crop",
      github: "#",
      live: "#",
      category: "Bioinformatics"
    },
    {
      title: "Machine Learning for Protein Docking",
      description: "Utilized XGBoost machine learning to analyze mutation impacts on ARGLU1-MED1 protein interactions, identifying key residue changes affecting binding stability in cancer research.",
      tech: ["Python", "XGBoost", "Machine Learning", "Molecular Modeling", "Cancer Research"],
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=400&fit=crop",
      github: "#",
      live: "#",
      category: "Research"
    }
  ];

  const categories = ["All", "Web Development", "Bioinformatics", "Research"];
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
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {project.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-semibold mb-3 text-slate-800">{project.title}</h3>
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed flex-grow">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-slate-100 text-slate-700 px-2 py-1 rounded-md text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-3 mt-auto">
                    <Button size="sm" variant="outline" className="flex items-center space-x-2">
                      <Github size={16} />
                      <span>Code</span>
                    </Button>
                    {project.category === 'Web Development' && (
                      <Button size="sm" className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700">
                        <ExternalLink size={16} />
                        <span>Live Demo</span>
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
