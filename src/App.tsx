// src/App.tsx
import React, { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { profile, skills, experience, projects } from './portfolioData';
import CustomCursor from './components/CustomCursor';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Animation Variants with strict typing fixes
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: "easeOut" as const // FIXED: Added 'as const' to satisfy TypeScript
      } 
    }
  };

  const stagger: Variants = {
    visible: { 
      transition: { 
        staggerChildren: 0.1 
      } 
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-neutral-100 flex items-center justify-center z-50">
        <div className="text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-8xl md:text-9xl font-bold mb-8 tracking-tighter"
          >
            VR
          </motion.div>
          <div className="flex gap-3 justify-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-black rounded-full"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 text-neutral-900 min-h-screen selection:bg-black selection:text-white cursor-none">
      <CustomCursor />

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 w-full bg-neutral-50/80 backdrop-blur-md z-50 border-b border-neutral-200"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tighter">VR.</div>
          <div className="flex gap-8 text-sm font-medium tracking-wide">
            {['About', 'Experience', 'Works', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:opacity-50 transition-opacity">
                {item}
              </a>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Side Elements */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="fixed left-8 md:left-12 bottom-0 z-40 hidden lg:flex flex-col gap-6 items-center"
      >
        <div className="flex flex-col gap-6 mb-6">
          {profile.social.map((link) => (
            <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="hover:-translate-y-1 transition-transform duration-300">
              <link.icon size={20} />
            </a>
          ))}
        </div>
        <div className="w-px h-24 bg-neutral-300"></div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="fixed right-8 md:right-12 bottom-0 z-40 hidden lg:flex flex-col gap-6 items-center"
      >
        <div className="text-xs font-mono tracking-widest vertical-text" style={{ writingMode: 'vertical-rl' }}>
          {profile.email}
        </div>
        <div className="w-px h-24 bg-neutral-300 mt-6"></div>
      </motion.div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-6">
        {/* Animated Blob */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-60">
           <div className="animate-blob-float">
            {/* FIXED: Updated width classes for Tailwind v4 (w-150 = 600px, w-200 = 800px) */}
            <svg viewBox="0 0 500 500" className="w-150 h-150 md:w-200 md:h-200">
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#ff9a9e', stopOpacity: 0.4 }} />
                  <stop offset="50%" style={{ stopColor: '#fad0c4', stopOpacity: 0.4 }} />
                  <stop offset="100%" style={{ stopColor: '#a1c4fd', stopOpacity: 0.4 }} />
                </linearGradient>
                <filter id="goo">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                  <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
                </filter>
              </defs>
              <path 
                d="M 250 100 Q 350 150 350 250 Q 350 350 250 400 Q 150 350 150 250 Q 150 150 250 100" 
                fill="url(#gradient1)" 
                filter="url(#goo)"
                className="animate-blob-morph"
              />
            </svg>
          </div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.p 
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-lg md:text-xl mb-4 text-neutral-600 font-mono"
          >
            Hi, my name is
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tight text-neutral-900"
          >
            {profile.name}
          </motion.h1>

          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-3xl md:text-5xl font-light text-neutral-500 mb-12"
          >
            I build things for the web.
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
          >
            <ChevronDown size={24} className="text-neutral-400" />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-4xl font-bold mb-16 flex items-center gap-4"
          >
            <span className="text-neutral-300">01.</span> About Me
          </motion.h2>
          
          <div className="grid md:grid-cols-5 gap-12">
            <div className="md:col-span-3 text-lg text-neutral-600 leading-relaxed space-y-6">
              <p>{profile.about}</p>
              <p>
                Currently, I'm focused on <span className="text-black font-semibold">Evolutionary Algorithms</span> and scalable full-stack applications.
              </p>
            </div>
            <div className="md:col-span-2">
              <div className="relative group">
                <div className="absolute inset-0 bg-neutral-200 translate-x-3 translate-y-3 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
                <div className="relative border border-neutral-900 bg-white p-6 aspect-square flex items-center justify-center">
                  <span className="font-mono text-sm text-neutral-400">Picture Placeholder</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 px-6 bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-4xl font-bold mb-16 flex items-center gap-4"
          >
            <span className="text-neutral-300">02.</span> Experience
          </motion.h2>

          <div className="space-y-12 border-l border-neutral-300 ml-3 md:ml-0 pl-8 md:pl-12">
            {experience.map((exp, idx) => (
              <motion.div 
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="relative"
              >
                {/* FIXED: Updated offset classes */}
                <div className="absolute -left-10.5 md:-left-14.5 top-2 w-4 h-4 rounded-full bg-neutral-900 border-4 border-neutral-50"></div>
                <h3 className="text-xl font-bold">{exp.role}</h3>
                <p className="text-neutral-500 font-mono text-sm mb-4">{exp.company} | {exp.duration}</p>
                <p className="text-neutral-600 max-w-2xl">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="works" className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-4xl font-bold mb-16 flex items-center gap-4"
          >
            <span className="text-neutral-300">03.</span> Work
          </motion.h2>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="group bg-neutral-50 border border-neutral-200 p-8 hover:border-black transition-colors duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <ExternalLink size={24} className="text-neutral-400 group-hover:text-black transition-colors" />
                    <span className="font-mono text-xs text-neutral-400">{project.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:underline decoration-1 underline-offset-4">{project.title}</h3>
                  <p className="text-neutral-600 mb-6 text-sm leading-relaxed">{project.desc}</p>
                </div>
                <div className="text-xs font-mono text-neutral-400">
                  {project.tech}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-6 bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-4xl font-bold mb-16 flex items-center gap-4"
          >
            <span className="text-neutral-300">04.</span> Skills
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex flex-wrap">
              {skills.map((skill) => (
                 <span key={skill} className="bg-white border border-neutral-200 px-4 py-2 text-sm text-neutral-600 mr-2 mb-2 inline-block">
                   {skill}
                 </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 bg-white text-center">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="text-neutral-500 font-mono mb-4">05. What's Next?</p>
            <h2 className="text-5xl font-bold mb-6">Get In Touch</h2>
            <p className="text-neutral-600 text-lg mb-12 leading-relaxed">
              I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            <a 
              href={`mailto:${profile.email}`}
              className="inline-block border border-black px-8 py-4 text-sm font-bold tracking-widest hover:bg-black hover:text-white transition-colors duration-300"
            >
              SAY HELLO
            </a>
          </motion.div>
        </div>
      </section>

      <footer className="py-8 text-center text-neutral-400 text-xs font-mono bg-neutral-50">
        <p>Designed & Built by {profile.name}</p>
      </footer>
    </div>
  );
}

export default App;