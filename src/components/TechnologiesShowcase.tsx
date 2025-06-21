import React from "react";
import { motion } from "framer-motion";

const techCategories = [
  {
    id: 1,
    title: "Frontend Development",
    description: "Building responsive, accessible, and interactive user interfaces",
    technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion", "Redux", "HTML5/CSS3"],
    bgColor: "bg-[#efeaf5] dark:bg-purple-900/30",
  },
  {
    id: 2,
    title: "Backend Development",
    description: "Creating robust and scalable server-side applications",
    technologies: ["Node.js", "Express", "MongoDB", "PostgreSQL", "GraphQL", "REST APIs", "Firebase"],
    bgColor: "bg-[#fde7dc] dark:bg-orange-900/30",
  },
  {
    id: 3,
    title: "DevOps & Cloud",
    description: "Deploying and managing applications in the cloud",
    technologies: ["Docker", "AWS", "CI/CD", "Kubernetes", "Terraform", "GitHub Actions", "Vercel"],
    bgColor: "bg-[#e9e9e9] dark:bg-gray-700",
  },
  {
    id: 4,
    title: "Testing & Quality",
    description: "Ensuring code quality and reliability",
    technologies: ["Jest", "React Testing Library", "Cypress", "Playwright", "TDD", "E2E Testing"],
    bgColor: "bg-[#dbeafe] dark:bg-blue-900/30",
  }
];

const specializationAreas = [
  {
    id: 1,
    title: "Machine Learning & AI",
    technologies: ["TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "Hugging Face", "LangChain"],
    bgColor: "bg-[#efeaf5] dark:bg-purple-900/30",
  },
  {
    id: 2,
    title: "Mobile Development",
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Expo", "Mobile UX/UI"],
    bgColor: "bg-white dark:bg-gray-800",
  },
  {
    id: 3,
    title: "Tools & Platforms",
    technologies: ["Git", "GitHub", "VS Code", "Figma", "Jira", "Notion", "Postman"],
    bgColor: "bg-white dark:bg-gray-800",
  },
  {
    id: 4,
    title: "Web3 & Blockchain",
    technologies: ["Solidity", "Ethereum", "Web3.js", "Smart Contracts", "dApps"],
    bgColor: "bg-[#e9f6f0] dark:bg-emerald-900/30",
  }
];

const TechnologiesShowcase = () => {
  return (
    <section className="
    py-8 pt-20
    [background-image:radial-gradient(#e5e7eb_1.1px,transparent_1px),linear-gradient(to_right,#f8fafc,#f3e8ff66,#dbeafe66)]
[background-size:16px_16px,100%_100%]
transition-colors duration-300
dark:bg-gray-900
dark:[background-image:radial-gradient(rgba(100,116,139,0.25)_0.6px,transparent_1px)]
dark:[background-size:16px_16px]
  "
  id="technologies">
      <div className="container-section max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: false }}
          className="mb-8 text-center"
        >
          <h2 className="heading-lg font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">Technologies I've Worked With</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A comprehensive overview of my technical stack across different domains. These are the tools, languages, and frameworks I use to build robust, scalable, and user-friendly applications.
          </p>
        </motion.div>


        <div className="grid grid-cols-12 gap-4 mt-14">
          {/* Primary tech categories */}
          {techCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              viewport={{ once: false }}
              className={`col-span-12 ${index === 0 ? 'md:col-span-8 lg:col-span-6' : 'md:col-span-6 lg:col-span-3'} rounded-xl overflow-hidden`}
            >
              <div className={`h-full ${category.bgColor} p-8 flex flex-col transition-colors duration-300`}>
                <div className="mb-4">
                  <motion.h3 
                    initial={{ opacity: 0, x: -5 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 * (index + 1) }}
                    className="text-2xl font-bold mb-2 text-gray-900 dark:text-white"
                  >
                    {category.title}
                  </motion.h3>
                  <motion.p 
                    initial={{ opacity: 0, x: -5 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 * (index + 1) }}
                    className="text-gray-600 dark:text-gray-300 mb-6"
                  >
                    {category.description}
                  </motion.p>
                </div>
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {category.technologies.map((tech, techIndex) => (
                      <motion.span 
                        key={techIndex}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block px-3 py-1 rounded-full bg-white/50 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200 text-sm font-medium cursor-pointer hover:bg-white/80 dark:hover:bg-gray-800/80 transition-colors duration-200"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Specialization areas */}
          {specializationAreas.map((area, index) => (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + (0.1 * index) }}
              viewport={{ once: false }}
              className={`col-span-12 md:col-span-4 ${index === 0 ? 'lg:col-span-6' : 'lg:col-span-3'} rounded-xl overflow-hidden`}
            >
              <div className={`h-full ${area.bgColor} p-8 flex flex-col transition-colors duration-300`}>
                <motion.h3 
                  initial={{ opacity: 0, x: -5 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + (0.1 * index) }}
                  className="text-xl font-bold mb-4 text-gray-900 dark:text-white"
                >
                  {area.title}
                </motion.h3>
                <div className="mt-2">
                  <div className="flex flex-wrap gap-2">
                    {area.technologies.map((tech, techIndex) => (
                      <motion.span 
                        key={techIndex}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block px-3 py-1 rounded-full bg-white/50 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200 text-sm font-medium cursor-pointer hover:bg-white/80 dark:hover:bg-gray-800/80 transition-colors duration-200"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologiesShowcase;
