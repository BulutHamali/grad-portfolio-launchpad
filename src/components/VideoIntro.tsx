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
          
          {/* Video Container - Placeholder for now */}
          <div className="mb-8 rounded-lg overflow-hidden shadow-2xl bg-slate-200 dark:bg-slate-800">
            <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-blue-100 to-slate-100 dark:from-blue-900 dark:to-slate-900">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <p className="text-slate-600 dark:text-slate-400 font-medium">
                  Video will be embedded here
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
