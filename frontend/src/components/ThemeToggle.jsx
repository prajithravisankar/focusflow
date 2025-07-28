import { useState, useEffect } from "react";

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-16 h-8 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg hover:shadow-xl transform hover:scale-105 group"
      aria-label="Toggle theme"
    >
      {/* Track */}
      <div className="absolute inset-1 bg-white dark:bg-gray-800 rounded-full transition-all duration-300"></div>
      
      {/* Slider */}
      <div 
        className={`absolute top-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 dark:from-purple-500 dark:to-blue-500 rounded-full shadow-lg transition-all duration-300 transform flex items-center justify-center text-xs font-bold ${
          isDark ? "translate-x-8" : "translate-x-1"
        }`}
      >
        <span className="text-white drop-shadow-sm">
          {isDark ? "🌙" : "☀️"}
        </span>
      </div>
      
      {/* Glow effect */}
      <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
        isDark 
          ? "bg-gradient-to-r from-purple-400/20 to-blue-400/20" 
          : "bg-gradient-to-r from-yellow-400/20 to-orange-400/20"
      }`}></div>
      
      {/* Background icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2 text-xs opacity-50">
        <span className={`transition-opacity duration-300 ${!isDark ? "opacity-100" : "opacity-0"}`}>
          ☀️
        </span>
        <span className={`transition-opacity duration-300 ${isDark ? "opacity-100" : "opacity-0"}`}>
          🌙
        </span>
      </div>
    </button>
  );
}

export default ThemeToggle;
