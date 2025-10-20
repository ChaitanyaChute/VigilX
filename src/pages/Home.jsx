import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlayCircle } from "react-icons/fa";

// --- Animated Title Component ---
const AnimatedTitle = ({ text }) => {
  return (
    <h1 className="text-6xl md:text-8xl font-extrabold text-white mb-6 tracking-tight">
      {text.split('').map((char, index) => (
        <span key={index} className="inline-block overflow-hidden">
          <span
            className="inline-block animate-text-reveal"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        </span>
      ))}
    </h1>
  );
};

// --- Testimonial Data ---
const testimonials = [
    { name: "Alex Carter", title: "CFO, FinTech Solutions", avatar: "https://api.uifaces.co/api/v1/random?char_limit=1", quote: "VigilX caught a fraudulent transaction pattern we'd been missing for months. Incredibly powerful and deceptively simple." },
    { name: "Sarah Chen", title: "Lead Developer, E-comm Inc.", avatar: "https://api.uifaces.co/api/v1/random?char_limit=1", quote: "The integration was seamless. We were up and running, analyzing live data in an afternoon. The team loves it." },
    { name: "Mark Reynolds", title: "Head of Analytics", avatar: "https://api.uifaces.co/api/v1/random?char_limit=1", quote: "Finally! A fraud tool that's both powerful for analysts and simple for the rest of the team. The reporting is A+." },
    { name: "Jane Smith", title: "Risk & Compliance Officer", avatar: "https://api.uifaces.co/api/v1/random?char_limit=1", quote: "I've explored other tools. VigilX is on another level. The UI is clean, fast, and the AI is frighteningly accurate." }
];

// --- Testimonial Card Component ---
const TestimonialCard = ({ quote, name, title, avatar }) => (
  <div className="flex-shrink-0 w-full max-w-sm bg-gray-900/50 border border-gray-800 rounded-2xl p-6 mx-4">
    <p className="text-gray-300 mb-4">"{quote}"</p>
    <div className="flex items-center">
      <img src={`${avatar}&name=${name}`} alt={name} className="w-10 h-10 rounded-full border-2 border-gray-700" />
      <div className="ml-3">
        <p className="font-semibold text-white">{name}</p>
        <p className="text-sm text-gray-500">{title}</p>
      </div>
    </div>
  </div>
);


// --- Main Home Component ---
export default function Home() {
  return (
    <div className="bg-black text-gray-100 overflow-x-hidden">
      
      {/* ===== Section 1: Hero ===== */}
      <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full filter blur-3xl opacity-60 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-[350px] h-[350px] bg-indigo-600/10 rounded-full filter blur-3xl opacity-60 animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute inset-0 border border-blue-500/40 rounded-lg filter blur-lg animate-border-pulse"></div>
        </div>

        <div className="relative z-10">
          <AnimatedTitle text="VigilX" />
          <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10 animate-fade-in-down" style={{ animationDelay: '0.6s' }}>
            AI-powered models that make your financial data truly secure and transparent. All in one click.
          </p>
          <div className="animate-fade-in-down" style={{ animationDelay: '0.9s' }}>
            <Link
              to="/login" 
              state={{ defaultIsLogin: false }}
              className="text-lg bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20"
            >
              Start Analyzing for Free
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Section 2: Launchpad CTA ===== */}
      <section className="py-24 px-6 glowing-grid-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Enter the Fraud Detection Launchpad
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
            Your journey to financial security starts here. Upload your data and let our AI provide instant, actionable insights. No setup required.
          </p>
          <Link
            to="/FraudDetection"
            className="inline-flex items-center text-lg bg-white text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <FaPlayCircle className="mr-3" />
            Launch Tool
          </Link>
        </div>
      </section>
      
      {/* ===== Section 3: Stats Cards ===== */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
              <h2 className="text-7xl font-bold text-blue-500 mb-3">1.4M+</h2>
              <h3 className="text-2xl font-semibold text-white mt-2">Transactions Scanned</h3>
              <p className="text-gray-400 mt-2">Our AI processes millions of data points to find the needles in the haystack.</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
              <h2 className="text-7xl font-bold text-blue-500 mb-3">99.8%</h2>
              <h3 className="text-2xl font-semibold text-white mt-2">Detection Accuracy</h3>
              <p className="text-gray-400 mt-2">Fine-tuned models built to identify complex financial fraud patterns.</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
              <h2 className="text-7xl font-bold text-blue-500 mb-3">{"< 5s"}</h2>
              <h3 className="text-2xl font-semibold text-white mt-2">Instant Reporting</h3>
              <p className="text-gray-400 mt-2">Get actionable insights and comprehensive reports in seconds, not hours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Section 4: Testimonial Marquee ===== */}
      <section className="py-24 bg-black overflow-hidden">
        <h2 className="text-5xl font-bold text-center text-white mb-6">Trusted by Teams Worldwide</h2>
        <p className="text-lg text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          See what developers, analysts, and CFOs are saying about VigilX.
        </p>
        <div 
          className="relative w-full overflow-hidden"
          style={{ maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)" }}
        >
          <div className="flex animate-scroll-slow">
            {[...testimonials, ...testimonials].map((item, index) => (
              <TestimonialCard 
                key={index}
                quote={item.quote}
                name={item.name}
                title={item.title}
                avatar={item.avatar}
              />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};