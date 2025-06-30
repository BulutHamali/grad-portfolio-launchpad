
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Github, Linkedin } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
          Let's Connect
        </h2>
        
        <div className="grid md:grid-cols-2 gap-16 max-w-7xl mx-auto">
          <div className="animate-slide-in-left">
            <h3 className="text-3xl font-semibold mb-8 text-blue-100">Get In Touch</h3>
            <p className="text-slate-300 mb-12 leading-relaxed text-lg">
              I'm actively seeking new opportunities as a MERN stack developer. 
              Whether you have a project in mind, want to collaborate, or just want to say hello, 
              I'd love to hear from you!
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4 group hover:translate-x-2 transition-transform duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <a href="mailto:contact@buluthamali.com" className="text-slate-300 hover:text-white transition-colors text-lg">
                  contact@buluthamali.com
                </a>
              </div>
              
              <div className="flex items-center space-x-4 group hover:translate-x-2 transition-transform duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all">
                  <Linkedin className="w-6 h-6 text-white" />
                </div>
                <a href="https://linkedin.com/in/buluthamali" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors text-lg">
                  linkedin.com/in/buluthamali
                </a>
              </div>
              
              <div className="flex items-center space-x-4 group hover:translate-x-2 transition-transform duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full flex items-center justify-center group-hover:shadow-lg group-hover:shadow-gray-500/25 transition-all">
                  <Github className="w-6 h-6 text-white" />
                </div>
                <a href="https://github.com/BulutHamali" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors text-lg">
                  github.com/BulutHamali
                </a>
              </div>
              
              <div className="flex items-center space-x-4 group hover:translate-x-2 transition-transform duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center group-hover:shadow-lg group-hover:shadow-emerald-500/25 transition-all">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <span className="text-slate-300 text-lg">Cincinnati, OH, USA</span>
              </div>
            </div>
          </div>
          
          <div className="animate-fade-in">
            {/* Glassmorphism form container */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-10 shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
              <form className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <Input 
                      placeholder="Your Name" 
                      className="bg-white/5 border-white/20 text-white placeholder:text-slate-400 h-14 px-6 rounded-2xl backdrop-blur-sm transition-all duration-300 focus:bg-white/10 focus:border-blue-400/50 focus:shadow-lg focus:shadow-blue-500/20 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                  <div className="relative group">
                    <Input 
                      type="email" 
                      placeholder="Your Email" 
                      className="bg-white/5 border-white/20 text-white placeholder:text-slate-400 h-14 px-6 rounded-2xl backdrop-blur-sm transition-all duration-300 focus:bg-white/10 focus:border-blue-400/50 focus:shadow-lg focus:shadow-blue-500/20 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </div>
                
                <div className="relative group">
                  <Input 
                    placeholder="Subject" 
                    className="bg-white/5 border-white/20 text-white placeholder:text-slate-400 h-14 px-6 rounded-2xl backdrop-blur-sm transition-all duration-300 focus:bg-white/10 focus:border-blue-400/50 focus:shadow-lg focus:shadow-blue-500/20 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
                
                <div className="relative group">
                  <Textarea 
                    placeholder="Your Message" 
                    rows={6}
                    className="bg-white/5 border-white/20 text-white placeholder:text-slate-400 px-6 py-4 rounded-2xl backdrop-blur-sm resize-none transition-all duration-300 focus:bg-white/10 focus:border-blue-400/50 focus:shadow-lg focus:shadow-blue-500/20 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-14 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1"
                  size="lg"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
