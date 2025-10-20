import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link

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

  const navLinks = (
    <>
      <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-300">Home</Link>
      <Link to="/features" className="text-gray-300 hover:text-white transition-colors duration-300">Features</Link>
      <Link to="/insights" className="text-gray-300 hover:text-white transition-colors duration-300">Insights</Link>
      <Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-300">About</Link>
      <Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-300">Contact</Link>
    </>
  );

  return (
    <nav className="bg-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 border-b border-gray-800/50">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <VigilXLogo />
              <span className="text-2xl font-semibold text-white">VigilX</span>
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-8">{navLinks}</div>
          <div className="hidden md:flex items-center space-x-4">
            {/* --- UPDATED LINKS with STATE --- */}
            <Link to="/login" state={{ defaultIsLogin: true }} className="text-gray-300 hover:text-white font-medium transition-colors duration-300">Login</Link>
            <Link to="/login" state={{ defaultIsLogin: false }} className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition-all duration-300">Sign Up</Link>
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

      {isMobileMenuOpen && (
        <div className="md:hidden bg-black border-b border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3 text-center">{navLinks}</div>
          <div className="pt-4 pb-4 border-t border-gray-800">
            <div className="px-5 flex flex-col items-center space-y-3">
               {/* --- UPDATED MOBILE LINKS with STATE --- */}
               <Link to="/login" state={{ defaultIsLogin: true }} className="block text-gray-300 hover:text-white font-medium transition-colors duration-300">Login</Link>
               <Link to="/login" state={{ defaultIsLogin: false }} className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-all duration-300">Sign Up</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};