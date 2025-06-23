import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, Award, BarChart3, Briefcase, Calendar, Check, Code, GraduationCap, MapPin, Maximize2, Minimize2, Rocket, TrendingUp, Users, X } from "lucide-react";
import { floatingVariants } from "../utils/animations";

const ProductShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeTab, setActiveTab] = useState('education');

  const tabs = [
    { key: 'education', label: 'Education', url: 'my/education' },
    { key: 'experience', label: 'Experience', url: 'my/experience' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const getCurrentUrl = () => {
    const currentTab = tabs.find(tab => tab.key === activeTab);
    return currentTab ? currentTab.url : 'my/about';
  };

  const getLeftSideContent = () => {
    if (activeTab === 'experience') {
      return {
        title: "My Experience",
        description: "I've built real-world solutions, explored diverse technologies, and strengthened my development skills. End-to-End experience through personal and collaborative projects",
        features: [
          "Full-stack development expertise",
          "Team leadership and mentoring",
          "Product development lifecycle",
          "Cross-functional collaboration"
        ]
      };
    }
    
    // Default education content
    return {
      title: "Educational Journey",
      description: "I’ve built my foundation through both formal education and relentless self-learning. From mastering CS fundamentals to exploring advanced dev practices, my journey reflects a strong commitment to growth, curiosity, and learning",
      features: [
        "Computer Science fundamentals",
        "Scalable project experience",
        "Software engineering principles",
        "Continuous learning mindset"
      ]
    };
  };

  const renderTabContent = () => {
    if (activeTab === 'experience') {
      return (
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-[20px] border border-white/60 dark:border-gray-600/60 shadow-lg p-6 transition-colors duration-300">
          <div className="flex items-center mb-4">
            <div className="h-8 w-8 rounded-full bg-[#6936F5] flex items-center justify-center text-white mr-3">
              <Briefcase className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-semibold text-convrt-dark-blue dark:text-white">Recent Project Highlight</h3>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-[#F9F6F3] dark:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-600">
              <div className="flex items-center justify-between">
                <div className="text-lg font-bold text-convrt-purple dark:text-white">Inventory Management System</div>
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded text-xs font-medium">June 2025</span>
              </div>
              {/* <p className="text-gray-700 dark:text-gray-300 text-sm">
                TechCorp Solutions • 2023-Present
              </p> */}
              {/* <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                Leading full-stack development for enterprise applications
              </p> */}
            </div>
            
            <div>
              {/* <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">Career Timeline:</h4> */}
              <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">Notable Implementations:</h4>
              <ul className="space-y-1">
                <li className="px-1 py-1 font-semibold flex items-start justify-between">
                  <span className="flex">
                  <Rocket className="w-4 h-4 text-[#6936F5] mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Robust Backend APIs with Express</span>
                </span>
                  {/* <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded text-xs font-bold">2022-2023</span> */}
                </li>
                <li className="px-1 py-1 font-semibold flex items-start justify-between">
                  <span className="flex">
                  <Rocket className="w-4 h-4 text-[#6936F5] mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Designed modules for real-time inventory and SKU tracking</span>
                </span>
                  {/* <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded text-xs font-bold">2022-2023</span> */}
                </li>
                <li className="px-1 py-1 font-semibold flex items-start justify-between">
                  <span className="flex">
                  <Rocket className="w-4 h-4 text-[#6936F5] mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Implement user Authorization and Authentication</span>
                </span>
                  {/* <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded text-xs font-bold">2022-2023</span> */}
                </li>
                <li className="px-1 py-1 font-semibold flex items-start justify-between">
                  <span className="flex">
                  <Rocket className="w-4 h-4 text-[#6936F5] mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">DTO layer to ensure crisp communication with Frontend</span>
                </span>
                  {/* <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded text-xs font-bold">2022-2023</span> */}
                </li>
                {/* <li className="flex items-start justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Software Engineering Intern</span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs font-bold">2021-2022</span>
                </li>
                <li className="flex items-start justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Key Achievement: 50k+ users impacted</span>
                  <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded text-xs font-bold">Impact</span>
                </li>
                <li className="flex items-start justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Performance optimization: 40% improvement</span>
                  <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded text-xs font-bold">Result</span>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      );
    }

    // Default education content
    return (
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-[20px] border border-white/60 dark:border-gray-600/60 shadow-lg p-6 transition-colors duration-300">
        <div className="flex items-center mb-4">
          <div className="h-8 w-8 rounded-full bg-[#6936F5] flex items-center justify-center text-white mr-3">
            <GraduationCap className="w-4 h-4" />
          </div>
          <h3 className="text-lg font-semibold text-convrt-dark-blue dark:text-white">Latest Academic Background</h3>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-[#F9F6F3] dark:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-600">
            <div className="flex items-center justify-between mb-2">
              <div className="text-lg font-bold text-convrt-purple dark:text-white">Undergrad in Computer Science</div>
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded text-xs font-bold">8.05 CGPA</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              National Institute of Technology Patna &nbsp; • &nbsp;	 2023-pursuing
            </p>
            {/* <p className="text-gray-600 dark:text-gray-400 text-xs mt-2">
              Specialization in Software Engineering and Data Structures
            </p> */}
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">Key Coursework:</h4>
            <ul className="space-y-1" >
              <li className="flex items-start justify-between">
                <span className="px-2 py-1 text-green-700 dark:text-green-300 rounded text-xs font-semibold">Artificial Intelligence (AI)</span>
                <span className="text-sm text-gray-700 dark:text-gray-300">2025</span>
              </li>
              <li className="flex items-start justify-between">
                <span className="px-2 py-1 text-blue-700 dark:text-blue-300 rounded text-xs font-semibold">Machine Learning</span>
                <span className="text-sm text-gray-700 dark:text-gray-300">2025</span>
              </li>
              <li className="flex items-start justify-between">
                <span className="px-2 py-1 text-purple-700 dark:text-purple-300 rounded text-xs font-semibold">Computer Networks and Operating System</span>
                <span className="text-sm text-gray-700 dark:text-gray-300">2025</span>
              </li>
              <li className="flex items-start justify-between">
                <span className="px-2 py-1 text-green-700 dark:text-green-300 rounded text-xs font-semibold">Data Structures And Algorithms</span>
                <span className="text-sm text-gray-700 dark:text-gray-300">2024</span>
              </li>
              <li className="flex items-start justify-between">
                <span className="px-2 py-1 text-purple-700 dark:text-purple-300 rounded text-xs font-semibold">Database Management Systems (DBMS)</span>
                <span className="text-sm text-gray-700 dark:text-gray-300">2024</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.section 
          initial={{ opacity: 1, scale: 1 }}
          exit={{ 
            opacity: 0,
            scale: 0.95,
            transition: { 
              duration: 0.3,
              ease: "easeInOut"
            }
          }}
          className="relative py-16 overflow-hidden 
          [background-image:radial-gradient(#e5e7eb_1.1px,transparent_1px),linear-gradient(to_right,#f8fafc,#f3e8ff66,#dbeafe66)]
[background-size:16px_16px,100%_100%]
transition-colors duration-300
dark:bg-gray-900
dark:[background-image:radial-gradient(rgba(100,116,139,0.25)_1px,transparent_1px)]
dark:[background-size:16px_16px]
          " 
          id="product"
          layout
        >
          <div className="container-section max-w-6xl mx-auto">
            <motion.div 
              ref={sectionRef}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: false, margin: "-100px" }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <motion.h2 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.7, 
                  delay: 0.4,
                  ease: [0.22, 1, 0.36, 1]
                }}
                viewport={{ once: false, margin: "-100px" }}
                className="heading-lg font-bold mb-6 text-gray-900 dark:text-white transition-colors duration-300"
              >
                Pixels of my Path
              </motion.h2>
              
            </motion.div>
            
            {/* Clean Product UI Showcase */}
            <motion.div 
              ref={contentRef}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.7, 
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1]
              }}
              viewport={{ once: false, margin: "-100px" }}
              className="relative"
            >
              <motion.div 
                variants={{...itemVariants, ...floatingVariants}}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1]
                }}
                viewport={{ once: false, margin: "-100px" }}
                className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-[20px] overflow-hidden border border-white/50 dark:border-gray-700/50 shadow-2xl shadow-purple-500/20 dark:shadow-purple-500/10 transition-colors duration-300"
              >
                <div className="px-8 py-6 border-b border-gray-200/70 dark:border-gray-700/70 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-colors duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={handleClose}
                        className="w-4 h-4 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer flex items-center justify-center group"
                        title="Close"
                      >
                        <X className="w-3 h-3 text-white opacity-100 transition-opacity" />
                      </button>
                      <button 
                        onClick={() => {
                          setIsMinimized(!isMinimized);
                        }}
                        className="w-4 h-4 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer flex items-center justify-center group"
                        title="Minimize"
                      >
                        <span className="w-2 h-0.5 bg-white opacity-100 transition-opacity"></span>
                      </button>
                      <button 
                        onClick={() => {
                          // Only works when minimized - acts as restore button
                          if (isMinimized) {
                            setIsMinimized(false);
                          }
                        }}
                        className={`w-4 h-4 rounded-full transition-colors flex items-center justify-center ${
                          isMinimized 
                            ? 'bg-green-500 hover:bg-green-600 cursor-pointer' 
                            : 'bg-green-500 cursor-not-allowed opacity-50'
                        }`}
                        title={isMinimized ? "Restore" : "Disabled"}
                        disabled={!isMinimized}
                      >
                        <Maximize2 className="w-3 h-3 text-white" />
                      </button>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">{getCurrentUrl()}</div>
                  </div>
                  
                  {!isMinimized && (
                    <>
                      {/* Updated Tabs with rounded design */}
                      <div className="flex space-x-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-xl">
                        {tabs.map((tab) => (
                          <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`px-6 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer whitespace-nowrap ${
                              activeTab === tab.key 
                                ? 'text-convrt-purple bg-white dark:bg-gray-800 shadow-sm' 
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                
                {!isMinimized && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-gradient-to-br from-gray-50/50 to-purple-50/50 dark:from-gray-800/50 dark:to-gray-700/50 transition-colors duration-300">
                    <div className="flex flex-col justify-center">
                      {(() => {
                        const content = getLeftSideContent();
                        return (
                          <>
                            <h3 className="text-2xl font-semibold text-convrt-dark-blue dark:text-white mb-4 transition-colors duration-300">
                              {content.title}
                            </h3>
                            <p className="text-gray-600 text-justify dark:text-gray-300 mb-6 leading-relaxed transition-colors duration-300">
                              {content.description}
                            </p>
                            <ul className="space-y-3">
                              {content.features.map((feature, i) => (
                                <li key={i} className="flex items-start">
                                  <Check className="w-5 h-5 text-[#6936F5] mr-2 flex-shrink-0 mt-0.5" />
                                  <span className="text-gray-700 dark:text-gray-300 transition-colors duration-300">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </>
                        );
                      })()}
                    </div>
                    {renderTabContent()}
                  </div>
                )}
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default ProductShowcase;
