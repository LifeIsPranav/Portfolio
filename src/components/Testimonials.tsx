import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    quote: "Comfortable working across the stack & quick to adapt to new tools and tech. I thrive in dynamic environments and enjoy learning by building",
    name: "Pranav",
    title: "Developer, constantly leveling up",
    company: "Otter.ai",
    logo: "otter",
    bgColor: "bg-[#efeaf5] dark:bg-purple-900/30",
  },
  {
    id: 2,
    quote: "Redis Cache and Queues \u00A0 HLD & LLD \u00A0 Fastify and Express \u00A0 REST and GraphQL APIs \u00A0 MVC Arch. \u00A0 Auth and Validation \u00A0 ORM & ODMs \u00A0 Databases \u00A0 Docker and CI/CD \u00A0 WebSockets \u00A0 Error Handling and Logging \u00A0 Scalability & Rate Limiting",
    name: "Sales Team",
    title: "Connecteam",
    company: "Connecteam",
    logo: "connecteam",
    bgColor: "bg-[#fde7dc] dark:bg-orange-900/30",
  },
  {
    id: 3,
    quote: "Strong grasp in DS and algo with expertise in problem solving",
    name: "Growth Marketing",
    title: "Spectinga",
    company: "Spectinga",
    logo: "spectinga",
    bgColor: "bg-[#e9e9e9] dark:bg-gray-700",
  }
];

const stats = [
  {
    id: 1,
    value: "AI",
    description: "Agentic AI, LangChain & LangGraph, RAGs, LLMs, Fine-Tuning",
    company: "Otter.ai",
    bgColor: "bg-[#efeaf5] dark:bg-purple-900/30",
  },
  {
    id: 2,
    value: "Handshake",
    description: "",
    company: "Handshake",
    bgColor: "bg-white dark:bg-gray-800",
  },
  {
    id: 3,
    value: "Sumup",
    description: "",
    company: "Sumup",
    bgColor: "bg-white dark:bg-gray-800",
  }
];

const Testimonials = () => {
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
  id="testimonials">
      <div className="container-section max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: false }}
          className="mb-8 text-center"
        >
          <h2 className="heading-lg font-bold mb-6 text-gray-900 dark:text-white transition-colors duration-300">Technologies I've Worked With</h2>
        </motion.div>


        <div className="grid grid-cols-12 gap-4 mt-14">
          {/* Stats box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: false }}
            className="col-span-12 md:col-span-4 lg:col-span-3 rounded-xl overflow-hidden"
          >
            <div className={`h-full ${stats[0].bgColor} p-8 flex flex-col transition-colors duration-300`}>
              <div className="mt-auto">
                <div className="text-5xl font-bold mb-2 text-gray-900 dark:text-white">{stats[0].value}</div>
                <div className="text-gray-600 dark:text-gray-300">{stats[0].description}</div>
              </div>
              <div className="mt-auto pt-6">
                <div className="font-bold text-lg text-gray-900 dark:text-white">
                  <span className="font-black">Open</span>•<span className="font-black">AI</span> &nbsp; gemini <span className="font-normal">&nbsp; ollama &nbsp; sarvamAI</span> 
                </div>
              </div>
            </div>
          </motion.div>

          {/* Handshake box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: false }}
            className="col-span-12 md:col-span-4 lg:col-span-3 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700"
          >
            <div className={`h-full flex flex-col items-center justify-center p-6 ${stats[1].bgColor} transition-colors duration-300`}>
              <div className="font-black text-2xl italic text-gray-900 dark:text-white">Development</div>
              <div className="font-black text-2xl italic text-gray-900 dark:text-white">and</div>
              <div className="font-black text-2xl italic text-gray-900 dark:text-white">Deployment</div>
            </div>
          </motion.div>

          {/* First testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: false }}
            className="col-span-12 md:col-span-8 lg:col-span-6 rounded-xl overflow-hidden"
          >
            <div className={`h-full ${testimonials[0].bgColor} p-8 flex flex-col transition-colors duration-300`}>
              <div className="text-2xl font-medium mb-8 text-gray-900 dark:text-white">
                "{testimonials[0].quote}"
              </div>
              <div className="mt-auto">
                <div className="font-medium text-gray-900 dark:text-white">{testimonials[0].name}</div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">{testimonials[0].title}</div>
              </div>
            </div>
          </motion.div>

          {/* Second testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: false }}
            className="col-span-12 md:col-span-7 lg:col-span-6 rounded-xl overflow-hidden"
          >
            <div className={`h-full ${testimonials[1].bgColor} p-8 flex flex-col transition-colors duration-300`}>
              <div className="text-xl font-medium mb-10 text-gray-900 dark:text-white">
                "{testimonials[1].quote}"
              </div>
              <div className="mt-auto">
                <div className="font-extrabold text-3xl text-gray-900 dark:text-white">BACKEND</div>
              </div>
            </div>
          </motion.div>

          {/* Sumup box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: false }}
            className="col-span-12 md:col-span-5 lg:col-span-3 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700"
          >
            <div className={`h-full flex flex-col items-center justify-center p-6 ${stats[2].bgColor} transition-colors duration-300`}>
              {/* <div className="font-black text-xl text-gray-900 dark:text-white">
                Problem <span className="inline-block bg-black dark:bg-white text-white dark:text-black px-1 py-0.5 rounded">∫</span>olving
              </div> */}
              <div className="font-black mt-5 text-xl text-gray-900 dark:text-white">
                Creating <span className="inline-block bg-black dark:bg-white text-white dark:text-black px-1 py-0.5 rounded">∫</span>olutions
              </div>
            </div>
          </motion.div>

          {/* Third testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: false }}
            className="col-span-12 md:col-span-12 lg:col-span-3 rounded-xl overflow-hidden"
          >
            <div className={`h-full ${testimonials[2].bgColor} p-8 flex flex-col transition-colors duration-300`}>
              <div className="text-2xl font-medium mb-8 text-gray-900 dark:text-white">
                "{testimonials[2].quote}"
              </div>
              <div className="mt-auto">
                <div className="font-extrabold text-lg flex items-center align-center text-gray-900 dark:text-white">
                  <span className="inline-block text-2xl mr-1">⊙</span> DSA
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
