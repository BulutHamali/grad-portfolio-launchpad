
import { Code, Database, Globe, Server, Brain, BarChart, Linkedin } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      title: "Bioinformatics & Data Science",
      icon: <Brain className="w-8 h-8" />,
      skills: ["Python", "R", "Bioconductor", "Seurat", "Scanpy", "DESeq2", "GSEA", "Machine Learning", "Statistical Analysis"],
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Frontend Development",
      icon: <Globe className="w-8 h-8" />,
      skills: ["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Responsive Design"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Backend & Databases",
      icon: <Server className="w-8 h-8" />,
      skills: ["Node.js", "Express.js", "MongoDB", "SQL", "RESTful APIs", "Authentication"],
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Cloud & HPC Computing",
      icon: <Database className="w-8 h-8" />,
      skills: ["AWS", "Azure", "Google Cloud", "SLURM", "Linux/Unix", "Docker"],
      color: "from-indigo-500 to-purple-500"
    },
    {
      title: "Genomics & Analysis",
      icon: <BarChart className="w-8 h-8" />,
      skills: ["scRNA-seq", "Spatial Transcriptomics", "GWAS", "NGS", "CRISPR Design", "Phylogenetics"],
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Tools & Development",
      icon: <Code className="w-8 h-8" />,
      skills: ["Git/GitHub", "VS Code", "Benchling", "Galaxy", "GraphPad Prism", "Postman"],
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4 text-slate-800">Skills & Technologies</h2>
        <p className="text-center text-slate-600 mb-12 max-w-3xl mx-auto">
          A unique combination of computational biology expertise and modern software development skills
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-slate-100 hover:border-slate-200 h-full">
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${category.color} text-white mb-4`}>
                  {category.icon}
                </div>
                
                <h3 className="text-xl font-semibold mb-4 text-slate-800">{category.title}</h3>
                
                <div className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="inline-block bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm mr-2 mb-2 hover:bg-slate-200 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 max-w-5xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4 text-slate-800">Research Impact & Professional Network</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">5+</div>
                <div className="text-slate-600">Scientific Publications</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">14+</div>
                <div className="text-slate-600">Years Research Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">4</div>
                <div className="text-slate-600">Universities & Research Institutions</div>
              </div>
              <div>
                <a 
                  href="https://linkedin.com/in/buluthamali" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block hover:transform hover:scale-105 transition-transform"
                >
                  <div className="flex items-center justify-center gap-2 text-3xl font-bold text-blue-600 mb-2">
                    <Linkedin className="w-6 h-6" />
                    <span>4,500+</span>
                  </div>
                  <div className="text-slate-600">LinkedIn Followers</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
