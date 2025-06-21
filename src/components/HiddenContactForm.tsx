
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Mail, User, MessageCircle, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HiddenContactForm = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setIsRevealed(false);
      setIsSubmitted(false);
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id='contact' className="py-24 bg-gradient-to-br from-convrt-purple/5 via-white to-convrt-purple/10 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
      <div className="absolute top-10 left-10 w-32 h-32 bg-convrt-purple/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-convrt-purple/5 rounded-full blur-3xl"></div>

      <div className="container-section max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-convrt-purple/10 text-convrt-purple mb-6">
            <Mail className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium font-inter tracking-wide">Get in Touch</span>
          </div>
          <h2 className="font-inter font-bold text-4xl md:text-5xl text-convrt-dark-blue dark:text-white mb-6">
            Ready to Transform Your <span className="text-convrt-purple">Outreach?</span>
          </h2>
          <p className="text-xl text-convrt-dark-blue/70 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Let's discuss how our AI can help you build meaningful relationships with your prospects
          </p>
        </motion.div>

        {/* Hidden Contact Trigger */}
        <AnimatePresence>
          {!isRevealed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="relative max-w-md mx-auto"
            >
              <motion.div
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsRevealed(true)}
                className="relative cursor-pointer group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-convrt-purple to-convrt-purple-hover rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative bg-white dark:bg-gray-800 border border-convrt-purple/20 dark:border-gray-700 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500">
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                    className="inline-block mb-4"
                  >
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-convrt-purple to-convrt-purple-light rounded-2xl flex items-center justify-center">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-convrt-dark-blue dark:text-white mb-3">
                    Start Your Journey
                  </h3>
                  <p className="text-convrt-dark-blue/70 dark:text-gray-300 mb-6">
                    Click to reveal your personalized contact experience
                  </p>
                  
                  <div className="inline-flex items-center bg-convrt-purple/10 text-convrt-purple px-4 py-2 rounded-full font-medium">
                    <span className="mr-2">Unlock Contact Form</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Revealed Contact Form */}
        <AnimatePresence>
          {isRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
              className="relative max-w-2xl mx-auto"
            >
              <div className="relative bg-white dark:bg-gray-800 p-8 md:p-12 rounded-3xl shadow-2xl border border-convrt-purple/10 dark:border-gray-700">
                {/* Close button */}
                <button
                  onClick={() => setIsRevealed(false)}
                  className="absolute top-6 right-6 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors z-10"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>

                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {/* Form header */}
                      <div className="text-center mb-8">
                        <div className="w-20 h-20 mx-auto bg-gradient-to-r from-convrt-purple to-convrt-purple-light rounded-2xl flex items-center justify-center mb-6">
                          <Mail className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-3xl font-bold text-convrt-dark-blue dark:text-white mb-3">Let's Connect</h3>
                        <p className="text-convrt-dark-blue/70 dark:text-gray-300">Tell us about your outreach goals and challenges</p>
                      </div>

                      {/* Contact Form */}
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <motion.div
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="relative"
                        >
                          <User className="absolute left-4 top-4 w-5 h-5 text-convrt-purple/60" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Your Name"
                            required
                            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-convrt-purple dark:focus:border-convrt-purple transition-colors bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="relative"
                        >
                          <Mail className="absolute left-4 top-4 w-5 h-5 text-convrt-purple/60" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Your Email"
                            required
                            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-convrt-purple dark:focus:border-convrt-purple transition-colors bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="relative"
                        >
                          <MessageCircle className="absolute left-4 top-4 w-5 h-5 text-convrt-purple/60" />
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Tell us about your outreach goals and current challenges..."
                            required
                            rows={4}
                            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-convrt-purple dark:focus:border-convrt-purple transition-colors resize-none bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-convrt-purple to-convrt-purple-hover hover:from-convrt-purple-hover hover:to-convrt-purple text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center group transition-all duration-300"
                          >
                            Send Message
                            <Send className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </motion.div>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                        className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6"
                      >
                        <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-convrt-dark-blue dark:text-white mb-3">Message Sent!</h3>
                      <p className="text-convrt-dark-blue/70 dark:text-gray-300">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HiddenContactForm;
