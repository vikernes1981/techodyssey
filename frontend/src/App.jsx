import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
// import SignUpPage from './components/SignUpPage';
import CreatePostPage from './components/CreatePostPage';
import PostDetailsPage from './components/PostDetailsPage';
import Footer from './components/Footer';
import SnippetsPage from './components/SnippetsPage';
import AudiobookDashboard from './components/AudiobookDashboard';
import AudiobookDetailsPage from './components/AudiobookDetailsPage';
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
          {/* Keep all other routes exactly the way you had them */}
          <Route path="/" element={<HomePage setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />} />
          <Route path="/saymellon" element={<LoginPage onLogin={setIsLoggedIn} />} />
	  {/*<Route path="/register" element={<SignUpPage />} />*/}
          <Route path="/create" element={isLoggedIn ? <CreatePostPage /> : <Navigate to="/login" />} />
          <Route path="/entries/:id" element={<PostDetailsPage />} />
          <Route path="/snippets" element={isLoggedIn ? <SnippetsPage /> : <Navigate to="/login" />} />
          <Route path="/terminal-chat" element={isLoggedIn ? <TerminalChat /> : <Navigate to="/saymellon" />} />
          <Route
            path="/audiobooks"
            element={
              <AudiobookDashboard
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path="/audiobooks/:id"
            element={
              <AudiobookDetailsPage
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={isLoggedIn}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;


