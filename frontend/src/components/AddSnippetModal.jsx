import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { createSnippet } from '../services/snippetService';

function AddSnippetModal({ isOpen, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');
  const titleRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    titleRef.current?.focus();
    setError('');
    setTitle('');
    setCode('');
    setLanguage('');
    setTags('');
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSave = async () => {
    if (!title || !code) {
      setError("Title and code are required.");
      return;
    }
    try {
      const newSnippet = await createSnippet({ title, code, language, tags });
      onSave(newSnippet);
      onClose();
    } catch (error) {
      setError('Failed to create snippet.');
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-snippet-modal-title"
      tabIndex={-1}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
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
        <h2 id="add-snippet-modal-title" className="text-2xl font-bold mb-4 text-center text-gray-800">
          Add New Snippet
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
        <textarea
          placeholder="Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full mb-4"
        />
        <input
          type="text"
          placeholder="Language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full mb-4"
        />
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
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

AddSnippetModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default AddSnippetModal;
