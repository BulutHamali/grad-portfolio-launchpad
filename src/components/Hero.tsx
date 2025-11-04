
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail, Briefcase, Users } from "lucide-react";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="animate-fade-in">
          {/* Profile Image */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <img 
                src="/lovable-uploads/82761cb4-70b4-4bb4-a6a3-7e5bc399331c.png" 
                alt="Bulut Hamali, PhD" 
                className="w-48 h-48 rounded-full object-cover border-4 border-blue-400 shadow-2xl"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-blue-600/20 to-transparent"></div>
            </div>
          </div>

          <div className="mb-4">
            <span className="inline-block bg-gradient-to-r from-cyan-400 to-blue-400 text-slate-900 px-4 py-2 rounded-full text-sm font-semibold">
              PhD Scientist + Full-Stack Development
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Bulut Hamali, PhD
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-slate-300">
            Computational Biology Meets Modern Web Development
          </p>
          <p className="text-lg mb-6 text-slate-400 max-w-3xl mx-auto">
            14+ years analyzing complex biological data, now building full-stack applications. 
            Combining deep scientific expertise with modern MERN stack development to solve real-world problems.
          </p>

          {/* Professional Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center space-x-3 border border-white/20">
              <div className="w-6 h-6 bg-emerald-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">nf</span>
              </div>
              <span className="text-cyan-300 font-medium text-sm">Nextflow Ambassador</span>
            </div>
            <div 
              onClick={() => window.open('https://www.linkedin.com/in/buluthamali', '_blank', 'noopener,noreferrer')}
              className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center space-x-3 border border-white/20 hover:bg-white/20 transition-colors cursor-pointer"
            >
              <Linkedin className="w-5 h-5 text-blue-400" />
              <span className="text-cyan-300 font-medium text-sm">4,500+ LinkedIn Followers</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8"
              asChild
            >
              <a href="/hire-me">
                <Briefcase className="mr-2 w-5 h-5" />
                Hire Me for Your Project
              </a>
            </Button>
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => scrollToSection('projects')}
            >
              View My Work
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
              onClick={() => scrollToSection('contact')}
            >
              Get In Touch
            </Button>
          </div>

          <div className="flex justify-center space-x-6 mb-20">
            <a href="https://github.com/buluthamali" className="text-slate-400 hover:text-blue-400 transition-colors">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com/in/buluthamali" className="text-slate-400 hover:text-blue-400 transition-colors">
              <Linkedin size={24} />
            </a>
            <a 
              href="#contact" 
              className="text-slate-400 hover:text-blue-400 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
            >
              <Mail size={24} />
            </a>
          </div>
        </div>

        <div className="animate-bounce">
          <ArrowDown 
            size={32} 
            className="mx-auto text-slate-400 cursor-pointer hover:text-blue-400 transition-colors"
            onClick={() => scrollToSection('about')}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
