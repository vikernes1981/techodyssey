import React, { useState, useEffect } from 'react';
import Header from './Header'; // Updated Header Component
import AudiobookList from './AudiobookList'; // Audiobook cards component
import AddAudiobookModal from './AddAudiobookModal'; // Add Audiobook modal

function AudiobookDashboard({ setIsLoggedIn }) {
  const [audiobooks, setAudiobooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setLocalLoggedIn] = useState(() => !!localStorage.getItem('token')); // Check token

  // Fetch audiobooks from the API
  useEffect(() => {
    const fetchAudiobooks = async () => {
      try {
        const response = await fetch('https://techodyssey.org/audiobooks/');
        if (!response.ok) {
          throw new Error('Failed to fetch audiobooks.');
        }
        const data = await response.json();
        setAudiobooks(data); // Set audiobooks from API
      } catch (error) {
        console.error('Failed to fetch audiobooks:', error);
      }
    };

    fetchAudiobooks();
  }, []);

  // Open and close modal handlers
  const handleAddAudiobookClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Save the new audiobook
  const handleSaveAudiobook = (newAudiobook) => {
    setAudiobooks([...audiobooks, newAudiobook]); // Add the new audiobook
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-600 to-black">
      {/* Updated Header Component */}
      <Header
        isLoggedIn={isLoggedIn}
        onAddAudiobookClick={isLoggedIn ? handleAddAudiobookClick : null} // Show "Add Audiobook" button
        setIsLoggedIn={isLoggedIn ? setIsLoggedIn : null} // Logout button only for logged-in users
      />

      {/* Audiobook List */}
      <div className="container mx-auto px-4 py-4">
        {audiobooks.length > 0 ? (
          <AudiobookList audiobooks={audiobooks} />
        ) : (
          <p className="text-center text-white text-lg">No audiobooks found. Start adding some!</p>
        )}
      </div>

      {/* Add Audiobook Modal */}
      {isModalOpen && (
        <AddAudiobookModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveAudiobook}
        />
      )}
    </div>
  );
}

export default AudiobookDashboard;

