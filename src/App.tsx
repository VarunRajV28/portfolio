// src/App.tsx
import React, { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { ChevronDown, ExternalLink } from 'lucide-react';
import Lenis from 'lenis'; // Import the smooth scroll library
import { profile, skills, experience, projects } from './portfolioData';
import CustomCursor from './components/CustomCursor';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [nameIndex, setNameIndex] = useState(0);

  // Names in 5 Indian languages
  const names = [
    "Varun Raj V",        // English
    "वरुण राज वी",        // Hindi
    "வருண் ராஜ் வி",      // Tamil
    "বরুণ রাজ ভি",        // Bengali
    "వరుణ్ రాజ్ వి"      // Telugu
  ];

  // Rotate through languages every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setNameIndex((prev) => (prev + 1) % names.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // --- 1. INITIALIZE LENIS (The God-Level Scroll) ---
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // Higher = smoother/slower feeling
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Luxurious exponential easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Determine specific types for time in the callback
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // --- ANIMATION VARIANTS ---
  const revealVar: Variants = {
    hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  const staggerContainer: Variants = {
    visible: { 
      transition: { staggerChildren: 0.15 } 
    }
  };

  const floating: Variants = {
    initial: { y: 0 },
    animate: (i: number) => ({
      y: [0, -10, 0],
      transition: {
        duration: 3 + (i % 3),
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.2
      }
    })
  };

  const pulse: Variants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [1, 0.8, 1],
      transition: { duration: 2, repeat: Infinity }
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-neutral-50 flex items-center justify-center z-50">
        <div className="text-center relative">
          <motion.div 
            key={nameIndex}
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter"
          >
            {names[nameIndex]}
          </motion.div>
          <motion.div 
            className="w-full h-1 bg-black rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2, ease: "circOut" }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 text-neutral-900 min-h-screen selection:bg-black selection:text-white cursor-none overflow-x-hidden">
      <CustomCursor />

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "backOut" }}
        className="fixed top-0 w-full bg-neutral-50/80 backdrop-blur-md z-50 border-b border-neutral-200/50"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex justify-between items-center">
          <motion.div 
            key={nameIndex}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl md:text-2xl font-bold tracking-tighter"
          >
            {names[nameIndex]}
          </motion.div>
          <div className="flex gap-8 text-sm font-medium tracking-wide">
            {['About', 'Experience', 'Works', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="relative group cursor-none"
                // OnClick override to use Lenis smooth scroll for anchor links
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(`#${item.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Sidebars */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="fixed left-8 md:left-12 bottom-0 z-40 hidden lg:flex flex-col gap-6 items-center"
      >
        <div className="flex flex-col gap-6 mb-6">
          {profile.social.map((link) => (
            <motion.a 
              key={link.name} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -5, scale: 1.2 }}
              className="text-neutral-500 hover:text-black transition-colors"
            >
              <link.icon size={20} />
            </motion.a>
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
        <a href={`mailto:${profile.email}`} className="text-xs font-mono tracking-widest vertical-text hover:text-black hover:-translate-y-2 transition-all text-neutral-500" style={{ writingMode: 'vertical-rl' }}>
          {profile.email}
        </a>
        <div className="w-px h-24 bg-neutral-300 mt-6"></div>
      </motion.div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-6">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
           <motion.div 
             animate={{ 
               rotate: [0, 360], 
               scale: [1, 1.1, 0.9, 1] 
             }}
             transition={{ 
               duration: 20, 
               repeat: Infinity, 
               ease: "linear" 
             }}
           >
            <svg viewBox="0 0 500 500" className="w-150 h-150 md:w-200 md:h-200">
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#e0c3fc', stopOpacity: 0.5 }} />
                  <stop offset="50%" style={{ stopColor: '#8ec5fc', stopOpacity: 0.5 }} />
                  <stop offset="100%" style={{ stopColor: '#e0c3fc', stopOpacity: 0.5 }} />
                </linearGradient>
                <filter id="goo">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
                  <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                </filter>
              </defs>
              <path 
                d="M 250 100 Q 350 150 350 250 Q 350 350 250 400 Q 150 350 150 250 Q 150 150 250 100" 
                fill="url(#gradient1)" 
                filter="url(#goo)"
                className="animate-blob-morph"
              />
            </svg>
          </motion.div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.p 
            variants={revealVar}
            initial="hidden"
            animate="visible"
            className="text-lg md:text-xl mb-4 text-neutral-600 font-mono"
          >
            Hi, my name is
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tight text-neutral-900"
          >
            {profile.name}
          </motion.h1>

          <motion.h2 
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
            className="text-2xl md:text-4xl font-light text-neutral-500 mb-12"
          >
            I transform ideas into elegant web solutions.
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
               <ChevronDown size={24} className="text-neutral-400" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-white relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-100px" }}
             variants={revealVar}
          >
            <h2 className="text-4xl font-bold mb-16 flex items-center gap-4">
              <span className="text-neutral-300">01.</span> About Me
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-5 gap-12">
            <motion.div 
              className="md:col-span-3 text-lg text-neutral-600 leading-relaxed space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.p variants={revealVar}>{profile.about}</motion.p>
              <motion.p variants={revealVar}>
                Currently, I'm focused on <span className="text-black font-semibold">Evolutionary Algorithms</span> and scalable full-stack applications.
              </motion.p>
            </motion.div>

            <motion.div 
              className="md:col-span-2"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-neutral-200 translate-x-3 translate-y-3 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>
                <motion.div 
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative border border-neutral-900 bg-white p-6 aspect-square flex items-center justify-center overflow-hidden"
                >
                   <span className="font-mono text-sm text-neutral-400">Picture</span>
                </motion.div>
              </div>
            </motion.div>
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
            variants={revealVar}
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
                viewport={{ once: true, margin: "-50px" }}
                variants={revealVar}
                className="relative"
              >
                <motion.div 
                  variants={pulse}
                  animate="animate"
                  className="absolute -left-10.5 md:-left-14.5 top-2 w-4 h-4 rounded-full bg-neutral-900 border-4 border-neutral-50"
                ></motion.div>

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
            variants={revealVar}
            className="text-4xl font-bold mb-16 flex items-center gap-4"
          >
            <span className="text-neutral-300">03.</span> Work
          </motion.h2>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                variants={revealVar}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="group bg-neutral-50 border border-neutral-200 p-8 hover:border-black transition-colors duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-neutral-200/50"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <ExternalLink size={24} className="text-neutral-400 group-hover:text-black transition-colors" />
                    <span className="font-mono text-xs text-neutral-400">{project.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:underline decoration-1 underline-offset-4">{project.title}</h3>
                  <p className="text-neutral-600 mb-6 text-sm leading-relaxed">{project.desc}</p>
                </div>
                <div className="text-xs font-mono text-neutral-400 group-hover:text-neutral-900 transition-colors">
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
            variants={revealVar}
            className="text-4xl font-bold mb-16 flex items-center gap-4"
          >
            <span className="text-neutral-300">04.</span> Skills
          </motion.h2>

          <motion.div 
            className="flex flex-wrap gap-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {skills.map((skill, i) => (
               <motion.div
                 key={skill}
                 custom={i}
                 variants={floating}
                 initial="initial"
                 animate="animate"
               >
                 <motion.span 
                   variants={revealVar}
                   className="bg-white border border-neutral-200 px-5 py-3 text-sm text-neutral-600 inline-block hover:border-black hover:text-black transition-colors cursor-default"
                 >
                   {skill}
                 </motion.span>
               </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 bg-white text-center">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVar}
          >
            <p className="text-neutral-500 font-mono mb-4">05. What's Next?</p>
            <h2 className="text-5xl font-bold mb-6">Get In Touch</h2>
            <p className="text-neutral-600 text-lg mb-8 leading-relaxed">
              I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            <div className="mb-12 text-neutral-700">
              <p className="text-sm font-mono">Email: <a href={`mailto:${profile.email}`} className="hover:text-black transition-colors">{profile.email}</a></p>
            </div>
            <motion.a 
              href={`mailto:${profile.email}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block border border-black px-8 py-4 text-sm font-bold tracking-widest bg-transparent hover:bg-black hover:text-white transition-colors duration-300"
            >
              SAY HELLO
            </motion.a>
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