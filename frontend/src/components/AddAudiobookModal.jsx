import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function AddAudiobookModal({ isOpen, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [source, setSource] = useState('');
  const [error, setError] = useState('');
  const titleRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    titleRef.current?.focus();
    setError('');
    setTitle('');
    setAuthor('');
    setDescription('');
    setUrl('');
    setSource('');
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSave = async () => {
    if (!title || !author || !description || !url || !source) {
      setError('Please fill in all fields.');
      return;
    }
    const newAudiobook = { title, author, description, url, source };
    try {
      // If you want to POST here, do so. Otherwise just call onSave.
      onSave(newAudiobook);
      onClose();
    } catch (error) {
      setError('Error adding audiobook. Please try again.');
      console.error('Error adding audiobook:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-audiobook-modal-title"
      tabIndex={-1}
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
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
        <h2 id="add-audiobook-modal-title" className="text-2xl font-bold mb-4 text-center text-gray-800">
          Add
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full mb-4"
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full mb-4"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full mb-4"
        />
        <input
          type="text"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full mb-4"
        />
        <input
          type="text"
          placeholder="Source (e.g., YouTube, Audible)"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full mb-6"
        />
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

AddAudiobookModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default AddAudiobookModal;
