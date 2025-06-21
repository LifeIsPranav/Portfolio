
import React from 'react';
import { useTheme } from './ThemeProvider';
import ToggleSwitch from './ui/toggle-switch';

const ModernThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Dark theme
      </span>
      <ToggleSwitch
        isOn={theme === 'dark'}
        onToggle={toggleTheme}
      />
    </div>
  );
};

export default ModernThemeToggle;
