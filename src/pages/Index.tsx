import Hero from "@/components/Hero";
import VideoIntro from "@/components/VideoIntro";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen font-inter">
      <SEO />
      <Hero />
      <VideoIntro />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
