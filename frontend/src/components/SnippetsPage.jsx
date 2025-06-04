import React, { useState, useEffect } from 'react';
import SnippetList from './SnippetList';
import AddSnippetModal from './AddSnippetModal';
import UpdateSnippetModal from './UpdateSnippetModal'; // Import UpdateSnippetModal
import { getSnippets, deleteSnippet, updateSnippet } from '../services/snippetService';
import Header from './Header';

function SnippetsPage() {
  const [snippets, setSnippets] = useState([]);
  const [filteredSnippets, setFilteredSnippets] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentSnippet, setCurrentSnippet] = useState(null); // Track snippet being edited
  const [searchTerm, setSearchTerm] = useState(''); // Search term state
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('token')); // Initialize isLoggedIn

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const data = await getSnippets();
        const normalizedData = data.map((snippet) => ({
          ...snippet,
          id: Number(snippet.id), // Convert `id` to a number
        }));
        setSnippets(normalizedData);
        setFilteredSnippets(normalizedData); // Initially display all snippets
      } catch (error) {
        console.error('Failed to fetch snippets:', error);
      }
    };
    fetchSnippets();
  }, []);

  useEffect(() => {
    // Filter snippets based on search term
    const filtered = snippets.filter(
      (snippet) =>
        snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        snippet.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (snippet.language || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (Array.isArray(snippet.tags)
          ? snippet.tags.join(', ')
          : snippet.tags || ''
        )
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
    setFilteredSnippets(filtered);
  }, [searchTerm, snippets]); // Re-run whenever search term or snippets list changes

  const handleAddSnippet = (newSnippet) => {
    const normalizedSnippet = { ...newSnippet, id: Number(newSnippet.id) }; // Ensure `id` is a number
    setSnippets([...snippets, normalizedSnippet]);
    setFilteredSnippets([...snippets, normalizedSnippet]);
    setIsAddModalOpen(false);
  };

  const handleUpdateSnippet = async (id, updatedSnippet) => {
    try {
      const updatedData = await updateSnippet(id, updatedSnippet);
      const normalizedData = { ...updatedData, id: Number(updatedData.id) }; // Ensure `id` is a number
      const updatedSnippets = snippets.map((snippet) =>
        snippet.id === id ? normalizedData : snippet
      );
      setSnippets(updatedSnippets);
      setFilteredSnippets(updatedSnippets);
    } catch (error) {
      console.error('Failed to update snippet:', error);
    }
  };

  const handleDeleteSnippet = async (id) => {
    try {
      await deleteSnippet(id);
      const updatedSnippets = snippets.filter((snippet) => snippet.id !== id);
      setSnippets(updatedSnippets);
      setFilteredSnippets(updatedSnippets);
    } catch (error) {
      console.error('Failed to delete snippet:', error);
    }
  };

  const handleAddSnippetClick = () => setIsAddModalOpen(true); // Open Add Snippet Modal

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-600 to-black p-6">
      <Header
        isLoggedIn={isLoggedIn}
        onAddSnippetClick={isLoggedIn ? handleAddSnippetClick : null}
        setIsLoggedIn={setIsLoggedIn ? setIsLoggedIn : null}
      />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl text-white font-bold">Snippets</h1>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2 mb-6">
        <input
          type="text"
          placeholder="🔍 Search snippets by title, code, language, or tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
          className="input input-bordered w-3/4 bg-gray-800 text-white placeholder-gray-400"
        />
        <button
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          onClick={() => setSearchTerm('')} // Clear search when clicked
        >
          Clear
        </button>
      </div>

      {/* Snippet List */}
      <SnippetList
        snippets={filteredSnippets}
        onEdit={(snippet) => {
          setCurrentSnippet(snippet);
          setIsEditModalOpen(true);
        }}
        onDelete={handleDeleteSnippet}
      />

      {isAddModalOpen && (
        <AddSnippetModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddSnippet}
        />
      )}

      {/* Update Snippet Modal */}
      {isEditModalOpen && currentSnippet && (
        <UpdateSnippetModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          snippet={currentSnippet}
          onSave={handleUpdateSnippet}
        />
      )}
    </div>
  );
}

export default SnippetsPage;

