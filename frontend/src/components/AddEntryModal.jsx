import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { createPost } from '../services/postService';

function AddEntryModal({ isOpen, onClose, onSave, entries }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const titleRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    titleRef.current?.focus();
    setError('');
    setTitle('');
    setDate('');
    setImage('');
    setContent('');
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Safely retrieve email from localStorage
  const loggedInUser = localStorage.getItem('loggedInUser');
  const email = loggedInUser ? JSON.parse(loggedInUser).email : null;

  const handleSave = async () => {
    if (!email) {
      setError('You must be logged in to save an entry.');
      return;
    }
    if (!title || !date || !content) {
      setError('Please fill in all fields');
      return;
    }
    const existingEntry = entries.find((entry) => entry.date === date);
    if (existingEntry) {
      setError('An entry for this date already exists. Please choose another date.');
      return;
    }
    const newEntry = { email, title, date, image, content };
    try {
      await createPost(newEntry);
      onSave(newEntry);
      onClose();
    } catch (error) {
      setError('An error occurred while saving the entry. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-entry-modal-title"
      tabIndex={-1}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg relative">
        <button
          type="button"
          aria-label="Close modal"
          className="absolute right-4 top-4 text-2xl text-gray-400 hover:text-gray-800"
          onClick={onClose}
        >
          ×
        </button>
        <h2 id="add-entry-modal-title" className="text-2xl font-bold mb-4 text-center text-gray-800">
          Add New Entry
        </h2>
        {error && (
          <div role="alert" className="mb-3 text-red-500 font-semibold text-center">
            {error}
          </div>
        )}
        <input
          ref={titleRef}
          type="text"
          placeholder="Title"
          className="border border-gray-300 rounded-lg p-3 w-full mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="date"
          className="border border-gray-300 rounded-lg p-3 w-full mb-4"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          className="border border-gray-300 rounded-lg p-3 w-full mb-4"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <textarea
          placeholder="Content"
          className="border border-gray-300 rounded-lg p-3 w-full mb-6"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            aria-label="Cancel"
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

AddEntryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  entries: PropTypes.array.isRequired,
};

export default AddEntryModal;
