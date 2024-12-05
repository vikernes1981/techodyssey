import React from 'react';
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

  const handleLogoutClick = () => {
    localStorage.removeItem('token'); // Remove token
    if (setIsLoggedIn) setIsLoggedIn(false); // Update authentication state
    navigate('/');
    window.location.reload();

  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <button
        onClick={() => navigate('/')}
        className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
      >
        Home
      </button>
      <div className="flex items-center space-x-4">
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
      </div>
    </header>
  );
}


Header.propTypes = {
  onAddEntryClick: PropTypes.func, // Optional: "Add Entry" button
  onAddAudiobookClick: PropTypes.func, // Optional: "Add Audiobook" button
  onAddSnippetClick: PropTypes.func, // Optional: "Add Snippet" button
  setIsLoggedIn: PropTypes.func, // Optional: Logout functionality
};

export default Header;

