
import React from 'react';
import { motion } from 'framer-motion';

export interface PointTitleData {
  id: number;
  title: string;
  points: string[];
  beforeImage: string;
  afterImage: string;
}

interface PointTitleProps {
  pointTitle: PointTitleData;
  isActive: boolean;
  onClick: () => void;
}

const PointTitle: React.FC<PointTitleProps> = ({ pointTitle, isActive, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`text-left p-3 rounded-lg transition-all duration-300 w-full ${
        isActive 
          ? 'bg-convrt-purple/20 text-convrt-purple border-2 border-convrt-purple/40' 
          : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-convrt-dark-blue dark:text-gray-300 border-2 border-transparent'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <h4 className="font-semibold text-sm leading-tight">
        {pointTitle.title}
      </h4>
    </motion.button>
  );
};

export default PointTitle;
