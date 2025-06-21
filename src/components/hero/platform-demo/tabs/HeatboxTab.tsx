
import React from 'react';
import { motion } from 'framer-motion';
import PerformanceStats from './heatbox/PerformanceStats';
import CodeEditor from './heatbox/CodeEditor';
import OutputConsole from './heatbox/OutputConsole';
import { useCodeEditor } from './heatbox/useCodeEditor';

const HeatboxTab = () => {
  const {
    selectedLanguage,
    code,
    output,
    setCode,
    handleLanguageChange,
    handleSubmitCode,
    copyToClipboard,
    downloadCode
  } = useCodeEditor();

  return (
    <div className="space-y-8">
      <PerformanceStats />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <CodeEditor
          selectedLanguage={selectedLanguage}
          code={code}
          onCodeChange={setCode}
          onLanguageChange={handleLanguageChange}
          onSubmit={handleSubmitCode}
          onCopy={copyToClipboard}
          onDownload={downloadCode}
        />
      </motion.div>

      <OutputConsole output={output} />
    </div>
  );
};

export default HeatboxTab;
