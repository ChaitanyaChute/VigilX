import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom'; // Import NavLink for active link styling

// --- SVG Icons ---
const VigilXLogo = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-500">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const MenuIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
    </svg>
);
const CloseIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
);

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Effect to handle scroll detection for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Base classes for NavLink
  const navLinkClasses = "text-gray-400 transition-all duration-300 transform hover:text-white hover:-translate-y-0.5";
  // Function to determine active NavLink classes
  const getActiveNavLinkClass = ({ isActive }) =>
    isActive ? `${navLinkClasses} text-white border-b-2 border-blue-500 pb-1` : navLinkClasses;

  const navLinks = (
    <>
      <NavLink to="/" className={getActiveNavLinkClass}>Home</NavLink>
      <NavLink to="/features" className={getActiveNavLinkClass}>Features</NavLink>
      <NavLink to="/insights" className={getActiveNavLinkClass}>Insights</NavLink>
      <NavLink to="/about" className={getActiveNavLinkClass}>About</NavLink>
      <NavLink to="/contact" className={getActiveNavLinkClass}>Contact</NavLink>
    </>
  );

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 backdrop-blur-md ${isScrolled ? 'bg-black/50 shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between h-20 transition-colors duration-300`}>
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <VigilXLogo />
              <span className="text-2xl font-semibold text-white">VigilX</span>
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-8">{navLinks}</div>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" state={{ defaultIsLogin: true }} className="text-gray-300 hover:text-white font-medium transition-colors duration-300">Login</Link>
            <Link 
              to="/login" 
              state={{ defaultIsLogin: false }} 
              className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              Sign Up
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-900 focus:outline-none"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Menu with Slide-Down Animation */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-md transition-all duration-300 ease-in-out transform ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <div className="px-5 pt-4 pb-6 flex flex-col items-center space-y-4">
          {navLinks}
          <div className="w-full pt-4 flex flex-col items-center space-y-3">
            {/* --- THIS IS THE CORRECTED LINE --- */}
            <Link to="/login" state={{ defaultIsLogin: true }} className="block text-gray-300 hover:text-white font-medium transition-colors duration-300">Login</Link>
            <Link to="/login" state={{ defaultIsLogin: false }} className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-all duration-300">Sign Up</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};