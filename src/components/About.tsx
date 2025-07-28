import { Button } from "@/components/ui/button";
import { Github, Globe } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-slate-800">About Me</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="animate-slide-in-left">
              <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-8 text-white shadow-xl mb-8">
                <h3 className="text-2xl font-semibold mb-4">Scientific Background</h3>
                <p className="text-blue-100 leading-relaxed mb-4">
                  PhD-trained molecular biologist and bioinformatician with 14+ years of experience 
                  analyzing complex biological data. Specialized in single-cell RNA sequencing, 
                  spatial transcriptomics, and genomic data interpretation.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="bg-blue-500 px-3 py-1 rounded-full text-sm">scRNA-seq Analysis</span>
                  <span className="bg-blue-500 px-3 py-1 rounded-full text-sm">Spatial Transcriptomics</span>
                  <span className="bg-blue-500 px-3 py-1 rounded-full text-sm">Machine Learning</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
                <h3 className="text-2xl font-semibold mb-4">Tech Transition</h3>
                <p className="text-emerald-100 leading-relaxed">
                  Currently completing Per Scholas Full-Stack Software Engineering program, 
                  building modern web applications with MERN stack while applying my analytical 
                  mindset to software development challenges.
                </p>
              </div>
            </div>

            <div className="animate-fade-in">
              <h3 className="text-2xl font-semibold mb-6 text-slate-800">What Makes Me Unique</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-slate-600">
                    <strong>Research Experience:</strong> 14+ years in computational biology with publications 
                    in top-tier journals and expertise in high-performance computing
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-slate-600">
                    <strong>Data Expertise:</strong> Advanced skills in Python, R, and SQL for complex 
                    data analysis, machine learning, and statistical modeling
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-slate-600">
                    <strong>Problem Solving:</strong> Proven ability to design and execute research projects, 
                    from hypothesis to publication
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-slate-600">
                    <strong>Modern Development:</strong> Hands-on experience building responsive, 
                    full-stack applications with JavaScript, React, Node.js, and MongoDB
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-slate-600">
                    <strong>Cloud & HPC:</strong> Experience with AWS, Azure, Google Cloud, and 
                    high-performance computing environments (SLURM)
                  </p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-slate-100 rounded-xl">
                <h4 className="font-semibold text-slate-800 mb-2">Education Highlights</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• PhD Biochemistry - Medical University of Vienna</li>
                  <li>• MS Genetics & Developmental Biology - University of Vienna</li>
                  <li>• BS Molecular Biology & Genetics - Halic University</li>
                  <li>• Full-Stack Software Engineering - Per Scholas (2025)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-slate-800">Research & Knowledge Sharing</h3>
            <p className="text-slate-600 mb-4">
              5+ peer-reviewed publications in computational biology, including work on cancer research, 
              genomics, and bioinformatics published in top-tier journals.
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                variant="outline" 
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                onClick={() => window.open("https://scholar.google.com.sg/citations?user=aQ0Ml_wAAAAJ&hl=en", "_blank")}
              >
                <Github size={16} className="mr-2" />
                View Research Portfolio
              </Button>
              <Button 
                variant="outline" 
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
                onClick={() => window.open("https://bioinformaticsuniverse.com", "_blank")}
              >
                <Globe size={16} className="mr-2" />
                Visit My Blog
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
