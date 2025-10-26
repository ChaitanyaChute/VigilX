import React, { useState, useEffect, useMemo } from 'react';
import { FaFileUpload, FaBrain, FaExclamationTriangle, FaTasks, FaShieldAlt, FaSearch, FaChevronLeft, FaChevronRight, FaFilePdf, FaFileCsv } from 'react-icons/fa';

const AnimatedCounter = ({ end, duration = 2, decimals = 0, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };  }, []);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const endValue = end;
    const range = endValue - start;
    let current = start;
    const increment = endValue > start ? 1 : -1;
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

  return <span ref={ref}>{prefix}{count.toFixed(decimals)}{suffix}</span>;
};

const mockTransactions = [
  { id: 'TXN7892K', amount: 9850.00, date: '2025-10-20', risk: 'High', reason: 'Unusual Geo-location' },
  { id: 'TXN3456L', amount: 120.50, date: '2025-10-20', risk: 'Low', reason: 'N/A' },
  { id: 'TXN8765M', amount: 3200.75, date: '2025-10-19', risk: 'Medium', reason: 'Time Anomaly' },
  { id: 'TXN1234N', amount: 49.99, date: '2025-10-19', risk: 'Low', reason: 'N/A' },
];

const riskStyles = {
  High: "bg-red-500/20 text-red-400 border border-red-500/30",
  Medium: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  Low: "bg-green-500/20 text-green-400 border border-green-500/30",
};

export default function FraudDetection() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisState, setAnalysisState] = useState('idle'); 
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showManualForm, setShowManualForm] = useState(false); 
  const [features, setFeatures] = useState(Array(30).fill(""));
  const [manualResult, setManualResult] = useState(""); 

  const itemsPerPage = 5;

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }, [analysisState]);

  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleAnalyze = () => {
    if (!file) return;
    setIsUploading(true);
    setUploadProgress(0);

    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsUploading(false);
          setAnalysisState('analyzing');
          setTimeout(() => setAnalysisState('success'), 2500);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const filteredTransactions = useMemo(() =>
    mockTransactions.filter(t => t.id.toLowerCase().includes(searchTerm.toLowerCase())),
    [searchTerm]
  );
  const paginatedTransactions = useMemo(() =>
    filteredTransactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [filteredTransactions, currentPage]
  );
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const handleFeatureChange = (index, value) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  const handleManualSubmit = async () => {
    try {
      const body = {};
      features.forEach((v, i) => {
        body[`feature${i + 1}`] = parseFloat(v || 0);
      });

      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      setManualResult(data.prediction === 1 ? "Fraudulent Transaction" : "Legitimate Transaction");
    } catch (error) {
      setManualResult("Error: Could not connect to backend");
    }
  };

  return (
    <div className="bg-black text-gray-100 overflow-x-hidden relative min-h-screen">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full filter blur-3xl opacity-50 animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>

<section className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] text-center px-6 pt-24">
  <div className="reveal visible w-full max-w-3xl">
    <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
      Fraud Detection <span className="text-blue-500">Launchpad</span>
    </h1>
    <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
      Upload your transaction file or manually enter data to detect potential fraud.
    </p>
    <div
      className="bg-gray-900/50 backdrop-blur-md border-2 border-dashed border-gray-700 rounded-2xl p-8 transition-all duration-300 hover:border-blue-500 hover:bg-gray-900/60"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {isUploading ? (
        <div className="w-full">
          <p className="text-lg font-semibold mb-4">Uploading...</p>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      ) : analysisState === "analyzing" ? (
        <div className="flex flex-col items-center justify-center">
          <FaBrain className="text-blue-500 text-5xl animate-pulse mb-4" />
          <p className="text-xl font-semibold text-white">
            AI is Analyzing...
          </p>
        </div>
      ) : (
        <>
          <FaFileUpload className="text-blue-500 text-5xl mx-auto mb-4" />
          <p className="text-xl font-semibold text-white">
            Drag & drop your file here
          </p>
          <p className="text-gray-500">or</p>
          <label
            htmlFor="file-upload"
            className="cursor-pointer text-blue-400 font-semibold hover:underline"
          >
            Browse files
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept=".csv,.xlsx"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
          {file && (
            <p className="mt-4 text-green-400">File selected: {file.name}</p>
          )}
        </>
      )}
    </div>
    <button
      onClick={handleAnalyze}
      disabled={!file || isUploading || analysisState === "analyzing"}
      className="mt-8 text-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed"
    >
      Upload & Analyze
    </button>
    <div className="flex items-center justify-center my-6">
      <div className="flex-grow border-t border-gray-700"></div>
      <span className="mx-4 text-gray-400 font-semibold">OR</span>
      <div className="flex-grow border-t border-gray-700"></div>
    </div>
    <button
      onClick={() => setShowManualForm(!showManualForm)}
      className="text-lg bg-gray-800 hover:bg-gray-700 text-blue-400 font-semibold px-8 py-3 rounded-lg transition-all duration-300"
    >
      {showManualForm ? "Hide Manual Entry" : "Enter Features Manually"}
    </button>
  </div>
  {showManualForm && (
    <div className="mt-10 bg-gray-900/60 border border-gray-800 rounded-2xl p-6 w-full max-w-2xl text-left">
      <h3 className="text-2xl font-semibold mb-4 text-white text-center">
        Manual Feature Entry
      </h3>

      <div className="grid grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto">
        {features.map((value, i) => (
          <input
            key={i}
            type="number"
            placeholder={`Feature ${i + 1}`}
            value={value}
            onChange={(e) => handleFeatureChange(i, e.target.value)}
            className="bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </div>

      <button
        onClick={handleManualSubmit}
        className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
      >
        Predict
      </button>

      {manualResult && (
        <p className="mt-4 text-center text-lg font-semibold text-yellow-400">
          {manualResult}
        </p>
      )}
    </div>
  )}
</section>
    </div>
  );
}
