
const About = () => {
  return (
    <section id="about" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-slate-800">About Me</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-8 text-white shadow-xl">
                <h3 className="text-2xl font-semibold mb-4">My Journey</h3>
                <p className="text-blue-100 leading-relaxed">
                  Currently completing the intensive Perscholas SWE MERN Stack bootcamp, 
                  where I've gained hands-on experience building full-stack applications. 
                  I'm passionate about clean code, user experience, and solving complex problems 
                  through technology.
                </p>
              </div>
            </div>

            <div className="animate-fade-in">
              <h3 className="text-2xl font-semibold mb-6 text-slate-800">What I Bring</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-slate-600">Strong foundation in MERN stack development</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-slate-600">Experience with modern development tools and practices</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-slate-600">Collaborative mindset and eagerness to learn</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-slate-600">Problem-solving approach to development challenges</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
