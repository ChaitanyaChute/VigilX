import React from 'react';

// --- SVG Icon for the CTA button ---
const ArrowRightIcon = () => (
    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
);

// --- A simplified, non-interactive Dashboard Preview component ---
const DashboardPreview = () => (
    <div className="w-full max-w-5xl mx-auto mt-20 p-1.5 rounded-2xl bg-gradient-to-b from-gray-700/50 to-transparent">
        <div className="bg-black/80 backdrop-blur-xl rounded-xl border border-gray-800/80 shadow-2xl shadow-blue-500/10">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800/80">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-sm text-gray-400">VigilX Dashboard</div>
                <div></div>
            </div>
            {/* Body */}
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Stat Card */}
                    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800/80">
                        <p className="text-sm text-gray-400">Transactions Scanned</p>
                        <p className="text-2xl font-bold text-white">1,402,199</p>
                    </div>
                    {/* Stat Card */}
                    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800/80">
                        <p className="text-sm text-gray-400">Suspicious Activity</p>
                        <p className="text-2xl font-bold text-blue-400">9,241</p>
                    </div>
                    {/* Stat Card */}
                    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800/80">
                        <p className="text-sm text-gray-400">Threats Prevented</p>
                        <p className="text-2xl font-bold text-green-400">1,056</p>
                    </div>
                </div>
                {/* Fake Chart */}
                <div className="mt-6 bg-gray-900/50 h-48 rounded-lg border border-gray-800/80 flex items-end p-4">
                    <div className="w-1/6 h-1/3 bg-blue-500/50 rounded-t-sm"></div>
                    <div className="w-1/6 h-2/3 bg-blue-500/50 rounded-t-sm ml-2"></div>
                    <div className="w-1G h-1/2 bg-blue-500/50 rounded-t-sm ml-2"></div>
                    <div className="w-1/6 h-3/4 bg-blue-500/50 rounded-t-sm ml-2"></div>
                    <div className="w-1/6 h-1/4 bg-blue-500/50 rounded-t-sm ml-2"></div>
                    <div className="w-1/6 h-2/5 bg-blue-500/50 rounded-t-sm ml-2"></div>
                </div>
            </div>
        </div>
    </div>
);

export default function Home() {
    return (
        <main className="relative px-4 pt-24 pb-24 sm:pt-24 lg:pt-32 text-center min-h-screen overflow-hidden">
            {/* Window Boundary Highlighter */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 border border-blue-500/40 rounded-lg filter blur-lg animate-border-pulse"></div>
            </div>

            {/* Glowing Moving Blobs */}
            <div 
              className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full filter blur-3xl opacity-60 animate-blob mix-blend-screen" 
              style={{ animationDelay: '0s' }}
            ></div>
            <div 
              className="absolute top-1/2 right-1/4 w-[350px] h-[350px] bg-purple-600/10 rounded-full filter blur-3xl opacity-60 animate-blob mix-blend-screen" 
              style={{ animationDelay: '2s' }}
            ></div>
            <div 
              className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-indigo-600/10 rounded-full filter blur-3xl opacity-60 animate-blob mix-blend-screen" 
              style={{ animationDelay: '4s' }}
            ></div>

            {/* Content (Must have z-10 to be on top of blobs) */}
            <div className="relative z-10 max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
                    Fraud Detection with{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                        Precision
                    </span>
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-300">
                    Effortlessly streamline your financial security. Analyze, detect, and prevent fraudulent transactions all in one place.
                </p>
                <div className="mt-8">
                    <a
                        href="#"
                        className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-500/20"
                    >
                        Start Analyzing for Free
                        <ArrowRightIcon />
                    </a>
                </div>
            </div>

            {/* Dashboard Preview (Must also have z-10) */}
            <div className="relative z-10">
                <DashboardPreview />
            </div>
        </main>
    );
};