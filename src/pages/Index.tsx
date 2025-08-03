
import Hero from "@/components/Hero";
import VideoIntro from "@/components/VideoIntro";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { BookingPayment } from "@/components/BookingPayment";

const Index = () => {
  return (
    <div className="min-h-screen font-inter">
      <Hero />
      <VideoIntro />
      <About />
      <Skills />
      <Projects />
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Book a Consultation</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ready to discuss your bioinformatics project? Book a 30-minute consultation session to explore how I can help bring your research to life.
            </p>
          </div>
          <BookingPayment />
        </div>
      </section>
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
