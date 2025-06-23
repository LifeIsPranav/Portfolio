import ImageSlider from "./how-it-works/ImageSlider";
import PointTitle, { PointTitleData } from "./how-it-works/PointTitle";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Code, Container, Database, LineChart, Server, Star, Target, Users } from "lucide-react";

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [activePointTitle, setActivePointTitle] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; name: string } | null>(null);

  const steps = [
    {
      id: 1,
      icon: <Target className="w-5 h-5" />,
      title: "IMS - Inventory Management System (Backend)",
      techStack : [
        // Core Backend Technologies
        { name: "Node.js", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", color: "#339933" },
        { name: "Express.js", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", color: "#000000" },

        // Database & ORM
        { name: "MongoDB", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", color: "#47A248" },
        { name: "Mongoose", image: "https://mongoosejs.com/docs/images/mongoose5_62x30_transparent.png", color: "#880000" },

        // Authentication & Security
        { name: "JWT", image: "https://cdn.auth0.com/blog/jwtalgos/logo.png", color: "#000000" },
        { name: "bcrypt.js", image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fw5178b5d8nmldu4pzli8.jpg", color: "#F7DF1E" },

        // Input Validation
        { name: "Zod", image: "https://logo.svgcdn.com/l/zod.png", color: "#0768f6" },

        // API Development & Testing
        { name: "Postman", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg", color: "#FF6C37" },

        // Middleware & Utilities
        { name: "CORS", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", color: "#F7DF1E" },

        // Version Control
        { name: "Git", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", color: "#F05032" },
      ],

      pointTitles: [
        {
          id: 1,
          title: "Inventory Storage & Retrieval",
          points: [
            "Dynamic ID-to-SKU Mapping",
            "Real-time Stock Level Tracking",
            "Low Stock Flags on Product Fetch"
          ],
          beforeImage: "/images/InventoryMS2-FE.png",
          afterImage: "/images/InventoryMS-BE.png"
        },
        {
          id: 2,
          title: "Authentication, Security & Access Control",
          points: [
            "JWT Authentication & Protected Routes",
            "Input Validation & Error Handling Middleware",
            "Role-Based Access (i.e., Admin vs. Staff)"
          ],
          beforeImage: "/images/Imslogin.png",
          afterImage: "/images/IMSproductBE.png"
        },
        {
          id: 3,
          title: "Robust Backend Architecture and Scalable API Design",
          points: [
            "Modular Controller-Service-Repo Pattern",
            "Centralized Error & Success Response Handling",
            "Clean, versioned endpoints for easy extension and testing"
          ],
          beforeImage: "/images/IMSpr.png",
          afterImage: "/images/folderIms.png"
        }
      ]
    }
  ];

  const currentStep = steps.find(step => step.id === activeStep);
  const currentPointTitle = currentStep?.pointTitles.find(pt => pt.id === activePointTitle);

  const nextStep = () => {
    const nextStepId = (activeStep % steps.length) + 1;
    setActiveStep(nextStepId);
    setActivePointTitle(1);
  };

  const prevStep = () => {
    const prevStepId = activeStep === 1 ? steps.length : activeStep - 1;
    setActiveStep(prevStepId);
    setActivePointTitle(1);
  };

  const nextPointTitle = () => {
    if (currentStep) {
      const nextId = (activePointTitle % currentStep.pointTitles.length) + 1;
      setActivePointTitle(nextId);
    }
  };

  const prevPointTitle = () => {
    if (currentStep) {
      const prevId = activePointTitle === 1 ? currentStep.pointTitles.length : activePointTitle - 1;
      setActivePointTitle(prevId);
    }
  };

  const handleStepChange = (stepId: number) => {
    setActiveStep(stepId);
    setActivePointTitle(1);
  };

  const handlePointTitleChange = (pointTitleId: number) => {
    setActivePointTitle(pointTitleId);
  };

  return (
    <section className="relative py-20 
    [background-image:radial-gradient(#e5e7eb_1.4px,transparent_1px),linear-gradient(to_right,#f8fafc,#f3e8ff66,#dbeafe66)]
[background-size:16px_16px,100%_100%]
transition-colors duration-300
dark:bg-gray-900
dark:[background-image:radial-gradient(rgba(100,116,139,0.25)_1px,transparent_1px)]
dark:[background-size:16px_16px]
    " id="MyProjects">
      <div className="container-section">
        <div className="max-w-4xl mx-auto text-center mb-16">
          {/* <motion.div> */}
          {/* <div className="section-tag">
            [✨]
          </div>
          </motion.div> */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="heading-lg text-convrt-dark-blue dark:text-white mb-6"
          >
            <div>
            Highlights from what I've  Built
            </div>
          </motion.h2>
          {/* <p className=" text-convrt-dark-blue/80 dark:text-gray-300 text-lg max-w-3xl mx-auto mb-8">
            Our AI-driven platform automates social engagement, transforming cold outreach into warm connections.
          </p> */}
        </div>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: false }}
            className="col-span-12 md:col-span-7 lg:col-span-6 rounded-xl overflow-hidden shadow-2xl shadow-purple-500/20 dark:shadow-purple-500/10 "
          >
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: false }}
          className="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700"
        >
          <div className="flex flex-col lg:flex-row shadow-2xl shadow-purple-500/20 dark:shadow-purple-500/10 ">
            {/* Left Side - Step Titles and Point Titles */}
            <div className="lg:w-1/3 p-8 pb-0 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-700/50 dark:to-gray-800 border-r border-gray-200 dark:border-gray-700">
              {/* Step Header */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  {/* <div className="w-12 h-12 rounded-2xl bg-convrt-purple flex items-center justify-center text-white font-bold text-lg">
                    {activeStep}
                  </div> */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-convrt-dark-blue dark:text-white leading-tight">
                      {currentStep?.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Point Titles */}
              <div className="space-y-4">
                {currentStep?.pointTitles.map((pointTitle, index) => (
                  <motion.button
                    key={pointTitle.id}
                    onClick={() => handlePointTitleChange(pointTitle.id)}
                    className={`text-left p-5 rounded-2xl transition-all duration-300 w-full border-2 ${
                      activePointTitle === pointTitle.id 
                        ? 'bg-convrt-purple text-white shadow-lg transform scale-[1.02] border-convrt-purple' 
                        : 'bg-white/60 dark:bg-gray-800/60 hover:bg-white/80 dark:hover:bg-gray-800/80 text-convrt-dark-blue dark:text-gray-300 border-gray-200/50 dark:border-gray-600/50 hover:border-convrt-purple/30'
                    }`}
                    whileHover={{ scale: activePointTitle === pointTitle.id ? 1.02 : 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-4">

                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center p-4 font-bold text-sm ${
                        activePointTitle === pointTitle.id 
                          ? 'bg-white/20 text-white' 
                          : 'bg-convrt-purple text-white'
                      }`}>
                        {index + 1}
                      </div>
                      
                      {/* <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        activePointTitle === pointTitle.id 
                          ? 'bg-white/20' 
                          : 'bg-convrt-purple/10'
                      }`}>
                        {activeStep === 1 && <Target className="w-4 h-4" />}
                        {activeStep === 2 && <Users className="w-4 h-4" />}
                        {activeStep === 3 && <LineChart className="w-4 h-4" />}
                      </div> */}

                      <div className="font-bold text-base text-md leading-tight">
                        {pointTitle.title}
                      </div>

                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Tech Stack Carousel - floating in free space */}
              {currentStep?.techStack && (
                <div
                  key={`tech-${activeStep}`}
                  className="mt-12 relative overflow-visible"
                  style={{ height: '40px' }}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => {
                    setIsPaused(false);
                    setTooltipPosition(null);
                  }}
                >
                  {/* Dynamic tooltip positioned above the hovered icon */}
                  {tooltipPosition && (
                    <div 
                      className="absolute -top-8 bg-gray-900 dark:bg-gray-800 text-white text-xs px-3 py-1 rounded-lg shadow-xl z-[100] pointer-events-none whitespace-nowrap border border-gray-700"
                      style={{ 
                        left: `${tooltipPosition.x}px`,
                        transform: 'translateX(-50%)'
                      }}
                    >
                      {tooltipPosition.name}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-800"></div>
                    </div>
                  )}

                  {/* Fade gradients on left and right */}
                  <div className="absolute left-0 top-0 w-8 h-full z-20 pointer-events-none"></div>
                  <div className="absolute right-0 top-0 w-8 h-full z-20 pointer-events-none"></div>
                  
                  <div className="relative h-full w-full flex items-center overflow-hidden">
                    <motion.div
                      className="flex gap-4"
                      animate={isPaused ? {} : { 
                        x: [0, -(currentStep.techStack.length * 64)]
                      }}
                      transition={{
                        duration: currentStep.techStack.length * 2.5,
                        repeat: Infinity,
                        ease: "linear",
                        repeatType: "loop"
                      }}
                      style={{ 
                        width: `${currentStep.techStack.length * 64 * 4}px`,
                        willChange: 'transform'
                      }}
                    >
                      {[...currentStep.techStack, ...currentStep.techStack, ...currentStep.techStack, ...currentStep.techStack].map((tech, techIndex) => (
                        <div
                          key={`${tech.name}-${techIndex}`}
                          className="flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-150 flex-shrink-0"
                          style={{ width: '60px', height: '40px' }}
                          onMouseEnter={(e) => {
                            setHoveredTech(`${tech.name}-${techIndex}`);
                            const rect = e.currentTarget.getBoundingClientRect();
                            const containerRect = e.currentTarget.closest('.relative')?.getBoundingClientRect();
                            if (containerRect) {
                              const relativeX = rect.left - containerRect.left + rect.width / 2;
                              setTooltipPosition({ x: relativeX, name: tech.name });
                            }
                          }}
                          onMouseLeave={() => {
                            setHoveredTech(null);
                            setTooltipPosition(null);
                          }}
                        >
                          <img 
                            src={tech.image}
                            alt={tech.name}
                            className="h-5 object-contain drop-shadow-sm" 
                          />
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Right Side - Image */}
            <div className="lg:w-2/3 relative bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-900 min-h-[500px]">
              <div className="absolute inset-0 p-8">
                <ImageSlider
                  beforeImage={currentPointTitle?.beforeImage || ''}
                  afterImage={currentPointTitle?.afterImage || ''}
                  altText={currentPointTitle?.title || ''}
                  className="h-full"
                />
              </div>
            </div>
          </div>
          
          {/* Bottom - Points and Navigation */}
          <div className="p-8 bg-gradient-to-r from-gray-50/50 to-white dark:from-gray-700/50 dark:to-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 ">
              {/* Points */}
              <div className="flex-1">
                <motion.div 
                  key={`${activeStep}-${activePointTitle}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  {currentPointTitle?.points.map((point, index) => (
                    <div className='hover:scale-105 transition-transform duration-200'>

                    <motion.div 
                      key={index}
                      viewport={{ once: false }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start gap-3 p-4 bg-convrt-purple rounded-xl border border-gray-200/50 dark:border-gray-600/50 shadow-sm "
                    >
                      <div className="w-2 h-2 bg-white rounded-full flex-shrink-0 mt-2 "></div>
                      <span className="text-sm text-white font-semibold leading-relaxed ">{point}</span>
                    </motion.div>
                    </div>
                  ))}
                </motion.div>
              </div>
              
              {/* Navigation */}
              <div className="flex items-center gap-6">
                {/* Point Title Navigation */}
                {/* <div className="flex items-center gap-3"> */}
                  {/* <button 
                    onClick={prevPointTitle}
                    className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-xl transition-all duration-300 text-gray-700 dark:text-gray-300"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="text-sm font-medium ml-1">Prev</span>
                  </button> */}
{/*                   
                  <div className="flex space-x-2">
                    {currentStep?.pointTitles.map((pointTitle) => (
                      <button
                        key={pointTitle.id}
                        onClick={() => setActivePointTitle(pointTitle.id)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          pointTitle.id === activePointTitle 
                            ? 'bg-convrt-purple shadow-lg transform scale-125' 
                            : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                        }`}
                      />
                    ))}
                  </div> */}
                  
                  {/* <button 
                    onClick={nextPointTitle}
                    className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-xl transition-all duration-300 text-gray-700 dark:text-gray-300"
                  >
                    <span className="text-sm font-medium mr-1">Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button> */}
                {/* </div> */}

                {/* Step Navigation */}
                <div className="flex items-center gap-3 border-l border-gray-300 dark:border-gray-600 pl-6">
                  <button 
                    onClick={prevStep}
                    className="flex items-center px-5 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 text-gray-700 dark:text-gray-300 shadow-xl hover:shadow-2xl border-2 border-convrt-purple dark:border-gray-700"
                  >
                    <ChevronLeft className="w-4 h-4 " />
                  </button>
                  
                  <div className="flex space-x-2">
                    {steps.map((step) => (
                      <button
                        key={step.id}
                        onClick={() => handleStepChange(step.id)}
                        className={`w-4 h-4 rounded-full transition-all duration-300 ${
                          step.id === activeStep 
                            ? 'bg-convrt-purple shadow-lg transform scale-125' 
                            : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <button 
                    onClick={nextStep}
                    className="flex items-center px-5 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 text-gray-700 dark:text-gray-300 shadow-xl hover:shadow-2xl border-2 border-convrt-purple dark:border-gray-700"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
