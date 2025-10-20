import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation

// --- SVG Icon for Google Login ---
const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

export default function Login() {
  // --- UPDATED STATE INITIALIZATION ---
  const location = useLocation();
  // Read the state from the link, default to 'true' (login) if not provided.
  const defaultIsLogin = location.state?.defaultIsLogin !== false;
  const [isLogin, setIsLogin] = useState(defaultIsLogin);
  // --- END OF UPDATE ---

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 py-12">
      <div className="w-full max-w-md">
        
        {/* Form Container */}
        <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-2xl shadow-2xl shadow-blue-500/10 p-8">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white">
                    {isLogin ? 'Welcome back' : 'Create an Account'}
                </h1>
                <p className="text-gray-400 mt-2">
                    {isLogin ? 'Enter your credentials to access your account' : 'Fill in the details below to get started'}
                </p>
            </div>

            {/* Login/Sign Up Form */}
            <form className="space-y-6">
                {/* --- Fields for Sign Up only --- */}
                {!isLogin && (
                    <>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                            <input 
                                type="text" 
                                id="name"
                                placeholder="John Doe"
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            />
                        </div>
                    </>
                )}

                {/* --- Fields for Both --- */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input 
                        type="email" 
                        id="email"
                        placeholder="m@example.com"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>
                
                {/* --- Field for Sign Up only --- */}
                {!isLogin && (
                     <div>
                        <label htmlFor="otp" className="block text-sm font-medium text-gray-300 mb-2">OTP</label>
                        <input 
                            type="text" 
                            id="otp"
                            placeholder="Enter the 6-digit code"
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        />
                    </div>
                )}

                <div>
                    <div className="flex justify-between items-center mb-2">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                      {isLogin && <a href="#" className="text-sm text-blue-500 hover:underline">Forgot password?</a>}
                    </div>
                    <input 
                        type="password" 
                        id="password"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>
                
                {/* --- Field for Sign Up only --- */}
                 {!isLogin && (
                     <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                        <input 
                            type="password" 
                            id="confirm-password"
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        />
                    </div>
                )}


                <div>
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300">
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>
                </div>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
                <hr className="flex-grow border-gray-700" />
                <span className="mx-4 text-gray-500 text-sm">Or</span>
                <hr className="flex-grow border-gray-700" />
            </div>

            {/* Social Login Button */}
            <div>
                <button className="w-full flex items-center justify-center py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-300 font-semibold border border-gray-700">
                    <GoogleIcon />
                    Continue with Google
                </button>
            </div>

            {/* Toggle Form Link */}
            <p className="text-center text-gray-400 mt-8">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button onClick={toggleForm} className="text-blue-500 hover:underline font-semibold ml-2 bg-transparent border-none cursor-pointer">
                    {isLogin ? 'Sign up' : 'Sign in'}
                </button>
            </p>
        </div>
      </div>
    </div>
  );
}