import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Calendar, 
  ExternalLink, 
  Github, 
  MessageCircle, 
  Database, 
  BarChart3, 
  FileText, 
  Globe, 
  Users,
  GraduationCap,
  Building2,
  Stethoscope,
  Bot,
  Mail,
  Code,
  Microscope
} from "lucide-react";
import { useStripePayment } from "@/hooks/useStripePayment";
import { toast } from "sonner";

const HireMe = () => {
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [email, setEmail] = useState("");
  const { processPayment, isLoading } = useStripePayment();

  const handleBookingClick = () => {
    setShowEmailInput(true);
  };

  const handlePaymentAndBooking = async () => {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    const paymentSuccess = await processPayment(email);
    if (paymentSuccess) {
      // Reset form
      setShowEmailInput(false);
      setEmail("");
    }
  };
  const scrollToContact = () => {
    const element = document.getElementById('contact-form');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <a href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Bulut Hamali, PhD
            </a>
            <a href="/" className="text-slate-600 hover:text-blue-600 transition-colors">
              ← Back to Home
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6 text-slate-900">
            Ready to Transform Your Data into Insights?
          </h1>
          <p className="text-xl text-slate-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            I combine 14+ years of bioinformatics expertise with modern software engineering to deliver 
            custom solutions that bridge the gap between complex biological data and actionable results.
          </p>
          <Button 
            size="lg"
            onClick={scrollToContact}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Let's Work Together <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-slate-900">What I Can Do For You</h2>
          <p className="text-center text-slate-600 mb-16 max-w-2xl mx-auto">
            Specialized services combining computational biology expertise with full-stack development
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-100 hover:border-blue-200 transition-all">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-slate-900">RNA-seq & Single-Cell Analysis</h3>
              <ul className="text-slate-600 space-y-2">
                <li>• Bulk and single-cell RNA sequencing</li>
                <li>• Differential expression analysis</li>
                <li>• Pathway enrichment studies</li>
                <li>• Cell type identification & clustering</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-100 hover:border-blue-200 transition-all">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-6">
                <Microscope className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-slate-900">Spatial Transcriptomics</h3>
              <ul className="text-slate-600 space-y-2">
                <li>• Visium and other spatial platforms</li>
                <li>• Spatial gene expression mapping</li>
                <li>• Tissue architecture analysis</li>
                <li>• Integration with imaging data</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-100 hover:border-blue-200 transition-all">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-6">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-slate-900">Custom Analysis Pipelines</h3>
              <ul className="text-slate-600 space-y-2">
                <li>• Python & R pipeline development</li>
                <li>• Nextflow workflow automation</li>
                <li>• Cloud-based processing (AWS, GCP)</li>
                <li>• Reproducible research frameworks</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-100 hover:border-blue-200 transition-all">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-6">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-slate-900">Interactive Dashboards</h3>
              <ul className="text-slate-600 space-y-2">
                <li>• R Shiny applications</li>
                <li>• React-based web dashboards</li>
                <li>• Real-time data visualization</li>
                <li>• Custom reporting tools</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-100 hover:border-blue-200 transition-all">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-slate-900">Scientific Visualization</h3>
              <ul className="text-slate-600 space-y-2">
                <li>• Publication-ready figures</li>
                <li>• Interactive plots and charts</li>
                <li>• Multi-omics data integration</li>
                <li>• Custom visualization solutions</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-100 hover:border-blue-200 transition-all">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mb-6">
                <ExternalLink className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-slate-900">Bioinformatics Web Apps</h3>
              <ul className="text-slate-600 space-y-2">
                <li>• Full-stack web applications</li>
                <li>• Database design and management</li>
                <li>• API development and integration</li>
                <li>• User-friendly interfaces for complex data</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-slate-900">Perfect For</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Microscope className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900">Researchers</h3>
              <p className="text-slate-600">Academic researchers needing computational expertise for their projects</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900">Lab Heads</h3>
              <p className="text-slate-600">Principal investigators seeking to enhance their lab's computational capabilities</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900">Bio/Pharma Teams</h3>
              <p className="text-slate-600">Industry teams requiring specialized bioinformatics analysis and tools</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900">Clinicians</h3>
              <p className="text-slate-600">Medical professionals needing computational support for research projects</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-slate-900">See My Work</h2>
          <p className="text-center text-slate-600 mb-16 max-w-2xl mx-auto">
            Explore my portfolio of bioinformatics projects and web applications
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-100">
              <Github className="w-12 h-12 text-slate-400 mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-slate-900">GitHub Portfolio</h3>
              <p className="text-slate-600 mb-6">
                Browse my open-source projects, analysis pipelines, and code repositories
              </p>
              <Button 
                variant="outline" 
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                asChild
              >
                <a href="https://github.com/buluthamali" target="_blank" rel="noopener noreferrer">
                  View GitHub <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-100">
              <ExternalLink className="w-12 h-12 text-slate-400 mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-slate-900">Featured Projects</h3>
              <p className="text-slate-600 mb-6">
                Detailed case studies and examples of my bioinformatics work
              </p>
              <Button 
                variant="outline" 
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
              >
                Coming Soon <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-form" className="py-20 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">Let's Work Together</h2>
          <p className="text-center text-slate-300 mb-16 max-w-2xl mx-auto">
            Ready to transform your biological data into meaningful insights? Get in touch to discuss your project.
          </p>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Schedule a Consultation</h3>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
                <div className="flex items-center space-x-3 mb-4">
                  <Calendar className="w-8 h-8 text-blue-400" />
                  <span className="text-xl font-medium">Book a 30-Minute Call</span>
                </div>
                <p className="text-slate-300 mb-6 text-lg leading-relaxed">
                  I'd love to learn about your project and explore how we can work together! Let's have a friendly 30-minute conversation to discuss your goals and see how I can help bring your vision to life. Investment: $35
                </p>
                {!showEmailInput ? (
                  <Button 
                    onClick={handleBookingClick}
                    className="bg-blue-600 hover:bg-blue-700 text-white w-full text-lg py-3"
                  >
                    Let's Chat on Calendly <Calendar className="ml-2 w-5 h-5" />
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <Input 
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                      required
                    />
                    <div className="flex space-x-2">
                      <Button 
                        onClick={handlePaymentAndBooking}
                        disabled={isLoading}
                        className="bg-blue-600 hover:bg-blue-700 text-white flex-1 text-lg py-3"
                      >
                        {isLoading ? "Processing..." : "Reserve Your Consultation ($35)"}
                      </Button>
                      <Button 
                        onClick={() => setShowEmailInput(false)}
                        variant="outline"
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
              <form action="https://formspree.io/f/xeokdkaq" method="POST" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input 
                    name="name"
                    placeholder="Your Name" 
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                    required
                  />
                  <Input 
                    type="email" 
                    name="email"
                    placeholder="Your Email" 
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                    required
                  />
                </div>
                <Input 
                  name="project-type"
                  placeholder="Project Type (e.g., RNA-seq Analysis)" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                  required
                />
                <Textarea 
                  name="message"
                  placeholder="Tell me about your project, timeline, and specific needs..." 
                  rows={5}
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                  required
                />
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  size="lg"
                >
                  Send Message <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Microservices Section (Optional) */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4 text-slate-900">Quick Analysis Services</h2>
          <p className="text-slate-600 mb-12 max-w-2xl mx-auto">
            Need something specific? Get professional analysis reports and visualizations delivered quickly.
          </p>
          
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto border border-slate-100">
            <h3 className="text-xl font-semibold mb-4 text-slate-900">Coming Soon: Express Services</h3>
            <p className="text-slate-600 mb-6">
              Quick turnaround services for specific analyses, custom plots, and data reports. 
              Perfect for when you need professional results fast.
            </p>
            <Button 
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
            >
              Get Notified When Available
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HireMe;
