
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Mail, MessageCircle, Calendar } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Ready to Discuss Your Project?</h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Whether you need bioinformatics analysis, custom web applications, or scientific consulting, 
            I'm here to help transform your ideas into reality.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Get Started</h3>
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <ArrowRight className="w-6 h-6 text-emerald-400" />
                  <span className="text-lg font-medium">View Detailed Services</span>
                </div>
                <p className="text-slate-300 mb-4">
                  Explore my specialized bioinformatics and development services
                </p>
                <Button 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white w-full"
                  asChild
                >
                  <a href="/hire-me">
                    See What I Can Do <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Calendar className="w-6 h-6 text-blue-400" />
                  <span className="text-lg font-medium">Schedule a Consultation</span>
                </div>
                <p className="text-slate-300 mb-4">
                  Book a free 30-minute call to discuss your project needs
                </p>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600 w-full"
                  asChild
                >
                  <a href="https://calendly.com/buluthamali" target="_blank" rel="noopener noreferrer">
                    Book on Calendly <Calendar className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-6">Send a Quick Message</h3>
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
                placeholder="Your message..." 
                rows={5}
                className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
              />
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                size="lg"
              >
                <MessageCircle className="mr-2 w-4 h-4" />
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
