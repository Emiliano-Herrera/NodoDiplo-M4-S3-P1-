import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

function ThemeButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg transition ${
        theme === 'dark'
          ? 'bg-gray-800 hover:bg-gray-700 text-white'
          : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
      }`}
      aria-label="Cambiar tema"
    >
      {theme === 'light' ? <FaMoon /> : <FaSun />}
    </button>
  );
}

export default ThemeButton;