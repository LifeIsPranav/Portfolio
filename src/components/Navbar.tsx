import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ModernThemeToggle from './ModernThemeToggle';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <motion.nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-lg border-b border-gray-200/20 dark:border-gray-700/20' : 'bg-transparent'}`} initial={{
    y: -100
  }} animate={{
    y: 0
  }} transition={{
    duration: 0.6,
    ease: "easeOut"
  }}>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <motion.div className="flex-shrink-0" whileHover={{
          scale: 1.05
        }} transition={{
          duration: 0.2
        }}>
            <a href="/" className="text-2xl font-bold gradient-text">
            <div className="text-xl font-bold text-gray-800 dark:text-white">
              lifeispranav
            </div>
            </a>
          </motion.div>

          {/* Theme Toggle and CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <span className='transition-all duration-300 transform hover:scale-105'>

            <ModernThemeToggle />
            </span>
            <motion.a target='_blank' href="https://drive.google.com/file/d/1rqp8_bOEj-SAyQBvpoDhCB9QT3QTf3oo/view?usp=drive_link" className="bg-gradient-to-r from-convrt-purple to-convrt-purple-light text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-convrt-purple/25 transform hover:scale-105" whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }}>
              My Resume
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ModernThemeToggle />
            <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-convrt-dark-blue dark:text-gray-300 hover:text-convrt-purple dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-convrt-purple transition-all duration-300">
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && <motion.div className="md:hidden" initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} exit={{
        opacity: 0,
        height: 0
      }} transition={{
        duration: 0.3,
        ease: "easeInOut"
      }}>
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-t border-gray-200/20 dark:border-gray-700/20">
              <motion.a href="https://drive.google.com/file/d/1rqp8_bOEj-SAyQBvpoDhCB9QT3QTf3oo/view?usp=drive_link" className="block w-full text-center mt-4 bg-gradient-to-r from-convrt-purple to-convrt-purple-light text-white px-6 py-3 rounded-full font-medium transition-all duration-300" onClick={() => setIsOpen(false)} initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.3
          }}>
                Resume
              </motion.a>
            </div>
          </motion.div>}
      </AnimatePresence>
    </motion.nav>;
};
export default Navbar;