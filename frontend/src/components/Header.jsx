import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function Header({
  isLoggedIn,
  onAddEntryClick = null,
  onAddAudiobookClick = null,
  onAddSnippetClick = null,
  setIsLoggedIn = null,
}) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    if (setIsLoggedIn) setIsLoggedIn(false);
    navigate('/');
    window.location.reload();
  };

  const handleNav = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white relative">
      <button
        onClick={() => navigate('/')}
        className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
      >
        Home
      </button>

      {/* Mobile: Hamburger Button */}
      <div className="sm:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white focus:outline-none text-xl"
        >
          ☰
        </button>
      </div>

      {/* Desktop: Full menu */}
      <div className="hidden sm:flex items-center space-x-4">
        {isLoggedIn && onAddEntryClick && (
          <button
            onClick={onAddEntryClick}
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Entry
          </button>
        )}
        {isLoggedIn && onAddAudiobookClick && (
          <button
            onClick={onAddAudiobookClick}
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Audiobook
          </button>
        )}
        {isLoggedIn && onAddSnippetClick && (
          <button
            onClick={onAddSnippetClick}
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Snippet
          </button>
        )}
        {isLoggedIn && (
          <button
            onClick={handleLogoutClick}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}
        {isLoggedIn && (
          <button
            onClick={() => navigate('/snippets')}
            className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600"
          >
            Snippets
          </button>
        )}
        <button
          onClick={() => navigate('/audiobooks')}
          className="bg-orange-500 px-4 py-2 rounded hover:bg-yellow-600"
        >
          Audiobooks
        </button>
        {isLoggedIn && (
          <button
            onClick={() => navigate('/terminal-chat')}
            className="bg-purple-500 px-4 py-2 rounded hover:bg-purple-600"
          >
            Terminal Chat
          </button>
        )}
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden absolute top-16 right-4 bg-gray-700 rounded shadow-md p-4 space-y-2 z-50 w-48">
          {isLoggedIn && onAddEntryClick && (
            <button
              onClick={() => {
                onAddEntryClick();
                setMenuOpen(false);
              }}
              className="block w-full text-left bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Entry
            </button>
          )}
          {isLoggedIn && onAddAudiobookClick && (
            <button
              onClick={() => {
                onAddAudiobookClick();
                setMenuOpen(false);
              }}
              className="block w-full text-left bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Audiobook
            </button>
          )}
          {isLoggedIn && onAddSnippetClick && (
            <button
              onClick={() => {
                onAddSnippetClick();
                setMenuOpen(false);
              }}
              className="block w-full text-left bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Snippet
            </button>
          )}
          {isLoggedIn && (
            <button
              onClick={handleLogoutClick}
              className="block w-full text-left bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          )}
          {isLoggedIn && (
            <button
              onClick={() => handleNav('/snippets')}
              className="block w-full text-left bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600"
            >
              Snippets
            </button>
          )}
          <button
            onClick={() => handleNav('/audiobooks')}
            className="block w-full text-left bg-orange-500 px-4 py-2 rounded hover:bg-yellow-600"
          >
            Audiobooks
          </button>
          {isLoggedIn && (
            <button
              onClick={() => handleNav('/terminal-chat')}
              className="block w-full text-left bg-purple-500 px-4 py-2 rounded hover:bg-purple-600"
            >
              Terminal Chat
            </button>
          )}
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

