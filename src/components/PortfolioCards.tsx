import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Award, ChevronLeft, ChevronRight, Code, Database, ExternalLink, Github, User } from "lucide-react";

const PortfolioCards = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Transform values that respond to scroll in both directions
  const cardY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const cardScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.9]);
  
  const codeProfiles = [
    {
      title: "GitHub",
      username: "lifeispranav",
      description: "Browse my repositories, contributions, and open-source projects.",
      icon: <Github className="w-8 h-8 text-white" />,
      stats: [
        { label: "Repositories", value: "15+" },
        { label: "Commits", value: "200+" },
        { label: "Deployments", value: "4+" }
      ],
      color: "from-gray-700 to-gray-900",
      textColor: "text-white",
      link: "https://github.com/lifeispranav"
    },
    {
      title: "LeetCode",
      username: "lifeispranav",
      description: "Check out my problem-solving skills and algorithmic solutions.",
      icon: <Code className="w-8 h-8 text-white" />,
      stats: [
        { label: "Medium", value: "200+" },
        { label: "Problems", value: "350+" },
        { label: "Hard", value: "60+" }
      ],
      color: "from-orange-600 to-yellow-500",
      textColor: "text-white",
      link: "https://leetcode.com/lifeispranav"
    },
    // {
    //   title: "CodeForces",
    //   username: "pranav_competitive",
    //   description: "View my competitive programming journey and contest history.",
    //   icon: <Award className="w-8 h-8 text-white" />,
    //   stats: [
    //     { label: "Rating", value: "1750" },
    //     { label: "Contests", value: "40+" },
    //     { label: "Problems Solved", value: "250+" }
    //   ],
    //   color: "from-blue-600 to-blue-800",
    //   textColor: "text-white",
    //   link: "https://codeforces.com/profile/yourusername"
    // },
    // {
    //   title: "Hugging Face",
    //   username: "pranav_ai",
    //   description: "Explore my AI models, datasets, and contributions to the ML community.",
    //   icon: <Database className="w-8 h-8 text-white" />,
    //   stats: [
    //     { label: "Models", value: "5+" },
    //     { label: "Downloads", value: "10K+" },
    //     { label: "Community Rank", value: "Top 10%" }
    //   ],
    //   color: "from-purple-600 to-purple-900",
    //   textColor: "text-white",
    //   link: "https://huggingface.co/yourusername"
    // }
  ];
  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % codeProfiles.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + codeProfiles.length) % codeProfiles.length);
  };
  
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  return (
    <section ref={sectionRef} className="py-16 md:py-24 
    [background-image:radial-gradient(#e5e7eb_1.2px,transparent_1px),linear-gradient(to_right,#f8fafc,#f3e8ff66,#dbeafe66)]
[background-size:16px_16px,100%_100%]
transition-colors duration-300
dark:bg-gray-900
dark:[background-image:radial-gradient(rgba(100,116,139,0.25)_0.6px,transparent_1px)]
dark:[background-size:16px_16px] "
    id="portfolio">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="heading-lg font-bold mb-6 text-gray-900 dark:text-white transition-colors duration-300">
            My Profiles
          </h2>
          {/* <p className="text-convrt-dark-blue/80 dark:text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
            Browse through my profiles and achievements across different coding platforms
          </p> */}
        </div>

        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: false }}
            className="max-w-5xl w-full bg-white dark:bg-gradient-to-br from-gray-800 to-gray-900 border-2xl rounded-3xl p-6 group shadow-2xl shadow-purple-500/20 dark:shadow-purple-500/10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Profile Showcase Section */}
              <div className="relative">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 p-4 shadow-lg">
                  <div className="relative h-80 overflow-hidden rounded-xl">
                    {codeProfiles.map((profile, index) => (
                      <motion.div
                        key={index}
                        className={`absolute inset-0 w-full h-full ${index === currentSlide ? 'z-10' : 'z-0'}`}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{
                          opacity: index === currentSlide ? 1 : 0,
                          x: index === currentSlide ? 0 : index < currentSlide ? -100 : 100
                        }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        // whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div 
                          className={`h-full w-full rounded-xl p-6 px-12 flex flex-col justify-between bg-gradient-to-br ${profile.color} cursor-pointer transform transition-all duration-300 active:scale-95 focus-visible:ring-4 focus-visible:ring-white focus-visible:outline-none`}
                          onClick={() => window.open(profile.link, '_blank', 'noopener,noreferrer')}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              window.open(profile.link, '_blank', 'noopener,noreferrer');
                            }
                          }}
                          tabIndex={index === currentSlide ? 0 : -1}
                          role="button"
                          aria-label={`View ${profile.title} profile for ${profile.username}`}
                        >
                          {/* Profile Header */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 rounded-lg bg-white/20">
                                {profile.icon}
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-white">{profile.title}</h3>
                                <p className="text-white/70 text-sm">@{profile.username}</p>
                              </div>
                            </div>
                          </div>
                          
                          {/* Profile Description */}
                          <p className="text-white/90 mb-4 text-center">{profile.description}</p>
                          
                          {/* Profile Stats */}
                          <div className="grid grid-cols-3 gap-2">
                            {profile.stats.map((stat, i) => (
                              <div 
                                key={i} 
                                className="bg-white/10 p-3 rounded-lg text-center transition-all duration-200 hover:bg-white/20 hover:scale-105 transform active:scale-95"
                              >
                                <p className="text-white font-bold text-xl">{stat.value}</p>
                                <p className="text-white/70 text-xs">{stat.label}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {/* Navigation Arrows - Positioned inside but with proper spacing */}
                    <button 
                      onClick={prevSlide} 
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 z-20"
                      aria-label="Previous profile"
                    >
                      <ChevronLeft className="w-4 h-4 text-gray-700" />
                    </button>
                    
                    <button 
                      onClick={nextSlide} 
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 z-20"
                      aria-label="Next profile"
                    >
                      <ChevronRight className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>
                  
                  {/* Slide Indicators */}
                  <div className="flex justify-center mt-4 space-x-2">
                    {codeProfiles.map((_, index) => (
                      <button 
                        key={index} 
                        onClick={() => goToSlide(index)} 
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentSlide ? 'bg-gray-700 scale-110' : 'bg-gray-300 hover:bg-gray-500'}`}
                        aria-label={`Go to profile ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="space-y-0">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 mt-2 leading-tight dark:text-white">
                    My Coding Journey
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed mb-5 font-normal dark:text-gray-300">
                    Explore my presence across various coding platforms. From solving algorithmic challenges to building complex Backends, 
                    these profiles showcase my technical skills and passion for programming.
                  </p>
                </div>

                {/* Visit Current Profile Button */}
                <div className="relative inline-block mb-16">
                  <a 
                    href={codeProfiles[currentSlide].link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`relative px-8 py-4 rounded-full font-medium text-sm transition-all duration-300 flex items-center justify-center gap-4 overflow-hidden group 
                      ${currentSlide === 0 ? 'bg-gray-800 hover:bg-gray-700 text-white' : 
                        currentSlide === 1 ? 'bg-orange-600 hover:bg-orange-500 text-white' :
                        currentSlide === 2 ? 'bg-blue-700 hover:bg-blue-600 text-white' : 
                        'bg-purple-700 hover:bg-purple-600 text-white'} 
                      hover:scale-105 active:scale-95 shadow-lg`}
                  >
                    <span className="relative z-10 mr-1">Visit {codeProfiles[currentSlide].title} Profile</span>
                    <ExternalLink className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1 flex-shrink-0" />
                    <span className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm mb-2 dark:text-gray-300">Current Platform</h4>
                    <p className="text-gray-600 text-sm leading-relaxed dark:text-gray-300">
                      {codeProfiles[currentSlide].title}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm mb-2 dark:text-gray-300">Username</h4>
                    <p className="text-gray-600 text-sm leading-relaxed dark:text-gray-300">
                      @{codeProfiles[currentSlide].username}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default PortfolioCards;