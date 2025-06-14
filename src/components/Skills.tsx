
import { Code, Database, Globe, Server } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      icon: <Globe className="w-8 h-8" />,
      skills: ["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Backend",
      icon: <Server className="w-8 h-8" />,
      skills: ["Node.js", "Express.js", "RESTful APIs", "Authentication", "Middleware"],
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Database",
      icon: <Database className="w-8 h-8" />,
      skills: ["MongoDB", "Mongoose", "Database Design", "CRUD Operations"],
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Tools & Others",
      icon: <Code className="w-8 h-8" />,
      skills: ["Git", "GitHub", "VS Code", "Postman", "npm", "Responsive Design"],
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-slate-800">Skills & Technologies</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-slate-100 hover:border-slate-200">
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${category.color} text-white mb-4`}>
                  {category.icon}
                </div>
                
                <h3 className="text-xl font-semibold mb-4 text-slate-800">{category.title}</h3>
                
                <div className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="inline-block bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm mr-2 mb-2 hover:bg-slate-200 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
