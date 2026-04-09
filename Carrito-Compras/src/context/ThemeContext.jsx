import { createContext, useState, useEffect } from 'react';

// 1. creamos el contexto del tema
export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  
  // 2. Estado del tema (arrancaria con "dark" si no hay nada guardado)
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'dark'; // Por defecto oscuro (colores fríos)
  });

  // 3. guardad en el localStorage cuando se cambie de tema
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  // 4. funtion para cambiar entre claro y oscuro
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
