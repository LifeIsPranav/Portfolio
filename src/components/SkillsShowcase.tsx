
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code, Database, Cloud, Globe, Shield, Zap, Users, BarChart3, 
  Smartphone, Palette, Settings, Monitor, Server, Cpu, HardDrive, 
  Terminal, FileCode, Layers, GitBranch, Package, Key, Activity,
  Wrench, Grid3X3, Boxes, Workflow, GitMerge, Lock, Eye
} from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface Technology {
  id: string;
  name: string;
  icon: React.ElementType;
  category: string;
  subcategory?: string;
  color: string;
  bgColor: string;
}

interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  description: string;
  subcategories?: string[];
}

const SkillsShowcase = () => {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState("web-development");
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);

  const categories: Category[] = [
    {
      id: "web-development",
      name: "Web Development",
      icon: Monitor,
      color: "#4F46E5",
      description: "Modern web technologies and frameworks",
      subcategories: ["Frontend", "Backend"]
    },
    {
      id: "database",
      name: "Database",
      icon: Database,
      color: "#7C3AED",
      description: "Database systems and data management"
    },
    {
      id: "languages",
      name: "Languages",
      icon: Code,
      color: "#2563EB",
      description: "Programming languages and syntax"
    },
    {
      id: "tools",
      name: "Tools",
      icon: Settings,
      color: "#059669",
      description: "Development tools and utilities"
    }
  ];

  const technologies: Technology[] = [
    // Web Development - Frontend
    { 
      id: "react", 
      name: "React", 
      icon: Code, 
      category: "web-development", 
      subcategory: "Frontend",
      color: "#61DAFB", 
      bgColor: "#E3F2FD" 
    },
    { 
      id: "typescript", 
      name: "TypeScript", 
      icon: FileCode, 
      category: "web-development", 
      subcategory: "Frontend",
      color: "#3178C6", 
      bgColor: "#E8F4FD" 
    },
    { 
      id: "javascript", 
      name: "JavaScript", 
      icon: Code, 
      category: "web-development", 
      subcategory: "Frontend",
      color: "#F7DF1E", 
      bgColor: "#FFFBEB" 
    },
    { 
      id: "html5", 
      name: "HTML5", 
      icon: Globe, 
      category: "web-development", 
      subcategory: "Frontend",
      color: "#E34F26", 
      bgColor: "#FEF2F2" 
    },
    { 
      id: "css3", 
      name: "CSS3", 
      icon: Palette, 
      category: "web-development", 
      subcategory: "Frontend",
      color: "#1572B6", 
      bgColor: "#EFF6FF" 
    },
    { 
      id: "tailwind", 
      name: "Tailwind CSS", 
      icon: Layers, 
      category: "web-development", 
      subcategory: "Frontend",
      color: "#06B6D4", 
      bgColor: "#ECFDF5" 
    },
    { 
      id: "nextjs", 
      name: "Next.js", 
      icon: Globe, 
      category: "web-development", 
      subcategory: "Frontend",
      color: "#000000", 
      bgColor: "#F9FAFB" 
    },
    { 
      id: "redux", 
      name: "Redux", 
      icon: Package, 
      category: "web-development", 
      subcategory: "Frontend",
      color: "#764ABC", 
      bgColor: "#FAF5FF" 
    },
    { 
      id: "vite", 
      name: "Vite", 
      icon: Zap, 
      category: "web-development", 
      subcategory: "Frontend",
      color: "#646CFF", 
      bgColor: "#EEF2FF" 
    },

    // Web Development - Backend
    { 
      id: "nodejs", 
      name: "Node.js", 
      icon: Server, 
      category: "web-development", 
      subcategory: "Backend",
      color: "#68A063", 
      bgColor: "#F0FDF4" 
    },
    { 
      id: "express", 
      name: "Express.js", 
      icon: Workflow, 
      category: "web-development", 
      subcategory: "Backend",
      color: "#000000", 
      bgColor: "#F9FAFB" 
    },
    { 
      id: "restful", 
      name: "RESTful APIs", 
      icon: Activity, 
      category: "web-development", 
      subcategory: "Backend",
      color: "#0EA5E9", 
      bgColor: "#F0F9FF" 
    },

    // Languages
    { 
      id: "python", 
      name: "Python", 
      icon: Terminal, 
      category: "languages",
      color: "#3776AB", 
      bgColor: "#EFF6FF" 
    },
    { 
      id: "java", 
      name: "Java", 
      icon: Code, 
      category: "languages",
      color: "#ED8B00", 
      bgColor: "#FFF7ED" 
    },
    { 
      id: "cpp", 
      name: "C++", 
      icon: Code, 
      category: "languages",
      color: "#00599C", 
      bgColor: "#EFF6FF" 
    },

    // Database
    { 
      id: "mongodb", 
      name: "MongoDB", 
      icon: Database, 
      category: "database",
      color: "#47A248", 
      bgColor: "#F0FDF4" 
    },
    { 
      id: "sql", 
      name: "SQL", 
      icon: HardDrive, 
      category: "database",
      color: "#336791", 
      bgColor: "#EFF6FF" 
    },
    { 
      id: "database-design", 
      name: "Database Design", 
      icon: Boxes, 
      category: "database",
      color: "#7C3AED", 
      bgColor: "#FAF5FF" 
    },

    // Tools
    { 
      id: "git", 
      name: "Git", 
      icon: GitBranch, 
      category: "tools",
      color: "#F05032", 
      bgColor: "#FEF2F2" 
    },
    { 
      id: "github", 
      name: "GitHub", 
      icon: Cloud, 
      category: "tools",
      color: "#181717", 
      bgColor: "#F9FAFB" 
    }
  ];

  const filteredTechnologies = technologies.filter(tech => {
    const categoryMatch = tech.category === activeCategory;
    if (!activeSubcategory) return categoryMatch;
    return categoryMatch && tech.subcategory === activeSubcategory;
  });

  const activeCategoryData = categories.find(cat => cat.id === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className={`py-20 relative overflow-hidden transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-gray-50 to-white'
    }`} id="skills">
      <div className="container-section-1">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 transition-colors duration-300 ${
            theme === 'dark' ? 'text-white' : 'text-convrt-dark-blue'
          }`}>
            Advanced Technologies
          </h2>
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed transition-colors duration-300 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Explore the cutting-edge technologies that power modern applications
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id);
                setActiveSubcategory(null);
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? `text-white shadow-lg`
                  : theme === 'dark'
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
              style={activeCategory === category.id ? { backgroundColor: category.color } : {}}
            >
              <category.icon className="w-5 h-5" />
              {category.name}
            </button>
          ))}
        </div>

        {/* Subcategory Pills */}
        <AnimatePresence mode="wait">
          {activeCategoryData?.subcategories && (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-wrap justify-center gap-3 mb-12"
            >
              {activeCategoryData.subcategories.map((subcategory) => (
                <button
                  key={subcategory}
                  onClick={() => setActiveSubcategory(activeSubcategory === subcategory ? null : subcategory)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeSubcategory === subcategory
                      ? subcategory === 'Frontend'
                        ? 'bg-blue-500 text-white'
                        : 'bg-green-500 text-white'
                      : theme === 'dark'
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {subcategory}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Technologies Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${activeSubcategory}`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredTechnologies.map((tech) => (
              <motion.div
                key={tech.id}
                className={`relative p-6 rounded-2xl transition-all duration-300 hover:shadow-xl group ${
                  theme === 'dark'
                    ? 'bg-gray-800 border border-gray-700 hover:shadow-xl hover:shadow-purple-500/10'
                    : 'bg-white border border-gray-100 hover:shadow-xl hover:shadow-purple-500/5'
                }`}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${
                      theme === 'dark' ? 'bg-gray-700' : ''
                    }`}
                    style={{ 
                      backgroundColor: theme === 'dark' ? 'rgba(55, 65, 81, 1)' : tech.bgColor 
                    }}
                  >
                    <tech.icon 
                      className="w-6 h-6" 
                      style={{ color: tech.color }} 
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold transition-colors duration-300 ${
                      theme === 'dark' ? 'text-white' : 'text-convrt-dark-blue'
                    }`}>
                      {tech.name}
                    </h3>
                    {tech.subcategory && (
                      <span 
                        className={`inline-block text-xs font-medium px-2 py-1 rounded-full mt-1 ${
                          tech.subcategory === 'Frontend' 
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                            : tech.subcategory === 'Backend'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {tech.subcategory}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SkillsShowcase;
