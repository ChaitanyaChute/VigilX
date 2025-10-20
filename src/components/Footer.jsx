import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter, FaArrowRight, FaArrowUp } from "react-icons/fa";

// --- Back to Top Button Component ---
const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 bg-blue-600/80 backdrop-blur-md text-white p-3 rounded-full shadow-lg hover:bg-blue-700 hover:scale-110 transition-all ease-in-out duration-300 z-50 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-label="Back to top"
    >
      <FaArrowUp size={20} />
    </button>
  );
};


// --- Main Enhanced Footer Component ---
const Footer = () => {
  return (
    <>
      {/* ===== Pre-Footer CTA ===== */}
      <section className="py-20 px-6 bg-black pb-10">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-700/80 to-indigo-800/80 rounded-3xl p-12 md:p-16 text-center shadow-2xl shadow-blue-500/20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to Build a More Secure Future?
          </h2>
          <p className="text-lg text-blue-200 mt-4 mb-10 max-w-xl mx-auto">
            Join the growing community of businesses trusting VigilX. Create your free account and start your first analysis in under 5 minutes.
          </p> 
          <Link
            to="/login"
            state={{ defaultIsLogin: false }}
            className="text-lg bg-white text-black font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Create Free Account
          </Link>
        </div>
      </section>

      {/* ===== Main Footer ===== */}
      <footer className="bg-black text-gray-400 pt-16 px-6 relative overflow-hidden">
        {/* Glowing Divider */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

        {/* Animated Background Blobs */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] bg-blue-600/10 rounded-full filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-indigo-500/10 rounded-full filter blur-3xl opacity-70 animate-blob" style={{ animationDelay: '3s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-4 md:grid-cols-2 gap-10 z-10">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <h2 className="text-3xl font-extrabold text-blue-500 mb-3 tracking-wide">
              VigilX
            </h2>
            <p className="text-sm text-gray-500">
              AI-driven fraud detection for the modern web.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Platform
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="group">
                <Link to="/FraudDetection" className="hover:text-white transition-colors flex items-center">
                  Launch Tool <FaArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity ml-2" />
                </Link>
              </li>
              <li className="group">
                <Link to="/features" className="hover:text-white transition-colors flex items-center">
                  Features <FaArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity ml-2" />
                </Link>
              </li>
              <li className="group">
                <Link to="/pricing" className="hover:text-white transition-colors flex items-center">
                  Pricing <FaArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity ml-2" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Company
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="group">
                <Link to="/KnowMe" className="hover:text-white transition-colors flex items-center">
                  About Us <FaArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity ml-2" />
                </Link>
              </li>
              <li className="group">
                <Link to="/contact" className="hover:text-white transition-colors flex items-center">
                  Contact <FaArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity ml-2" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Social */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Stay Updated
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Get the latest news on fraud detection and security.
            </p>
            <form className="flex">
              <input type="email" placeholder="Your email" className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-l-md focus:outline-none" />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md font-semibold">
                →
              </button>
            </form>
            <div className="flex space-x-5 mt-6">
              <a href="#" className="text-gray-500 hover:text-white transition-transform transform hover:scale-110"><FaGithub size={22} /></a>
              <a href="#" className="text-gray-500 hover:text-white transition-transform transform hover:scale-110"><FaLinkedin size={22} /></a>
              <a href="#" className="text-gray-500 hover:text-white transition-transform transform hover:scale-110"><FaTwitter size={22} /></a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="relative mt-20 pt-8 z-10">
          {/* Glowing Divider */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
          
          <div className="text-center text-gray-600 text-sm flex flex-col sm:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} <span className="text-blue-500 font-semibold">VigilX</span>. All Rights Reserved.</p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
      <BackToTopButton />
    </>
  );
};

export default Footer;