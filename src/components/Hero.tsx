import React, { useRef, useState } from 'react';
import AnimatedBackground from './AnimatedBackground';
import { ArrowRight, File, Link, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PlatformDemo from './hero/PlatformDemo';
import RotatingText from './hero/RotatingText';
import { containerVariants, itemVariants } from '../utils/animations';

const Hero = () => {
  const demoRef = useRef<HTMLDivElement>(null);
  const [showDemo, setShowDemo] = useState(true);

  const jobTitles = [
    'Software Engineer',
    'Backend Developer', 
    'Tech Enthusiast',
    'Full-Stack Developer',
    'Problem Solver'
  ];

  return (
    <section className="relative min-h-0 pt-20 pb-10 overflow-hidden 
    [background-image:radial-gradient(#e5e7eb_1.6px,transparent_1px),linear-gradient(to_right,#f8fafc,#f3e8ff66,#dbeafe66)]
[background-size:16px_16px,100%_100%]
transition-colors duration-300
dark:bg-gray-900
dark:[background-image:radial-gradient(rgba(100,116,139,0.25)_1.1px,transparent_1px)]
dark:[background-size:16px_16px]
">
      <AnimatedBackground />
      
      <div className="container-section relative z-10">
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-6xl mx-auto text-center">
          <motion.div variants={itemVariants} className="inline-flex items-center px-4 py-2 rounded-full bg-convrt-purple/10 dark:bg-convrt-purple/20 text-convrt-purple mb-6 dark:text-[#FEBE10]">
            <motion.span
              animate={{ scale: [1, 1.2, 1], rotate: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="inline-flex"
            >
              <Zap className="w-4 h-4 mr-2" />
            </motion.span>
            <span className="text-sm font-medium font-inter tracking-wide">Where my code comes to life</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="font-inter font-bold text-4xl md:text-5xl lg:text-7xl tracking-tight max-w-4xl mx-auto mb-6 text-convrt-dark-blue dark:text-white leading-[1.1]">
            From <span className="text-[#EA384C] font-extrabold">@lifeispranav</span> to <span className="text-[#6936F5] font-extrabold">.me</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="font-inter text-xl text-convrt-dark-blue/80 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            <span className="inline-block min-w-[200px] text-right">
              <RotatingText texts={jobTitles} interval={2500} className="text-convrt-purple dark:text-[#FECA10] font-semibold" />
            </span>
            <span className="whitespace-nowrap"> | Async mind. Strategic build.</span>
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
            <a target='_blank' href="https://drive.google.com/file/d/1rqp8_bOEj-SAyQBvpoDhCB9QT3QTf3oo/view?usp=drive_link" className="button-primary flex items-center group font-inter font-medium">
              Checkout My Resume
              <File className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#MyProjects" className="button-outline font-inter">
              See My Works
            </a>
          </motion.div>
          
          {/* <AnimatePresence mode="wait">
            {showDemo && (
              <motion.div 
                ref={demoRef} 
                variants={itemVariants} 
                initial={{ opacity: 1, scale: 1, height: "auto" }} 
                exit={{ opacity: 0, scale: 0.95, height: 0, marginTop: 0, transition: { duration: 0.4, ease: "easeInOut" } }} 
                className="mt-12" 
                layout
              >
                <PlatformDemo onClose={() => setShowDemo(false)} onCloseBadge={() => {}} showBadge={true} />
              </motion.div>
            )}
          </AnimatePresence> */}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
