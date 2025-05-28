import React, { useState } from 'react';

function AddAudiobookModal({ isOpen, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [source, setSource] = useState('');

  const handleAdd = async () => {
    const newAudiobook = { title, author, description, url, source };

    try {
      const response = await fetch('https://techodyssey.org/audiobooks/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'},
        body: JSON.stringify(newAudiobook),
      });

      if (!response.ok) {
        throw new Error('Failed to add audiobook');
      }

      const addedAudiobook = await response.json();
      onSave(addedAudiobook); // Pass the new audiobook back to the parent
    } catch (error) {
      console.error('Error adding audiobook:', error);
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="modal-box relative w-11/12 max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <button
          className="btn btn-sm btn-circle absolute right-4 top-4 hover:bg-red-500"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Add New Audiobook</h2>

        <div className="flex flex-col items-center gap-6">
          <div className="form-control w-full">
            <label className="label text-lg font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter audiobook title"
              className="input input-bordered w-full border-2 border-gray-300 focus:border-blue-500"
            />
          </div>

          <div className="form-control w-full">
            <label className="label text-lg font-medium text-gray-700">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter author name"
              className="input input-bordered w-full border-2 border-gray-300 focus:border-blue-500"
            />
          </div>

          <div className="form-control w-full">
            <label className="label text-lg font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter audiobook description"
              className="textarea textarea-bordered w-full border-2 border-gray-300 focus:border-blue-500"
            />
          </div>

          <div className="form-control w-full">
            <label className="label text-lg font-medium text-gray-700">URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter audiobook URL"
              className="input input-bordered w-full border-2 border-gray-300 focus:border-blue-500"
            />
          </div>

          <div className="form-control w-full">
            <label className="label text-lg font-medium text-gray-700">Source</label>
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="Enter source (e.g., YouTube, Audible)"
              className="input input-bordered w-full border-2 border-gray-300 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-4">
          <button
            onClick={onClose}
            className="btn btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="btn bg-blue-500 text-white hover:bg-blue-700"
          >
            Add Audiobook
          </button>
        </div>
      </div>
    </div>
  ) : null;
}

export default AddAudiobookModal;

