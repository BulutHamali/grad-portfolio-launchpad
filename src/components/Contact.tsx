
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Linkedin, Github } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Let's Connect</h2>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="animate-slide-in-left">
            <h3 className="text-2xl font-semibold mb-6">Get In Touch</h3>
            <p className="text-slate-300 mb-8 leading-relaxed">
              I'm actively seeking new opportunities as a MERN stack developer. 
              Whether you have a project in mind, want to collaborate, or just want to say hello, 
              I'd love to hear from you!
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span className="text-slate-300">contact@buluthamali.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Linkedin className="w-5 h-5 text-blue-400" />
                <span className="text-slate-300">linkedin.com/in/buluthamali</span>
              </div>
              <div className="flex items-center space-x-3">
                <Github className="w-5 h-5 text-blue-400" />
                <span className="text-slate-300">github.com/BulutHamali</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span className="text-slate-300">Cincinnati, OH, USA</span>
              </div>
            </div>
          </div>
          
          <div className="animate-fade-in">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Input 
                  placeholder="Your Name" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                />
                <Input 
                  type="email" 
                  placeholder="Your Email" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                />
              </div>
              <Input 
                placeholder="Subject" 
                className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
              />
              <Textarea 
                placeholder="Your Message" 
                rows={5}
                className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
              />
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                size="lg"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
