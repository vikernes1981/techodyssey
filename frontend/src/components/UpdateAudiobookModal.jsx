import React, { useState } from 'react';

function UpdateAudiobookModal({ isOpen, onClose, onUpdate, audiobook }) {
  const [title, setTitle] = useState(audiobook.title);
  const [author, setAuthor] = useState(audiobook.author);
  const [description, setDescription] = useState(audiobook.description);
  const [url, setUrl] = useState(audiobook.url);
  const [source, setSource] = useState(audiobook.source);

  const handleUpdate = async () => {
    const updatedAudiobook = {};
    if (title !== audiobook.title) updatedAudiobook.title = title;
    if (author !== audiobook.author) updatedAudiobook.author = author;
    if (description !== audiobook.description) updatedAudiobook.description = description;
    if (url !== audiobook.url) updatedAudiobook.url = url;
    if (source !== audiobook.source) updatedAudiobook.source = source;
  
    if (Object.keys(updatedAudiobook).length === 0) {
      alert('No changes detected!');
      return;
    }
  
    try {
      const response = await fetch(`https://techodyssey.org/audiobooks/${audiobook.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': 'IamthekilleroftrollS',
        },
        body: JSON.stringify(updatedAudiobook),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update audiobook');
      }
  
      const updatedData = await response.json();
      onUpdate(updatedData); // Pass the updated data back to the parent
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error updating audiobook:', error);
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
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Update Audiobook</h2>

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
            onClick={handleUpdate}
            className="btn bg-blue-500 text-white hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  ) : null;
}

export default UpdateAudiobookModal;

