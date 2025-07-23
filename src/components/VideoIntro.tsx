
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
          
          {/* YouTube Video */}
          <div className="mb-8 rounded-lg overflow-hidden shadow-2xl">
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/koLT32fh5G8"
                title="Meet Bulut - From Science to Software"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
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
