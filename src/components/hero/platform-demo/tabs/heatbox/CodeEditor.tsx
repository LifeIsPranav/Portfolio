
import React from 'react';
import Editor from '@monaco-editor/react';
import { Play, Copy, Download } from 'lucide-react';
import { useTheme } from '../../../../ThemeProvider';

interface CodeEditorProps {
  selectedLanguage: string;
  code: string;
  onCodeChange: (value: string) => void;
  onLanguageChange: (language: string) => void;
  onSubmit: () => void;
  onCopy: () => void;
  onDownload: () => void;
}

const languages = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'json', label: 'JSON' }
];

const CodeEditor = ({
  selectedLanguage,
  code,
  onCodeChange,
  onLanguageChange,
  onSubmit,
  onCopy,
  onDownload
}: CodeEditorProps) => {
  const { theme } = useTheme();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Code Editor</h3>
          <div className="flex items-center space-x-4">
            <select
              value={selectedLanguage}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-convrt-purple bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
            <div className="flex items-center space-x-2">
              <button
                onClick={onCopy}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                title="Copy code"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={onDownload}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                title="Download code"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="h-96">
        <Editor
          height="100%"
          language={selectedLanguage}
          value={code}
          onChange={(value) => onCodeChange(value || '')}
          theme={theme === 'dark' ? 'vs-dark' : 'light'}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on'
          }}
        />
      </div>
      
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Language: <span className="font-medium">{languages.find(l => l.value === selectedLanguage)?.label}</span>
          </div>
          <button
            onClick={onSubmit}
            className="flex items-center space-x-2 bg-convrt-purple text-white px-4 py-2 rounded-lg hover:bg-convrt-purple-hover transition-colors"
          >
            <Play className="w-4 h-4" />
            <span>Submit Code</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
