import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('fer202-theme', 'light');
  const toggleTheme = () => setTheme(current => current === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
