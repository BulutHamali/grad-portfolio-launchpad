
import { ExternalLink, Cpu, FlaskConical, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const VideoIntro = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      <div className="container mx-auto px-6">
        {/* Section label */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-600 dark:text-blue-400 mb-3">
            Selected Project
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            ResearchGapFinder
          </h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            AI-powered pipeline for surfacing scientific knowledge gaps from biomedical literature
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-10 items-center">
          {/* Demo embed */}
          <div className="md:col-span-3 rounded-xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700">
            <div className="bg-slate-800 flex items-center gap-2 px-4 py-2">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-3 text-xs text-slate-400 font-mono truncate">
                researchgapfinder.buluthamali.com/demo
              </span>
            </div>
            <iframe
              src="https://researchgapfinder.buluthamali.com/demo"
              title="ResearchGapFinder Demo"
              className="w-full aspect-video bg-white dark:bg-slate-900"
              allow="clipboard-write"
              loading="lazy"
            />
          </div>

          {/* Details */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                What it does
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Analyzes biomedical literature to automatically detect under-explored research areas, using a model-agnostic LLM interface that supports Groq, Anthropic, and Ollama.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                Built with
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Python", "Groq", "Anthropic", "Ollama", "NLP"].map((t) => (
                  <Badge key={t} variant="secondary" className="text-xs">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {[
                { icon: Brain, text: "Model-agnostic: swap LLM backends freely" },
                { icon: FlaskConical, text: "Grounded in PubMed & bioRxiv literature" },
                { icon: Cpu, text: "Automated gap-detection pipeline" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <Icon className="w-4 h-4 mt-0.5 text-blue-500 shrink-0" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">{text}</span>
                </div>
              ))}
            </div>

            <Button
              asChild
              className="bg-blue-600 hover:bg-blue-700 text-white w-full"
            >
              <a
                href="https://researchgapfinder.buluthamali.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Project <ExternalLink className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoIntro;
