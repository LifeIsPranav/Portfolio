
import React from 'react';
import { motion } from 'framer-motion';

interface OutputConsoleProps {
  output: string;
}

const OutputConsole = ({ output }: OutputConsoleProps) => {
  if (!output) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 dark:bg-black text-green-400 p-6 rounded-xl font-mono text-sm"
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-green-300 font-semibold">Output:</h4>
        <div className="flex space-x-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
      </div>
      <pre className="whitespace-pre-wrap">{output}</pre>
    </motion.div>
  );
};

export default OutputConsole;
