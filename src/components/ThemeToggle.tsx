
import React from 'react';
import { useTheme } from './ThemeProvider';
import ToggleSwitch from './ui/toggle-switch';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <ToggleSwitch
      isOn={theme === 'dark'}
      onToggle={toggleTheme}
      className="p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
    />
  );
};

export default ThemeToggle;
