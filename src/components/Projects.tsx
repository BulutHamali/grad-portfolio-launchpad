import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  github?: string;
  live?: string;
}

const Projects = () => {
  const projects: Project[] = [
    {
      title: "BioSignal Radar",
      description: "Full-stack trend detection platform that surfaces emerging bioinformatics research from bioRxiv preprints using Claude API, PubMed, and GitHub signals.",
      tech: ["Next.js", "Claude API", "Python", "Vercel"],
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
      live: "https://biosignal-radar.vercel.app"
      // TODO: verify — add GitHub link once repo is public
    },
    {
      title: "ClinPilot",
      description: "Multi-agent clinical trial analysis platform using CrewAI and Anthropic's Claude API with cost-optimized orchestration and email notifications.",
      tech: ["CrewAI", "Anthropic API", "Python", "Streamlit"],
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop"
      // TODO: verify — add GitHub and live links once available
    },
    {
      title: "Phrased",
      description: "Micro-SaaS writing improvement tool with paywalled writing tools and free viral translators for growth.",
      tech: ["Next.js", "Claude Haiku", "Stripe", "Supabase", "Vercel"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      live: "https://usephrased.com"
      // TODO: verify — add GitHub link if repo becomes public
    },
    {
      title: "ResearchGapFinder",
      description: "AI pipeline for detecting scientific knowledge gaps from biomedical literature with a model-agnostic LLM interface supporting Groq, Anthropic, and Ollama.",
      tech: ["Python", "Groq", "Anthropic", "Ollama"],
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop",
      github: "https://github.com/BulutHamali/ResearchGapFinder"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4 text-slate-800">Featured Projects</h2>
        <p className="text-center text-slate-600 mb-12 max-w-3xl mx-auto">
          Projects at the intersection of cloud infrastructure, AI/ML, and computational biology.
        </p>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-semibold mb-3 text-slate-800">{project.title}</h3>
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed flex-grow">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
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
