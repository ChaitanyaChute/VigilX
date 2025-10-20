import React from 'react'; // We don't need useState for this setup
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import your components
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx'; // Assuming you have a Footer component
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';

function App() {
  // The 'count' state is not needed for routing, so it has been removed.

  return (
    <Router>
      {/* Navbar and Footer are outside of <Routes> so they appear on every page */}
      <Navbar />

      {/* The <main> tag can help with page structure and styling */}
      <main>
        <Routes>
          {/* Route for the homepage */}
          <Route path="/" element={<Home />} />

          {/* Route for the login/signup page */}
          <Route path="/login" element={<Login />} />

        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;