import React, { useState } from 'react';
import PropTypes from 'prop-types';

function UpdateSnippetModal({ isOpen, onClose, snippet, onSave }) {
  const [title, setTitle] = useState(snippet.title);
  const [code, setCode] = useState(snippet.code);
  const [language, setLanguage] = useState(snippet.language || '');
  const [tags, setTags] = useState(
    Array.isArray(snippet.tags) ? snippet.tags.join(', ') : snippet.tags || ''
  );

  const handleSave = () => {
    const updatedSnippet = {
      title,
      code,
      language,
      tags: tags.split(',').map((tag) => tag.trim()), // Convert tags back to an array
    };
    onSave(snippet.id, updatedSnippet);
    onClose();
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Update Snippet</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Code</label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Language</label>
          <input
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Tags (comma-separated)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="btn btn-outline">
            Cancel
          </button>
          <button onClick={handleSave} className="btn btn-primary">
            Save
          </button>
        </div>
      </div>
    </div>
  ) : null;
}

UpdateSnippetModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  snippet: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    language: PropTypes.string,
    tags: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  }).isRequired,
  onSave: PropTypes.func.isRequired,
};

export default UpdateSnippetModal;

