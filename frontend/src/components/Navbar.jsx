import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import UseTheme from '../hooks/useThemes';
import geminiIcon from '../assets/Gemini.png';

export default function Navbar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = UseTheme();
  const [isDark, setIsDark] = useState(theme === 'dark');
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('reminderShown');
    navigate('/login');
    setIsOpen(false);
  };

  const handleToggle = () => {
    toggleTheme();
    setIsDark(!isDark);
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow relative">
      {/* Logo */}
      <h1 className="text-lg font-bold">
        <Link to="/dashboard">JobTrackr</Link>
      </h1>

      <div className="flex items-center space-x-4">
        {/* Theme Toggle Switch (always visible) */}
        <div 
          onClick={handleToggle}
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 
            ${isDark ? 'bg-gray-700' : 'bg-gray-400'}`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 
              ${isDark ? 'translate-x-6' : 'translate-x-0'}`}
          />
        </div>
        
        <Link to="/InterviewPrep" className="flex items-center">
          <img
            src={geminiIcon}
            alt = "Interview Prep"
            className="w-6 h-6 rounded object-contain hover:opacity-80 transition-opacity"
          />
        </Link>

        {/* Hamburger Button (always on right) */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="focus:outline-none md:hidden"
        >
          <svg 
            className="w-7 h-7" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d={isOpen 
                ? "M6 18L18 6M6 6l12 12"   // X when open
                : "M4 6h16M4 12h16M4 18h16" // ☰ when closed
              } 
            />
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/add" className="hover:underline">Add Job</Link>
          <button 
            onClick={handleLogout} 
            className="bg-white text-blue-600 hover:bg-gray-100 rounded py-1 px-3"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-16 right-5 bg-blue-600 shadow-lg rounded-lg flex flex-col items-center space-y-4 p-7 md:hidden">
          <Link 
            to="/dashboard" 
            className="hover:underline " 
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <Link 
            to="/add" 
            className="hover:underline" 
            onClick={() => setIsOpen(false)}
          >
            Add Job
          </Link>

          <button 
            onClick={handleLogout} 
            className="bg-white text-blue-600 hover:bg-gray-100 rounded py-1 px-3 w-full text-left"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
