import { useState, useEffect } from 'react';
import Header from './Header';
import EntryList from './EntryList';
import AddEntryModal from './AddEntryModal';
import { getPosts } from '../services/postService';

function HomePage({ setIsLoggedIn, isLoggedIn }) {
  const [entries, setEntries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts(); // Fetch posts using postService
        setEntries(data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleAddEntryClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSaveEntry = (entry) => {
    setEntries([...entries, entry]);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-gray-600 to-black">
      <Header
        isLoggedIn={isLoggedIn}
        onAddEntryClick={isLoggedIn ? handleAddEntryClick : null} // "Add Entry" button only for logged-in users
        setIsLoggedIn={isLoggedIn ? setIsLoggedIn : null} // Logout button only for logged-in users
      />
      <EntryList entries={entries} />
      {isModalOpen && (
        <AddEntryModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveEntry}
          entries={entries}
        />
      )}
    </div>
  );
}

export default HomePage;

