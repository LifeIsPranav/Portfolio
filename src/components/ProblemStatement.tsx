
import React, { useState } from 'react';
import { X, Check, PhoneCall, Mail, MessageSquare, Users, Zap, BarChart3, TrendingUp, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const ProblemStatement = () => {
  const [hoveredSide, setHoveredSide] = useState<'traditional' | 'ai' | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="relative py-16 overflow-hidden bg-white" id="problem">
      <div className="container-section relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <motion.div variants={itemVariants} className="section-tag">
            Why Traditional Outbound Is Dead
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="heading-lg text-convrt-dark-blue mb-6"
          >
            Cold Outreach Doesn't Work Anymore. <br />
            <span className="text-convrt-purple font-extrabold">AI Organic Outbound</span> Does.
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-convrt-dark-blue/80 text-lg mb-8 max-w-2xl mx-auto"
          >
            The days of cold calls and emails are over. Today's buyers expect personalized engagement from people they trust. Convrt.ai puts you exactly where your buyers make decisions.
          </motion.p>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-10 relative"
        >
          {/* Traditional Cold Outbound */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            onHoverStart={() => setHoveredSide('traditional')}
            onHoverEnd={() => setHoveredSide(null)}
            className="bg-[#F9F6F3] rounded-[20px] p-8 border border-gray-100 relative overflow-hidden group cursor-pointer transition-all duration-300"
          >
            <div className="absolute top-0 right-0 bg-red-50 px-4 py-2 rounded-bl-2xl">
              <X className="w-5 h-5 text-[#EA384C]" />
            </div>
            
            <h3 className="heading-sm text-convrt-dark-blue mb-8 flex items-center">
              Traditional Cold Outbound
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: hoveredSide === 'traditional' ? 1 : 0 }}
                className="ml-2 bg-red-100 p-1 rounded-full"
              >
                <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />
              </motion.div>
            </h3>
            
            <ul className="space-y-6">
              {[
                { stat: "1% cold email response rates", desc: "Millions of emails sent, almost all ignored" },
                { stat: "80% of calls screened out", desc: "Decision makers don't take cold calls" },
                { stat: "No relationship before outreach", desc: "Cold outreach feels impersonal and salesy" }
              ].map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mt-0.5 mr-4">
                    <X className="w-4 h-4 text-[#EA384C]" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-convrt-dark-blue">{item.stat}</p>
                    <p className="text-convrt-dark-blue/70 mt-1">{item.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
            
            <div className="mt-12 grid grid-cols-3 gap-4">
              {[
                { icon: PhoneCall, label: "Cold Calls" },
                { icon: Mail, label: "Mass Emails" },
                { icon: MessageSquare, label: "Generic Messages" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="aspect-square flex flex-col items-center justify-center bg-red-50 rounded-xl p-3 cursor-pointer"
                >
                  <item.icon className="w-8 h-8 text-[#EA384C] mb-2" />
                  <div className="text-sm text-center text-[#EA384C] font-medium">{item.label}</div>
                </motion.div>
              ))}
            </div>
            
            <div className="absolute -bottom-1 left-0 right-0 h-1 bg-[#EA384C]"></div>
          </motion.div>
          
          {/* AI Organic Outbound */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            onHoverStart={() => setHoveredSide('ai')}
            onHoverEnd={() => setHoveredSide(null)}
            className="bg-[#F9F6F3] rounded-[20px] p-8 border border-gray-100 relative overflow-hidden group cursor-pointer transition-all duration-300"
          >
            <div className="absolute top-0 right-0 bg-convrt-purple/10 px-4 py-2 rounded-bl-2xl">
              <Check className="w-5 h-5 text-convrt-purple" />
            </div>
            
            <h3 className="heading-sm text-convrt-dark-blue mb-8 flex items-center">
              AI Organic Outbound
              <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-convrt-purple/10 text-convrt-purple rounded-full">Convrt.ai</span>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: hoveredSide === 'ai' ? 1 : 0 }}
                className="ml-2 bg-convrt-purple/10 p-1 rounded-full"
              >
                <TrendingUp className="w-4 h-4 text-convrt-purple" />
              </motion.div>
            </h3>
            
            <ul className="space-y-6">
              {[
                { stat: "15x higher conversion rates", desc: "Build trust before you reach out" },
                { stat: "Key touchpoints and discussions", desc: "Tracks the entire buyer's journey" },
                { stat: "Fully automated growth hacking", desc: "Enterprise-grade AI engagement" }
              ].map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-convrt-purple/10 flex items-center justify-center mt-0.5 mr-4">
                    <Check className="w-4 h-4 text-convrt-purple" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-convrt-dark-blue">{item.stat}</p>
                    <p className="text-convrt-dark-blue/70 mt-1">{item.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
            
            <div className="mt-12 grid grid-cols-3 gap-4">
              {[
                { icon: Users, label: "Engagement" },
                { icon: Zap, label: "Trust Building" },
                { icon: BarChart3, label: "Win More Deals" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  className="aspect-square flex flex-col items-center justify-center bg-convrt-purple/5 rounded-xl p-3 cursor-pointer"
                >
                  <item.icon className="w-8 h-8 text-convrt-purple mb-2" />
                  <div className="text-sm text-center text-convrt-purple font-medium">{item.label}</div>
                </motion.div>
              ))}
            </div>
            
            <div className="absolute -bottom-1 left-0 right-0 h-1 bg-convrt-purple"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemStatement;
