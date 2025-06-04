import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
// import SignUpPage from './components/SignUpPage'; // Uncomment if you implement registration
import Footer from './components/Footer';

import TerminalChat from './components/TerminalChat';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('token'); // Check login status from token
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('token')); // Update login state when token changes
    };

    window.addEventListener('storage', handleStorageChange); // Listen for token changes
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          
          <Route path="/" element={<HomePage setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />} />
          <Route path="/saymellon" element={<LoginPage onLogin={setIsLoggedIn} />} />
	  {/*<Route path="/register" element={<SignUpPage />} />*/}
          
          <Route path="/terminal-chat" element={isLoggedIn ? <TerminalChat /> : <Navigate to="/saymellon" />} />
          
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;


