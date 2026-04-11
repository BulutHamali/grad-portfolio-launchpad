import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-slate-800">About Me</h2>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="animate-slide-in-left">
              <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-8 text-white shadow-xl mb-8">
                <h3 className="text-2xl font-semibold mb-4">Education</h3>
                <ul className="text-blue-100 space-y-2 text-sm">
                  <li>• PhD, Biochemistry — Medical University of Vienna</li>
                  <li>• MS, Genetics &amp; Developmental Biology — University of Vienna</li>
                  <li>• BS, Molecular Biology &amp; Genetics — Halic University</li>
                  <li>• AI Solutions Development — Per Scholas (2025)</li>
                  <li>• Full-Stack Software Engineering — Per Scholas (2025)</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
                <h3 className="text-2xl font-semibold mb-4">Open to Roles</h3>
                <ul className="text-emerald-100 space-y-2 text-sm">
                  <li>• Cloud Engineer</li>
                  <li>• AI / ML Engineer</li>
                  <li>• Full-Stack Software Engineer</li>
                  <li>• Computational Biologist</li>
                </ul>
                <p className="text-emerald-200 text-sm mt-4">Based in Mason / Cincinnati, OH</p>
              </div>
            </div>

            <div className="animate-fade-in space-y-5 text-slate-600 leading-relaxed">
              <p>
                I started my career in the wet lab — pipettes, cell cultures, and molecular biology experiments.
                My PhD at the Medical University of Vienna was in Biochemistry, and over the next several years
                I moved deeper into computational work: analyzing sequencing data, building bioinformatics pipelines,
                and running large-scale genomic analyses.
              </p>
              <p>
                That transition from bench to code led me to cloud infrastructure. Scientific workloads — scRNA-seq,
                spatial transcriptomics, genomic variant calling — need serious compute, and managing that compute
                well requires real engineering. I built expertise in AWS, Terraform, and Docker specifically to
                scale these kinds of workflows. I'm also a Nextflow Ambassador, which puts me at the center of
                the workflow orchestration community in bioinformatics.
              </p>
              <p>
                More recently I've been building at the intersection of cloud and AI. I've shipped tools using
                the Claude API, multi-agent frameworks like CrewAI, and full-stack applications with Next.js
                and Supabase. I completed Per Scholas certifications in AI Solutions Development and Full-Stack
                Software Engineering in 2025.
              </p>
              <p>
                What makes my background unusual: most cloud engineers have never worked with scientific data,
                and most bioinformaticians don't architect production infrastructure. I do both. That's the gap
                I fill.
              </p>

              <div className="mt-6 p-6 bg-slate-100 rounded-xl">
                <h4 className="font-semibold text-slate-800 mb-3">Research &amp; Knowledge Sharing</h4>
                <p className="text-slate-600 text-sm mb-4">
                  5+ peer-reviewed publications in computational biology — cancer research, genomics, and
                  bioinformatics in top-tier journals.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                    onClick={() => window.open("https://scholar.google.com.sg/citations?user=aQ0Ml_wAAAAJ&hl=en", "_blank")}
                  >
                    View Publications
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
                    onClick={() => window.open("https://bioinformaticsuniverse.com", "_blank")}
                  >
                    <Globe size={14} className="mr-1" />
                    Visit My Blog
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
