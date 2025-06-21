
import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
  label?: string;
  className?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  isOn,
  onToggle,
  label,
  className = ''
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {label && (
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>
      )}
      
      <motion.button
        onClick={onToggle}
        className={`relative w-16 h-8 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-convrt-purple/30 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 ${
          isOn
            ? 'bg-gray-700 dark:bg-gray-600'
            : 'bg-gray-300 dark:bg-gray-600'
        }`}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className={`w-6 h-6 rounded-full bg-white shadow-lg flex items-center justify-center ${
            isOn ? 'text-gray-600' : 'text-yellow-500'
          }`}
          animate={{
            x: isOn ? 32 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          {isOn ? (
            <Moon className="w-3.5 h-3.5" />
          ) : (
            <Sun className="w-3.5 h-3.5" />
          )}
        </motion.div>
      </motion.button>
    </div>
  );
};

export default ToggleSwitch;
