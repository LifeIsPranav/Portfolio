
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
}

const AnimatedButton = ({ 
  children, 
  href, 
  onClick, 
  className = "",
  variant = 'primary'
}: AnimatedButtonProps) => {
  const baseClasses = `
    relative overflow-hidden inline-flex items-center justify-center
    px-8 py-3 rounded-full font-semibold text-sm
    transition-all duration-300 transform hover:scale-105
    focus:outline-none focus:ring-2 focus:ring-offset-2
  `;
  
  const variantClasses = variant === 'primary' 
    ? 'bg-gradient-to-r from-convrt-purple to-convrt-purple-light text-white hover:shadow-lg hover:shadow-convrt-purple/25 focus:ring-convrt-purple'
    : 'bg-white dark:bg-gray-800 text-convrt-dark-blue dark:text-white border-2 border-gray-200 dark:border-gray-700 hover:border-convrt-purple dark:hover:border-convrt-purple focus:ring-convrt-purple';

  const ButtonComponent = href ? motion.a : motion.button;
  const props = href ? { href } : { onClick };

  return (
    <ButtonComponent
      className={`${baseClasses} ${variantClasses} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {/* Revolving Light Animation */}
      <div className="absolute inset-0 rounded-full">
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(from 0deg, transparent, rgba(255,255,255,0.3), transparent)`,
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
      
      {/* Button Content */}
      <span className="relative z-10">{children}</span>
    </ButtonComponent>
  );
};

export default AnimatedButton;
