import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaFileUpload, FaBrain, FaExclamationTriangle, FaTasks, FaShieldAlt, FaSearch, FaChevronLeft, FaChevronRight, FaFilePdf, FaFileCsv } from 'react-icons/fa';

// --- Animated Counter Component (self-contained for this page) ---
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
      return () => { if (ref.current) observer.unobserve(ref.current) };
    }, []);
  
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

// --- Mock Data for the Transaction Table ---
const mockTransactions = [
    { id: 'TXN7892K', amount: 9850.00, date: '2025-10-20', risk: 'High', reason: 'Unusual Geo-location' },
    { id: 'TXN3456L', amount: 120.50, date: '2025-10-20', risk: 'Low', reason: 'N/A' },
    { id: 'TXN8765M', amount: 3200.75, date: '2025-10-19', risk: 'Medium', reason: 'Time Anomaly' },
    { id: 'TXN1234N', amount: 49.99, date: '2025-10-19', risk: 'Low', reason: 'N/A' },
    { id: 'TXN5678P', amount: 15000.00, date: '2025-10-18', risk: 'High', reason: 'Amount Exceeds Threshold' },
    { id: 'TXN9876Q', amount: 250.00, date: '2025-10-18', risk: 'Low', reason: 'N/A' },
    { id: 'TXN2345R', amount: 550.20, date: '2025-10-17', risk: 'Medium', reason: 'Frequency Spike' },
    { id: 'TXN6543S', amount: 89.90, date: '2025-10-17', risk: 'Low', reason: 'N/A' },
    { id: 'TXN1122T', amount: 7300.00, date: '2025-10-16', risk: 'High', reason: 'Unusual Geo-location' },
    { id: 'TXN3344U', amount: 450.00, date: '2025-10-16', risk: 'Low', reason: 'N/A' },
];

// --- Risk Level Styles ---
const riskStyles = {
    High: "bg-red-500/20 text-red-400 border border-red-500/30",
    Medium: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
    Low: "bg-green-500/20 text-green-400 border border-green-500/30",
};

// --- Main Fraud Detection Component ---
export default function FraudDetection() {
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [analysisState, setAnalysisState] = useState('idle'); // idle, analyzing, success
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // --- Scroll Animation Effect ---
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
    }, [analysisState]); // Re-run when analysis is complete

    // --- Drag and Drop Handlers ---
    const handleDragOver = (e) => e.preventDefault();
    const handleDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            setFile(files[0]);
        }
    };

    // --- Analysis Simulation Logic ---
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
                    // Simulate AI analysis time
                    setTimeout(() => setAnalysisState('success'), 2500);
                    return 100;
                }
                return prev + 10;
            });
        }, 150);
    };

    // --- Table Filtering and Pagination Logic ---
    const filteredTransactions = useMemo(() =>
        mockTransactions.filter(t => t.id.toLowerCase().includes(searchTerm.toLowerCase())),
        [searchTerm]
    );
    const paginatedTransactions = useMemo(() =>
        filteredTransactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
        [filteredTransactions, currentPage]
    );
    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

    return (
        <div className="bg-black text-gray-100 overflow-x-hidden relative min-h-screen">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full filter blur-3xl opacity-50 animate-blob" style={{ animationDelay: '4s' }}></div>
            </div>

            {/* ===== 1. Upload & Analyze Section ===== */}
            <section className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] text-center px-6 pt-24">
                <div className="reveal visible w-full max-w-3xl">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
                        Fraud Detection <span className="text-blue-500">Launchpad</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
                        Upload your transaction file to let VigilX analyze and detect potential fraud patterns using our AI-powered system.
                    </p>
                    <div 
                        className="bg-gray-900/50 backdrop-blur-md border-2 border-dashed border-gray-700 rounded-2xl p-8 transition-all duration-300 hover:border-blue-500 hover:bg-gray-900/60"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >
                        {isUploading ? (
                            <div className="w-full">
                                <p className="text-lg font-semibold mb-4">Uploading...</p>
                                <div className="w-full bg-gray-700 rounded-full h-2.5"><div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div></div>
                            </div>
                        ) : analysisState === 'analyzing' ? (
                            <div className="flex flex-col items-center justify-center">
                                <FaBrain className="text-blue-500 text-5xl animate-pulse mb-4" />
                                <p className="text-xl font-semibold text-white">AI is Analyzing...</p>
                                <p className="text-gray-400">This may take a moment.</p>
                            </div>
                        ) : (
                            <>
                                <FaFileUpload className="text-blue-500 text-5xl mx-auto mb-4" />
                                <p className="text-xl font-semibold text-white">Drag & drop your file here</p>
                                <p className="text-gray-500">or</p>
                                <label htmlFor="file-upload" className="cursor-pointer text-blue-400 font-semibold hover:underline">
                                    Browse files
                                    <input id="file-upload" type="file" className="hidden" accept=".csv,.xlsx" onChange={e => setFile(e.target.files[0])} />
                                </label>
                                {file && <p className="mt-4 text-green-400">File selected: {file.name}</p>}
                            </>
                        )}
                    </div>
                    <p className="text-xs text-gray-600 mt-4">We never store your data. All processing is secure.</p>
                    <button 
                        onClick={handleAnalyze} 
                        disabled={!file || isUploading || analysisState === 'analyzing'}
                        className="mt-8 text-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed"
                    >
                        Upload & Analyze
                    </button>
                </div>
            </section>

            {analysisState === 'success' && (
                <>
                    {/* ===== 2. AI Summary Dashboard ===== */}
                    <section className="relative z-10 py-24 px-6 reveal">
                        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
                            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 text-center hover:-translate-y-2 transition-transform duration-300"><FaBrain className="text-blue-400 text-3xl mx-auto mb-3" /><h3 className="text-lg text-gray-400 mb-2">AI Confidence</h3><p className="text-4xl font-bold text-white"><AnimatedCounter end={98.7} decimals={1} suffix="%" /></p></div>
                            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 text-center hover:-translate-y-2 transition-transform duration-300"><FaExclamationTriangle className="text-red-400 text-3xl mx-auto mb-3" /><h3 className="text-lg text-gray-400 mb-2">Suspicious</h3><p className="text-4xl font-bold text-red-400"><AnimatedCounter end={3} /></p></div>
                            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 text-center hover:-translate-y-2 transition-transform duration-300"><FaTasks className="text-green-400 text-3xl mx-auto mb-3" /><h3 className="text-lg text-gray-400 mb-2">Total Analyzed</h3><p className="text-4xl font-bold text-green-400"><AnimatedCounter end={10} /></p></div>
                            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 text-center hover:-translate-y-2 transition-transform duration-300"><FaShieldAlt className="text-yellow-400 text-3xl mx-auto mb-3" /><h3 className="text-lg text-gray-400 mb-2">Avg. Risk Score</h3><p className="text-4xl font-bold text-yellow-400"><AnimatedCounter end={42} suffix=" / 100" /></p></div>
                        </div>
                    </section>

                    {/* ===== 3. Detailed Transaction Table ===== */}
                    <section className="relative z-10 py-24 px-6 reveal">
                        <div className="max-w-7xl mx-auto">
                            <h2 className="text-4xl font-bold text-center text-white mb-10">Detailed Transaction Analysis</h2>
                            <div className="relative mb-4"><FaSearch className="absolute top-3.5 left-4 text-gray-500" /><input type="text" placeholder="Search by Transaction ID..." onChange={e => setSearchTerm(e.target.value)} className="w-full bg-gray-900/50 border border-gray-800 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
                            <div className="overflow-x-auto bg-gray-900/50 border border-gray-800 rounded-2xl">
                                <table className="w-full text-left">
                                    <thead className="border-b border-gray-800"><tr className="text-sm text-gray-400"><th className="p-4">Transaction ID</th><th className="p-4">Amount</th><th className="p-4">Date</th><th className="p-4">Risk Level</th><th className="p-4">Flag Reason</th></tr></thead>
                                    <tbody>{paginatedTransactions.map(t => (<tr key={t.id} className="border-b border-gray-800/50 hover:bg-gray-800/40 transition-colors"><td className="p-4 font-mono">{t.id}</td><td className="p-4">${t.amount.toFixed(2)}</td><td className="p-4">{t.date}</td><td className="p-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${riskStyles[t.risk]}`}>{t.risk}</span></td><td className="p-4">{t.reason}</td></tr>))}</tbody>
                                </table>
                            </div>
                            <div className="flex justify-between items-center mt-4 text-sm text-gray-400"><p>Showing {paginatedTransactions.length} of {filteredTransactions.length} results</p><div className="flex items-center gap-2"><button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-md hover:bg-gray-800 disabled:opacity-50"><FaChevronLeft /></button><span>Page {currentPage} of {totalPages}</span><button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-md hover:bg-gray-800 disabled:opacity-50"><FaChevronRight /></button></div></div>
                        </div>
                    </section>

                    {/* ===== 4. Visualization & Insights ===== */}
                    <section className="relative z-10 py-24 px-6 reveal">
                        <div className="max-w-7xl mx-auto text-center">
                            <h2 className="text-4xl font-bold text-white mb-4">See Where Your Vulnerabilities Lie</h2>
                            <p className="text-lg text-gray-500 mb-12">Visual distribution of suspicious activity.</p>
                            <div className="grid md:grid-cols-2 gap-12">
                                <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8"><h3 className="text-2xl font-semibold mb-6">Fraud vs Non-Fraud</h3><div className="w-48 h-48 mx-auto rounded-full flex items-center justify-center bg-conic-gradient from-red-500 from-0% to-red-500 to-30% via-green-500 via-30% to-green-500 to-100%"><div className="w-32 h-32 bg-gray-900 rounded-full"></div></div><div className="flex justify-center gap-6 mt-6 text-sm"><div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div><span>Suspicious (30%)</span></div><div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500"></div><span>Normal (70%)</span></div></div></div>
                                <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8"><h3 className="text-2xl font-semibold mb-6">Risk by Reason</h3><div className="flex justify-around items-end h-48 space-x-4"><div className="flex flex-col items-center gap-2 w-full"><div className="w-full bg-red-500 rounded-t-lg" style={{ height: '80%' }}></div><p className="text-xs text-gray-400">Geo-location</p></div><div className="flex flex-col items-center gap-2 w-full"><div className="w-full bg-yellow-500 rounded-t-lg" style={{ height: '40%' }}></div><p className="text-xs text-gray-400">Time Anomaly</p></div><div className="flex flex-col items-center gap-2 w-full"><div className="w-full bg-red-500 rounded-t-lg" style={{ height: '60%' }}></div><p className="text-xs text-gray-400">Amount</p></div><div className="flex flex-col items-center gap-2 w-full"><div className="w-full bg-yellow-500 rounded-t-lg" style={{ height: '30%' }}></div><p className="text-xs text-gray-400">Frequency</p></div></div></div>
                            </div>
                        </div>
                    </section>

                    {/* ===== 5. Report & Export Section ===== */}
                    <section className="relative z-10 py-24 px-6 reveal">
                        <div className="max-w-2xl mx-auto text-center bg-gray-900/50 border border-gray-800 rounded-2xl p-12">
                            <h2 className="text-4xl font-bold text-white mb-4">Your Analysis is Complete</h2>
                            <p className="text-lg text-gray-400 mb-8">Download a full PDF report or export the raw data for your records.</p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <button className="inline-flex items-center justify-center text-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"><FaFilePdf className="mr-3" />Download Report (PDF)</button>
                                <button className="inline-flex items-center justify-center text-lg bg-gray-700 hover:bg-gray-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"><FaFileCsv className="mr-3" />Export Data (CSV)</button>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </div>
    );
}