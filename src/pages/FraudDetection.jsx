import React, { useState } from "react";
import { FaFileUpload } from "react-icons/fa";

export default function FraudDetection() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fraudCount, setFraudCount] = useState(null);
  const [fraudTransactions, setFraudTransactions] = useState([]);
  const [totalTransactions, setTotalTransactions] = useState(null);
  const [showFraudList, setShowFraudList] = useState(false);
  const [showManualForm, setShowManualForm] = useState(false);
  const [features, setFeatures] = useState(Array(30).fill(""));
  const [manualResult, setManualResult] = useState("");

  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setIsUploading(true);
    setUploadProgress(0);

    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 150);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://127.0.0.1:8000/predict_csv", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setIsUploading(false);

      if (data.error) {
        alert("Error: " + data.error);
      } else {
        setFraudCount(data.fraud_count);
        setFraudTransactions(data.fraud_transactions);
        setTotalTransactions(data.total); 
      }
    } catch (error) {
      setIsUploading(false);
      alert("Error connecting to backend");
    }
  };

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
      setManualResult(
        data.prediction === 1
          ? "Fraudulent Transaction"
          : " Legitimate Transaction"
      );
    } catch (error) {
      setManualResult("❌ Error: Could not connect to backend");
    }
  };

  return (
    <div className="bg-black text-gray-100 overflow-x-hidden relative min-h-screen">
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] text-center px-6 pt-24">
        <div className="w-full max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
            Fraud Detection <span className="text-blue-500">Launchpad</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
            Upload a transaction CSV file or manually enter features to detect
            potential fraud.
          </p>

          <div
            className="bg-gray-900/50 border-2 border-dashed border-gray-700 rounded-2xl p-8 hover:border-blue-500 hover:bg-gray-900/60 transition-all"
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
                    accept=".csv"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </label>
                {file && (
                  <p className="mt-4 text-green-400">
                    File selected: {file.name}
                  </p>
                )}
              </>
            )}
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!file || isUploading}
            className="mt-8 text-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            Upload & Analyze
          </button>

          {fraudCount !== null && (
            <div className="mt-10 bg-gray-900/60 border border-gray-800 rounded-2xl p-6 w-full max-w-2xl">
              <h3 className="text-2xl font-semibold mb-4 text-white">
                Analysis Results
              </h3>
              <p className="text-lg text-gray-300">
                Total Transactions:{" "}
                <span className="text-white font-bold">
                  {totalTransactions + 1 ?? "N/A"}
                </span>
              </p>
              <p className="text-lg text-red-400 font-semibold">
                Fraudulent Transactions: {fraudCount}
              </p>

              {fraudCount > 0 && (
                <button
                  onClick={() => setShowFraudList(!showFraudList)}
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition"
                >
                  {showFraudList
                    ? "Hide Fraud Transactions"
                    : "View Fraud Transactions"}
                </button>
              )}

              {showFraudList && (
                <div className="mt-4 max-h-[300px] overflow-y-auto bg-gray-800/50 p-4 rounded-lg text-left">
                  {fraudTransactions.length === 0 ? (
                    <p className="text-gray-400">
                      No fraud transactions found.
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {fraudTransactions.map((txn, idx) => (
                        <li
                          key={idx}
                          className="border border-red-500/40 bg-red-500/10 text-red-300 rounded-lg px-4 py-2"
                        >
                          {JSON.stringify(txn)}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          )}

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
                    onChange={(e) =>
                      handleFeatureChange(i, e.target.value)
                    }
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
        </div>
      </section>
    </div>
  );
}
