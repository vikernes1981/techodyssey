import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function UpdateAudiobookModal({ isOpen, onClose, onSave, audiobook }) {
  const [title, setTitle] = useState(audiobook.title);
  const [author, setAuthor] = useState(audiobook.author);
  const [description, setDescription] = useState(audiobook.description);
  const [url, setUrl] = useState(audiobook.url);
  const [source, setSource] = useState(audiobook.source);
  const [error, setError] = useState('');
  const titleRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    titleRef.current?.focus();
    setError('');
    setTitle(audiobook.title);
    setAuthor(audiobook.author);
    setDescription(audiobook.description);
    setUrl(audiobook.url);
    setSource(audiobook.source);

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, audiobook]);

  const handleSave = async () => {
    if (!title || !author || !description || !url || !source) {
      setError('Please fill in all fields.');
      return;
    }
    const updatedAudiobook = {
      title,
      author,
      description,
      url,
      source,
    };
    try {
      onSave(audiobook.id, updatedAudiobook);
      onClose();
    } catch (error) {
      setError('Error updating audiobook. Please try again.');
      console.error('Error updating audiobook:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="update-audiobook-modal-title"
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
        <h2 id="update-audiobook-modal-title" className="text-2xl font-bold mb-4 text-center text-gray-800">
          Update
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

UpdateAudiobookModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  audiobook: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
  }).isRequired,
};

export default UpdateAudiobookModal;
