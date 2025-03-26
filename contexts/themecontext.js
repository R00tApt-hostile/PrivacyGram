import React, { createContext, useState, useEffect } from 'react';
import { lightTheme, darkTheme, amoledTheme } from '../styles/themes';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [themeConfig, setThemeConfig] = useState(lightTheme);

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    changeTheme(savedTheme);
  }, []);

  const changeTheme = (themeName) => {
    let newTheme;
    switch (themeName) {
      case 'dark':
        newTheme = darkTheme;
        break;
      case 'amoled':
        newTheme = amoledTheme;
        break;
      default:
        newTheme = lightTheme;
    }
    
    setTheme(themeName);
    setThemeConfig(newTheme);
    localStorage.setItem('theme', themeName);
    
    // Apply theme to root element
    const root = document.documentElement;
    Object.keys(newTheme).forEach(key => {
      root.style.setProperty(`--${key}`, newTheme[key]);
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, themeConfig, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
