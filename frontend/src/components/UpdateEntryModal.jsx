import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function UpdateEntryModal({ isOpen, onClose, onSave, entry = {} }) {
  const [title, setTitle] = useState(entry?.title || '');
  const [content, setContent] = useState(entry?.content || '');
  const [image, setImage] = useState(entry?.image || '');
  const [error, setError] = useState('');
  const titleRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;
    titleRef.current?.focus();
    setError('');
    setTitle(entry.title || '');
    setContent(entry.content || '');
    setImage(entry.image || '');

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, entry]);

  const handleSave = async () => {
    const API_URL = `${import.meta.env.VITE_API_BASE_URL}/entries/${entry.id}`;
    const updatedEntry = {};
    if (title !== entry.title) updatedEntry.title = title;
    if (content !== entry.content) updatedEntry.content = content;
    if (image !== entry.image) updatedEntry.image = image;

    if (Object.keys(updatedEntry).length === 0) {
      setError('No changes detected!');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updatedEntry),
      });

      if (!response.ok) {
        throw new Error('Failed to update entry');
      }

      const updatedPost = await response.json();
      onSave(updatedPost);
      onClose();
      navigate('/');
    } catch (error) {
      setError('Error updating post. Please try again.');
      console.error('Error updating post:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="update-entry-modal-title"
      tabIndex={-1}
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
    >
      <div className="modal-box relative w-11/12 max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <button
          type="button"
          aria-label="Close modal"
          className="absolute right-4 top-4 text-2xl text-gray-400 hover:text-gray-800"
          onClick={onClose}
        >
          ×
        </button>
        <h2 id="update-entry-modal-title" className="text-2xl font-bold mb-4 text-center text-gray-800">
          Update Entry
        </h2>
        {error && (
          <div role="alert" className="mb-2 text-red-500 font-semibold text-center">
            {error}
          </div>
        )}

        <div className="flex flex-col items-center gap-6">
          <div className="flex justify-center mb-4">
            <img
              src={image || 'https://via.placeholder.com/150'}
              alt="Post"
              className="w-40 h-40 rounded-md shadow-md object-cover border border-gray-300"
            />
          </div>

          <div className="form-control w-full">
            <label className="label text-lg font-medium text-gray-700">
              Title
            </label>
            <input
              ref={titleRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              className="border border-gray-300 rounded-lg p-3 w-full"
            />
          </div>

          <div className="form-control w-full">
            <label className="label text-lg font-medium text-gray-700">
              Content
            </label>
            <div className="border border-gray-300 rounded-lg overflow-hidden h-60 overflow-y-auto">
              <ReactQuill
                value={content}
                onChange={(value) => setContent(value)}
                theme="snow"
                className="h-full"
              />
            </div>
          </div>

          <div className="form-control w-full">
            <label className="label text-lg font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Enter image URL"
              className="border border-gray-300 rounded-lg p-3 w-full"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            type="button"
            aria-label="Cancel"
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

UpdateEntryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  entry: PropTypes.object
};

export default UpdateEntryModal;
