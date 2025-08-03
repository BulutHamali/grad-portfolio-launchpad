
import { Button } from "@/components/ui/button";

const VideoIntro = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 dark:text-white">
            👋 Meet Bulut – From Science to Software
          </h2>
          
          {/* Video Placeholder */}
          <div className="mb-8 rounded-lg overflow-hidden shadow-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700">
            <div className="aspect-video flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 5v10l7-5-7-5z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  Coming Soon
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  An introduction of Bulut Hamali will be embedded here soon
                </p>
              </div>
            </div>
          </div>

          <p className="text-lg text-slate-700 dark:text-slate-300 mb-8 leading-relaxed">
            Combining my background in molecular biology and bioinformatics with full-stack development, 
            I'm building tools that bridge research and technology. Let's connect!
          </p>

          <Button 
            size="lg"
            onClick={scrollToContact}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Let's Connect
          </Button>
        </div>
      </div>
    </section>
  );
};

export default VideoIntro;
