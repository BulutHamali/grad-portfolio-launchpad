
import { Cloud, Brain, Code, Dna, Linkedin } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      title: "Cloud & Infrastructure",
      icon: <Cloud className="w-8 h-8" />,
      skills: ["AWS", "Terraform", "Docker", "GitHub Actions CI/CD", "Vercel", "Nextflow on AWS", "Linux/Unix", "SLURM"],
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "AI & Machine Learning",
      icon: <Brain className="w-8 h-8" />,
      skills: ["Anthropic Claude API", "CrewAI", "Multi-agent systems", "Python ML ecosystem", "Scikit-learn", "Pandas", "NumPy"],
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Full-Stack Development",
      icon: <Code className="w-8 h-8" />,
      skills: ["Next.js", "React", "TypeScript", "Node.js", "FastAPI", "PostgreSQL", "Supabase", "Stripe"],
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Bioinformatics",
      icon: <Dna className="w-8 h-8" />,
      skills: ["Scanpy", "Seurat", "Squidpy", "Nextflow", "Snakemake", "Single-cell RNA-seq", "Spatial transcriptomics", "R / Bioconductor"],
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4 text-slate-800">Skills & Technologies</h2>
        <p className="text-center text-slate-600 mb-12 max-w-3xl mx-auto">
          Most cloud engineers don't understand scientific workloads. Most bioinformaticians can't
          architect cloud-native systems. This is the intersection Bulut works in.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
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
                  href="https://www.linkedin.com/in/bulut-hamali/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:transform hover:scale-105 transition-transform"
                >
                  <div className="flex items-center justify-center gap-2 text-3xl font-bold text-blue-600 mb-2">
                    <Linkedin className="w-6 h-6" />
                    <span>5,000+</span>
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
