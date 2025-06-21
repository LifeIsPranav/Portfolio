import AboutMeSection from "./AboutMeSection";
import AnimatedButton from "./ui/animated-button";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Award, Book, Briefcase, Code, Github, GraduationCap, Medal, School, Star, Target, Trophy, Users } from "lucide-react";

const ImagePortionSlider = () => {
  const [firstSliderPosition, setFirstSliderPosition] = useState(30);
  const [secondSliderPosition, setSecondSliderPosition] = useState(70);
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const [isDraggingFirst, setIsDraggingFirst] = useState(false);
  const [isDraggingSecond, setIsDraggingSecond] = useState(false);

  const handleMouseMove = (e: MouseEvent) => {
    if (!sliderContainerRef.current) return;
    
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const newPosition = ((e.clientX - rect.left) / rect.width) * 100;
    
    if (isDraggingFirst) {
      const maxPosition = secondSliderPosition - 15;
      setFirstSliderPosition(Math.max(5, Math.min(maxPosition, newPosition)));
    }
    
    if (isDraggingSecond) {
      const minPosition = firstSliderPosition + 15;
      setSecondSliderPosition(Math.max(minPosition, Math.min(95, newPosition)));
    }
  };

  const handleMouseUp = () => {
    setIsDraggingFirst(false);
    setIsDraggingSecond(false);
  };

  useEffect(() => {
    if (isDraggingFirst || isDraggingSecond) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none';
    } else {
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
    };
  }, [isDraggingFirst, isDraggingSecond, firstSliderPosition, secondSliderPosition]);

  const educationItems = [
    { 
      icon: GraduationCap, 
      title: "Bachelor's in Computer Science", 
      subtitle: "University of Technology",
      year: "2020-2024",
      link: "https://example.edu",
      color: "text-blue-600" 
    },
    { 
      icon: School, 
      title: "High School - Science Stream", 
      subtitle: "Excellence Academy",
      year: "2018-2020",
      link: "https://school.edu",
      color: "text-blue-600" 
    },
    { 
      icon: Book, 
      title: "Continuous Learning", 
      subtitle: "Online Courses & Certifications",
      year: "Ongoing",
      link: "https://coursera.org",
      color: "text-blue-600" 
    },
  ];

  const codingItems = [
    { 
      icon: Code, 
      title: "LeetCode: 500+ Problems", 
      subtitle: "Data Structures & Algorithms",
      link: "https://leetcode.com/lifeispranav",
      color: "text-purple-600" 
    },
    { 
      icon: Github, 
      title: "GitHub: 50+ Repositories", 
      subtitle: "Open Source Projects",
      link: "https://github.com/lifeispranav",
      color: "text-purple-600" 
    },
    { 
      icon: Star, 
      title: "Open Source Contributor", 
      subtitle: "Community Projects",
      link: "https://github.com/lifeispranav",
      color: "text-purple-600" 
    },
  ];

  const achievementItems = [
    { 
      icon: Trophy, 
      title: "Hackathon Winner 2024", 
      subtitle: "TechFest Innovation Challenge",
      link: "https://techfest2024.com",
      color: "text-yellow-600" 
    },
    { 
      icon: Award, 
      title: "Dean's List Scholar", 
      subtitle: "Academic Excellence Award",
      link: "#",
      color: "text-yellow-600" 
    },
    { 
      icon: Medal, 
      title: "Top 5% Developer", 
      subtitle: "HackerRank Global Ranking",
      link: "https://hackerrank.com/lifeispranav",
      color: "text-yellow-600" 
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300" id="profile">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-convrt-purple/10 dark:bg-convrt-purple/20 text-convrt-purple mb-8"
          >
            <Users className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium font-inter tracking-wide">My Journey</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-convrt-dark-blue dark:text-white mb-8"
          >
            About <span className="gradient-text">Me</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-convrt-dark-blue/70 dark:text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-12"
          >
            Drag the sliders to explore my educational background, coding experience, and professional achievements.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative select-none mb-16"
        >
          <div 
            ref={sliderContainerRef}
            className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 shadow-2xl bg-gradient-to-r from-blue-50 via-purple-50 to-yellow-50 dark:from-gray-800 dark:to-gray-800"
            style={{ userSelect: 'none' }}
          >
            {/* Education Section - LEFT ALIGNED */}
            <AboutMeSection
              title="EDUCATION"
              items={educationItems}
              alignment="left"
              bgGradient="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30"
              titleColor="text-blue-700 dark:text-blue-400"
              cardBg="bg-blue-50 dark:bg-blue-900/20"
              borderColor="border-blue-200 dark:border-blue-700"
              titleIcon={Target}
              clipPath={`inset(0 ${100 - firstSliderPosition}% 0 0)`}
            />

            {/* Coding Experience Section - CENTER ALIGNED */}
            <AboutMeSection
              title="EXPERIENCE"
              items={codingItems}
              alignment="center"
              bgGradient="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30"
              titleColor="text-purple-700 dark:text-purple-400"
              cardBg="bg-purple-50 dark:bg-purple-900/20"
              borderColor="border-purple-200 dark:border-purple-700"
              titleIcon={Code}
              clipPath={`inset(0 ${100 - secondSliderPosition}% 0 ${firstSliderPosition}%)`}
            />

            {/* Achievements Section - RIGHT ALIGNED */}
            <AboutMeSection
              title="ACHIEVEMENTS"
              items={achievementItems}
              alignment="right"
              bgGradient="bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30"
              titleColor="text-yellow-700 dark:text-yellow-400"
              cardBg="bg-yellow-50 dark:bg-yellow-900/20"
              borderColor="border-yellow-200 dark:border-yellow-700"
              titleIcon={Briefcase}
              clipPath={`inset(0 0 0 ${secondSliderPosition}%)`}
            />

            {/* First Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-convrt-purple cursor-col-resize z-10"
              style={{ left: `${firstSliderPosition}%`, userSelect: 'none' }}
              onMouseDown={(e) => {
                e.preventDefault();
                setIsDraggingFirst(true);
              }}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-7 h-7 md:w-8 md:h-8 bg-convrt-purple rounded-full shadow-lg flex items-center justify-center border-2 border-white">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>

            {/* Second Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-convrt-purple cursor-col-resize z-10"
              style={{ left: `${secondSliderPosition}%`, userSelect: 'none' }}
              onMouseDown={(e) => {
                e.preventDefault();
                setIsDraggingSecond(true);
              }}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-7 h-7 md:w-8 md:h-8 bg-convrt-purple rounded-full shadow-lg flex items-center justify-center border-2 border-white">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Labels */}
          <div className="flex justify-between mt-8 px-4" style={{ userSelect: 'none' }}>
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-base flex items-center">
              <GraduationCap className="w-5 h-5 mr-2" />
              Education
            </span>
            <span className="text-purple-600 dark:text-purple-400 font-semibold text-base flex items-center">
              <Code className="w-5 h-5 mr-2" />
              Experience
            </span>
            <span className="text-yellow-600 dark:text-yellow-400 font-semibold text-base flex items-center">
              <Trophy className="w-5 h-5 mr-2" />
              Achievements
            </span>
          </div>
        </motion.div>

        {/* Call to Action Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-3xl p-12 md:p-16 shadow-xl border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-convrt-dark-blue dark:text-white mb-6">
            Ready to Work Together?
          </h3>
          <p className="text-convrt-dark-blue/70 dark:text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Let's create something amazing together. Get in touch and let's discuss your next project.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <AnimatedButton href="#contact" variant="primary">
              Get In Touch
            </AnimatedButton>
            <AnimatedButton href="#portfolio" variant="secondary">
              View My Work
            </AnimatedButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImagePortionSlider;
