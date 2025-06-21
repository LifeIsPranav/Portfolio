
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export interface StepContentProps {
  stepNumber: number;
  title: string;
  description: string;
  highlightText: string;
  highlightDetails: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  subPoints?: string[];
}

const StepContent: React.FC<StepContentProps> = ({
  stepNumber,
  title,
  description,
  icon,
  isActive,
  onClick,
  subPoints = [],
}) => {
  return (
    <motion.div 
      className={`relative px-6 py-5 cursor-pointer transition-all duration-300 w-full rounded-2xl ${
        isActive 
          ? 'bg-white dark:bg-gray-800 shadow-xl border-2 border-convrt-purple/30 dark:border-convrt-purple/50' 
          : 'bg-white/60 dark:bg-gray-800/60 hover:bg-white/80 dark:hover:bg-gray-800/80 border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-600'
      }`}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: isActive ? 1.02 : 1
      }}
      transition={{ duration: 0.3, delay: stepNumber * 0.1 }}
      whileHover={{ y: isActive ? 0 : -2 }}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <motion.div 
            className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg ${
              isActive 
                ? 'bg-gradient-to-br from-convrt-purple to-convrt-purple-light text-white' 
                : 'bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 text-convrt-dark-blue dark:text-gray-200'
            }`}
            animate={{ 
              scale: isActive ? 1.1 : 1,
              rotateY: isActive ? 360 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            {stepNumber}
          </motion.div>
        </div>
        
        <div className="flex-1">
          <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full mb-3 ${
            isActive ? 'bg-convrt-purple/15 text-convrt-purple' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
          }`}>
            {icon}
          </div>
          
          <h3 className={`text-lg font-bold mb-3 leading-tight ${
            isActive ? 'text-convrt-dark-blue dark:text-white' : 'text-convrt-dark-blue/80 dark:text-gray-300'
          }`}>
            {title}
          </h3>
          
          <p className={`text-sm mb-4 leading-relaxed ${
            isActive ? 'text-convrt-dark-blue/70 dark:text-gray-300' : 'text-convrt-dark-blue/60 dark:text-gray-400'
          }`}>
            {description}
          </p>
          
          {isActive && subPoints.length > 0 && (
            <motion.div 
              className="space-y-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {subPoints.map((point, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start gap-3 p-3 bg-gradient-to-r from-convrt-purple/5 to-transparent dark:from-convrt-purple/10 rounded-xl border-l-3 border-convrt-purple/30"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                >
                  <CheckCircle className="w-4 h-4 text-convrt-purple mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-convrt-dark-blue/80 dark:text-gray-300 leading-relaxed">
                    {point}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default StepContent;
