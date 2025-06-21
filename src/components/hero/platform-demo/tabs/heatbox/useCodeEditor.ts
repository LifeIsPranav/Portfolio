
import { useState } from 'react';

const defaultCodes: { [key: string]: string } = {
  javascript: `// Welcome to JavaScript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`,
  python: `# Welcome to Python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(10))`,
  java: `// Welcome to Java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  cpp: `// Welcome to C++
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
  typescript: `// Welcome to TypeScript
interface User {
    name: string;
    age: number;
}

const user: User = {
    name: "John Doe",
    age: 30
};

console.log(user);`,
  html: `<!DOCTYPE html>
<html>
<head>
    <title>Hello World</title>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
</html>`,
  css: `/* Welcome to CSS */
body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    margin: 0;
    padding: 20px;
}

h1 {
    color: #333;
    text-align: center;
}`,
  json: `{
  "name": "Hello World",
  "version": "1.0.0",
  "description": "A simple JSON example",
  "author": "Developer"
}`
};

export const useCodeEditor = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState(defaultCodes.javascript);
  const [output, setOutput] = useState('');

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    setCode(defaultCodes[language] || '// Start coding...');
  };

  const handleSubmitCode = () => {
    setOutput(`Code submitted successfully!\nLanguage: ${selectedLanguage}\nCode length: ${code.length} characters\nTimestamp: ${new Date().toLocaleString()}`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  const downloadCode = () => {
    const extensions: { [key: string]: string } = {
      javascript: 'js',
      python: 'py',
      java: 'java',
      cpp: 'cpp',
      typescript: 'ts',
      html: 'html',
      css: 'css',
      json: 'json'
    };
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${extensions[selectedLanguage]}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return {
    selectedLanguage,
    code,
    output,
    setCode,
    handleLanguageChange,
    handleSubmitCode,
    copyToClipboard,
    downloadCode
  };
};
