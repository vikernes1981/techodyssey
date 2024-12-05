import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';



function UpdateEntryModal({ isOpen, onClose, onUpdate, entry = {} }) {
  const [title, setTitle] = useState(entry?.title || '');
  const [content, setContent] = useState(entry?.content || '');
  const [image, setImage] = useState(entry?.image || '');
  const navigate = useNavigate();
	
  const handleUpdate = async () => {
    const API_URL = `${import.meta.env.VITE_API_BASE_URL}/entries/${entry.id}`;
    const updatedEntry = {};
    if (title !== entry.title) updatedEntry.title = title;
    if (content !== entry.content) updatedEntry.content = content;
    if (image !== entry.image) updatedEntry.image = image;

    if (Object.keys(updatedEntry).length === 0) {
      alert('No changes detected!');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updatedEntry), // Send only modified fields
      });

      if (!response.ok) {
        throw new Error('Failed to update entry');
      }

      const updatedPost = await response.json();
      onUpdate(updatedPost);
      onClose();
      navigate('/');
    } catch (error) {
      console.error('Error updating post:', error);
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
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Update Post</h2>

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
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              className="input input-bordered w-full border-2 border-gray-300 focus:border-blue-500"
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

export default UpdateEntryModal;
