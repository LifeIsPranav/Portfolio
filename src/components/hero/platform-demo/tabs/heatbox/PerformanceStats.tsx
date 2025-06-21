
import React from 'react';
import { motion } from 'framer-motion';
import { platforms } from '../../../../../config/mockData';

const PerformanceStats = () => {
  return (
    <div className="grid grid-cols-2 gap-6 mb-8">
      {platforms.map((item, i) => (
        <motion.div 
          key={i} 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium text-gray-700 dark:text-gray-300">{item.platform}</span>
            <span className={`text-${item.color} font-bold text-lg`}>{item.percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
            <div 
              className={`bg-${item.color} h-3 rounded-full transition-all duration-1000`} 
              style={{width: `${item.percentage}%`}}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PerformanceStats;
