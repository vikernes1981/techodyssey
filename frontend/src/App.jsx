import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import Footer from './components/Footer';

import TerminalChat from './components/TerminalChat';

function App() {

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/terminal-chat" element={<TerminalChat />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;


