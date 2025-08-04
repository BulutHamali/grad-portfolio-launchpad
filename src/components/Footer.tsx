
import { Github, Linkedin, Mail, Globe } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Build Something Amazing?</h3>
          <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
            I'm excited to bring fresh perspectives and dedication to your development team. 
            Let's create innovative solutions together!
          </p>
          
          <div className="flex justify-center space-x-6 mb-8">
            <a 
              href="https://github.com/buluthamali" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-slate-700"
            >
              <Github size={24} />
            </a>
            <a 
              href="https://linkedin.com/in/buluthamali" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-slate-700"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href="#contact" 
              className="text-slate-400 hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-slate-700"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Mail size={24} />
            </a>
            <a 
              href="https://bioinformaticsuniverse.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-emerald-400 transition-colors p-2 rounded-full hover:bg-slate-700"
            >
              <Globe size={24} />
            </a>
          </div>
          
          <div className="border-t border-slate-700 pt-8">
            <p className="text-slate-400">
              © {currentYear} Portfolio. Built with React & Tailwind CSS. 
              <span className="block sm:inline sm:ml-2">Perscholas SWE Bootcamp Graduate</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
