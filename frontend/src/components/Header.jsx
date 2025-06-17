import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function Header({
  isLoggedIn,
  setIsLoggedIn = null,
}) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full pt-0 z-20 bg-black border-b border-green-700">

      {/* Mobile: Hamburger Button */}
      <div className="sm:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="ml-1 px-4 py-2 rounded hover:bg-green-600"
        >
          ☰
        </button>
      </div>

      {/* Desktop: Full menu */}
      <div className="hidden sm:inline-block ml-1 align-middle">
        <button
          onClick={() => navigate('/')}
          className="ml-1 px-4 py-2 rounded hover:bg-green-600"
        >
          Home
        </button>
        <button
          onClick={() => navigate('/terminal-chat')}
          className="ml-1 px-4 py-2 rounded hover:bg-green-600"
          style={{ marginLeft: '4px' }}
        >
          Rhel Game
        </button>
      </div>
      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden absolute top-16 right-4 bg-gray-700 rounded shadow-md p-4 space-y-2 z-50 w-48">
          <button
            onClick={() => navigate('/')}
            className=" px-4 py-2 rounded hover:bg-green-600"
          >
            Home
          </button>
          <button
            onClick={() => handleNav('/terminal-chat')}
            className="block w-full text-left bg-purple-500 px-4 py-2 rounded hover:bg-purple-600"
          >
            Terminal Chat
          </button>
        </div>
      )}
    </header>
  );
}

Header.propTypes = {
  onAddEntryClick: PropTypes.func,
  onAddAudiobookClick: PropTypes.func,
  onAddSnippetClick: PropTypes.func,
  setIsLoggedIn: PropTypes.func,
};

export default Header;

