import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-12 px-6 mt-16 border-t border-gray-800 relative overflow-hidden">
      {/* Subtle gradient glow background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/10 via-transparent to-indigo-500/10 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto grid md:grid-cols-3 gap-10 z-10">
        {/* Brand Section */}
        <div>
          <h2 className="text-3xl font-extrabold text-indigo-400 mb-3 tracking-wide">
            VigilX
          </h2>
          <p className="text-sm text-gray-500">
            Empowering secure transactions through AI-driven fraud detection.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-indigo-300 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-indigo-400 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a
                href="/features"
                className="hover:text-indigo-400 transition-colors"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="/upload"
                className="hover:text-indigo-400 transition-colors"
              >
                Upload
              </a>
            </li>
            <li>
              <a
                href="/reports"
                className="hover:text-indigo-400 transition-colors"
              >
                Reports
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="hover:text-indigo-400 transition-colors"
              >
                About
              </a>
            </li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h3 className="text-xl font-semibold text-indigo-300 mb-4">
            Connect With Us
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            support@vigilx.ai
          </p>
          <div className="flex space-x-5">
            <a
              href="#"
              className="hover:text-indigo-400 transition-transform transform hover:scale-110"
            >
              <FaGithub size={22} />
            </a>
            <a
              href="#"
              className="hover:text-indigo-400 transition-transform transform hover:scale-110"
            >
              <FaLinkedin size={22} />
            </a>
            <a
              href="#"
              className="hover:text-indigo-400 transition-transform transform hover:scale-110"
            >
              <FaTwitter size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative text-center text-gray-600 text-sm mt-10 border-t border-gray-800 pt-4 z-10">
        © 2025 <span className="text-indigo-400 font-semibold">VigilX</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
