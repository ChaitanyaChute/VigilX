import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaPlayCircle, FaUpload, FaSearchDollar, FaFileAlt } from "react-icons/fa";

// --- Animated Counter Component ---
const AnimatedCounter = ({ end, duration = 2, decimals = 0, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const endValue = end;
    let current = start;
    const range = endValue - start;
    const increment = endValue > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration * 1000 / range));

    const timer = setInterval(() => {
      const step = increment * Math.max(1, Math.floor(range / (duration * 1000 / 16)));
      current += step;
      if ((increment > 0 && current >= endValue) || (increment < 0 && current <= endValue)) {
        current = endValue;
        clearInterval(timer);
      }
      setCount(current);
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration, isInView]);
  
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M+';
    }
    return num.toFixed(decimals) + suffix;
  };

  return <span ref={ref}>{formatNumber(count)}</span>;
};


// --- Testimonial Data & Card (no changes) ---
const testimonials = [
    { name: "Alex Carter", title: "CFO, FinTech Solutions", avatar: "https://api.uifaces.co/api/v1/random?char_limit=1", quote: "VigilX caught a fraudulent transaction pattern we'd been missing for months. Incredibly powerful and deceptively simple." },
    { name: "Sarah Chen", title: "Lead Developer, E-comm Inc.", avatar: "https://api.uifaces.co/api/v1/random?char_limit=1", quote: "The integration was seamless. We were up and running, analyzing live data in an afternoon. The team loves it." },
    { name: "Mark Reynolds", title: "Head of Analytics", avatar: "https://api.uifaces.co/api/v1/random?char_limit=1", quote: "Finally! A fraud tool that's both powerful for analysts and simple for the rest of the team. The reporting is A+." },
    { name: "Jane Smith", title: "Risk & Compliance Officer", avatar: "https://api.uifaces.co/api/v1/random?char_limit=1", quote: "I've explored other tools. VigilX is on another level. The UI is clean, fast, and the AI is frighteningly accurate." }
];
const TestimonialCard = ({ quote, name, title, avatar }) => (
  <div className="flex-shrink-0 w-full max-w-sm bg-gray-900/50 border border-gray-800 rounded-2xl p-6 mx-4">
    <p className="text-gray-300 mb-4">"{quote}"</p>
    <div className="flex items-center">
      <img src={`${avatar}&name=${name}`} alt={name} className="w-10 h-10 rounded-full border-2 border-gray-700" />
      <div className="ml-3"><p className="font-semibold text-white">{name}</p><p className="text-sm text-gray-500">{title}</p></div>
    </div>
  </div>
);


// --- Main Enhanced Home Component ---
export default function Home() {
  // --- Effect for Scroll Animations ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <div className="bg-black text-gray-100 overflow-x-hidden relative">
      
      {/* ===== Persistent Background Effects (Z-0) ===== */}
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full filter blur-3xl opacity-70 animate-blob" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-[-20%] left-[20%] w-[400px] h-[400px] bg-blue-500/10 rounded-full filter blur-3xl opacity-70 animate-blob" style={{ animationDelay: '4s' }}></div>
          <div className="absolute bottom-[5%] right-[20%] w-[300px] h-[300px] bg-indigo-600/10 rounded-full filter blur-3xl opacity-70 animate-blob" style={{ animationDelay: '6s' }}></div>
          <div className="absolute inset-0 border border-blue-500/40 rounded-lg filter blur-lg animate-border-pulse"></div>
      </div>
      
      {/* ===== Section 1: Hero (Z-10) ===== */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6">
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.1)_0%,transparent_50%)]"></div>
        <div className="relative z-10 reveal visible">
          <h1 className="text-6xl md:text-8xl font-extrabold mb-6 tracking-tight text-white">
            <span className="block">Secure Every Transaction.</span>
            <span className="mt-4 block">Secure with <span className="text-blue-400">VigilX</span></span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
            Welcome to <span className="text-blue-400 font-semibold">VigilX</span>. Our AI models make your financial data truly secure and transparent.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/login" state={{ defaultIsLogin: false }} className="text-lg bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20 w-full sm:w-auto">
              Start Analyzing for Free
            </Link>
            <Link to="/KnowMe" className="text-lg bg-transparent border-2 border-blue-500 text-blue-400 hover:bg-blue-500/10 font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
              Know More
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Section 2: How It Works ===== */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-4xl mx-auto text-center reveal">
          <h2 className="text-5xl font-bold text-white mb-6">A Smarter Workflow, Not a Harder One</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-16">
            From raw data to actionable insights in three simple, automated steps.
          </p>
        </div>
        <div className="max-w-lg mx-auto md:max-w-4xl grid md:grid-cols-3 gap-12 md:gap-4 text-left">
          <div className="relative reveal" style={{ transitionDelay: '200ms' }}>
            <div className="relative z-10"><div className="flex items-center mb-4"><div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-900/50 border-2 border-blue-500/50 mr-4"><FaUpload className="text-blue-400" size={28}/></div><h3 className="text-3xl font-bold text-white">Upload</h3></div><p className="text-gray-400">Securely drag and drop your transaction files. Our system parses and prepares your data instantly.</p></div>
          </div>
          <div className="relative reveal" style={{ transitionDelay: '400ms' }}>
            <div className="relative z-10"><div className="flex items-center mb-4"><div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-900/50 border-2 border-blue-500/50 mr-4"><FaSearchDollar className="text-blue-400" size={28}/></div><h3 className="text-3xl font-bold text-white">Analyze</h3></div><p className="text-gray-400">Our AI model scans millions of data points for anomalies, flagging suspicious patterns in real-time.</p></div>
          </div>
          <div className="relative reveal" style={{ transitionDelay: '600ms' }}>
            <div className="relative z-10"><div className="flex items-center mb-4"><div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-900/50 border-2 border-blue-500/50 mr-4"><FaFileAlt className="text-blue-400" size={28}/></div><h3 className="text-3xl font-bold text-white">Act</h3></div><p className="text-gray-400">Receive a comprehensive report with visual insights, risk scores, and clear next steps to take action.</p></div>
          </div>
        </div>
      </section>

      {/* ===== Section 3: Stats Cards with Animated Counters ===== */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-left">
          <div className="bg-black border border-gray-800 rounded-2xl p-8 reveal">
            <h2 className="text-7xl font-bold text-blue-500 mb-3"><AnimatedCounter end={1400000} /></h2>
            <h3 className="text-2xl font-semibold text-white mt-2">Transactions Scanned</h3>
            <p className="text-gray-400 mt-2">Our AI processes millions of data points to find the needles in the haystack.</p>
          </div>
          <div className="bg-black border border-gray-800 rounded-2xl p-8 reveal" style={{ transitionDelay: '200ms' }}>
            <h2 className="text-7xl font-bold text-blue-500 mb-3"><AnimatedCounter end={99.8} decimals={1} suffix="%" /></h2>
            <h3 className="text-2xl font-semibold text-white mt-2">Detection Accuracy</h3>
            <p className="text-gray-400 mt-2">Fine-tuned models built to identify complex financial fraud patterns.</p>
          </div>
          <div className="bg-black border border-gray-800 rounded-2xl p-8 reveal" style={{ transitionDelay: '400ms' }}>
             <h2 className="text-7xl font-bold text-blue-500 mb-3">&lt; <AnimatedCounter end={5} duration={1.5} />s</h2>
            <h3 className="text-2xl font-semibold text-white mt-2">Instant Reporting</h3>
            <p className="text-gray-400 mt-2">Get actionable insights and comprehensive reports in seconds, not hours.</p>
          </div>
        </div>
      </section>

      {/* ===== Section 4: Launchpad CTA ===== */}
      <section className="relative z-10 py-32 px-6 glowing-grid-background">
        <div className="max-w-4xl mx-auto text-center reveal">
          <h2 className="text-5xl font-bold text-white mb-6">Enter the Fraud Detection Launchpad</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">Your journey to financial security starts here. Upload your data and let our AI provide instant, actionable insights.</p>
          <Link to="/FraudDetection" className="inline-flex items-center text-lg bg-white text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg relative overflow-hidden group">
            <span className="absolute left-0 top-0 h-full w-full bg-white/20 animate-shine group-hover:animate-none"></span>
            <FaPlayCircle className="mr-3" />Launch Tool
          </Link>
        </div>
      </section>
      
      {/* ===== Section 5: Testimonial Marquee ===== */}
      <section className="relative z-10 py-32 px-6 overflow-hidden">
        <div className="text-center reveal">
            <h2 className="text-5xl font-bold text-white mb-6">Trusted by Teams Worldwide</h2>
            <p className="text-lg text-gray-400 mb-16 max-w-2xl mx-auto">See what developers, analysts, and CFOs are saying about VigilX.</p> 
        </div>
        <div className="relative w-full overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)" }}>
          <div className="flex animate-scroll-slow">
            {[...testimonials, ...testimonials].map((item, index) => (<TestimonialCard key={index} quote={item.quote} name={item.name} title={item.title} avatar={item.avatar}/>))}
          </div>
        </div>
      </section>

    </div>
  );
};