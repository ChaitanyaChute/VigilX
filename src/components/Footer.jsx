import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        
        {/* Brand Section */}
        <div className="flex items-center space-x-2">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-indigo-500"
          >
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-xl font-semibold text-white">VigilX</span>
        </div>

        {/* Center Links */}
        <div className="flex space-x-8 text-sm">
          <a href="#" className="hover:text-indigo-400 transition-colors">Home</a>
          <a href="#" className="hover:text-indigo-400 transition-colors">Features</a>
          <a href="#" className="hover:text-indigo-400 transition-colors">Insights</a>
          <a href="#" className="hover:text-indigo-400 transition-colors">About</a>
          <a href="#" className="hover:text-indigo-400 transition-colors">Contact</a>
        </div>

        {/* Social Links */}
        <div className="flex space-x-5">
          <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
            <FaGithub size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
            <FaLinkedin size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
            <FaTwitter size={20} />
          </a>
        </div>
      </div>

      {/* Bottom line */}
      <div className="border-t border-gray-800 mt-6 text-center text-sm py-4 text-gray-500">
        © {new Date().getFullYear()} VigilX. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
