// src/App.tsx
import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { profile, skills, experience, projects } from './portfolioData';
import type { SocialLink, Experience, Project } from './portfolioData';

// Animation Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardHover = {
  scale: 1.05,
  boxShadow: "0px 10px 30px rgba(59, 130, 246, 0.2)",
  transition: { type: "spring" as const, stiffness: 300 }
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      
      {/* Animated Background Gradient Blob */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-900/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="fixed w-full bg-gray-950/70 backdrop-blur-xl border-b border-gray-800 p-4 z-50"
      >
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition">
            {profile.name}
          </h1>
          <a href={`mailto:${profile.email}`} className="relative px-6 py-2 bg-linear-to-r from-blue-600 to-cyan-600 rounded-full text-sm font-bold shadow-lg shadow-blue-500/30 hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300">
            Contact Me
          </a>
        </div>
      </motion.nav>

      <main className="relative max-w-5xl mx-auto px-6 pt-32 pb-20 space-y-32 z-10">
        
        {/* Hero Section */}
        <section className="text-center space-y-8 min-h-[60vh] flex flex-col justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-4">
              Hi, I'm <span className="bg-linear-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">{profile.name}</span>
            </h2>
          </motion.div>
          
          {/* Typing Animation */}
          <div className="text-xl md:text-3xl text-gray-400 font-light h-10">
            <TypeAnimation
              sequence={[
                profile.role, 2000,
                "Building Scalable Systems", 2000,
                "Exploring AI & Genetic Algos", 2000,
                "Full Stack Developer", 2000
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-cyan-300 font-mono"
            />
          </div>

          <motion.p 
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            {profile.about}
          </motion.p>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex justify-center gap-8 pt-6"
          >
            {profile.social.map((link: SocialLink) => (
              <motion.a 
                key={link.name} 
                variants={fadeInUp}
                whileHover={{ scale: 1.2, rotate: 5, color: "#22d3ee" }}
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 text-3xl transition-colors"
              >
                <link.icon />
              </motion.a>
            ))}
          </motion.div>
        </section>

        {/* Skills Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h3 variants={fadeInUp} className="text-3xl font-bold mb-10 flex items-center gap-4">
            <span className="w-12 h-1 bg-linear-to-r from-cyan-500 to-blue-500 rounded-full"></span>
            Technical Arsenal
          </motion.h3>
          <div className="flex flex-wrap gap-4">
            {skills.map((skill: string) => (
              <motion.span 
                key={skill} 
                variants={fadeInUp}
                whileHover={{ scale: 1.1, backgroundColor: "#1e293b", borderColor: "#06b6d4" }}
                className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 px-5 py-2 rounded-xl text-sm font-semibold text-gray-300 cursor-default transition-colors shadow-sm"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.section>

        {/* Experience Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h3 variants={fadeInUp} className="text-3xl font-bold mb-10 flex items-center gap-4">
            <span className="w-12 h-1 bg-linear-to-r from-cyan-500 to-blue-500 rounded-full"></span>
            Experience
          </motion.h3>
          <div className="space-y-8 relative border-l-2 border-gray-800 ml-3 pl-8">
            {experience.map((exp: Experience, index: number) => (
              <motion.div 
                key={index} 
                variants={fadeInUp}
                className="relative"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-10.25 top-1 w-5 h-5 bg-gray-950 border-4 border-cyan-500 rounded-full"></div>
                
                <div className="bg-gray-900/40 p-8 rounded-2xl border border-gray-800 hover:border-cyan-500/30 transition duration-300">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <h4 className="text-2xl font-bold text-white">{exp.role}</h4>
                    <span className="text-sm text-cyan-300 font-mono bg-cyan-900/20 px-3 py-1 rounded-lg mt-2 md:mt-0">
                      {exp.duration}
                    </span>
                  </div>
                  <p className="text-gray-300 font-medium mb-4">{exp.company}</p>
                  <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h3 variants={fadeInUp} className="text-3xl font-bold mb-10 flex items-center gap-4">
            <span className="w-12 h-1 bg-linear-to-r from-cyan-500 to-blue-500 rounded-full"></span>
            Featured Projects
          </motion.h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project: Project, index: number) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                whileHover={cardHover}
                className="group bg-linear-to-br from-gray-900 to-gray-950 p-8 rounded-3xl border border-gray-800 relative overflow-hidden"
              >
                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <h4 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h4>
                    <span className="text-xs font-mono text-gray-500 border border-gray-700 px-2 py-1 rounded">
                      {project.date}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-400 mb-6 leading-relaxed h-20 overflow-hidden">
                    {project.desc}
                  </p>
                  
                  <div className="pt-4 border-t border-gray-800">
                    <p className="text-xs text-cyan-300 font-mono">
                      {project.tech}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

      </main>

      {/* Footer */}
      <footer className="text-center py-12 border-t border-gray-900 bg-gray-950 text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} {profile.name}. Crafted with <span className="text-red-500">♥</span> using React & Framer Motion.</p>
      </footer>
    </div>
  );
}

export default App;