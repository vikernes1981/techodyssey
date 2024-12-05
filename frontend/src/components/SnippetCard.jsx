import React from 'react';
import PropTypes from 'prop-types';

function SnippetCard({ snippet, onEdit, onDelete }) {
  const { id, title, code, language, tags } = snippet;

  // Normalize tags to always be an array
  const normalizedTags = Array.isArray(tags) ? tags : tags ? tags.split(',') : [];

  return (
    <div className="bg-gradient-to-b from-gray-400 to-gray-600 shadow-lg rounded-lg p-4">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <pre className="bg-gray-800 text-white p-4 rounded mt-2 overflow-auto">
        <code>{code}</code>
      </pre>
      <p className="text-sm text-gray-300 mt-2">
        <strong>Language:</strong> {language || 'Unknown'}
      </p>
      <p className="text-sm text-gray-300">
        <strong>Tags:</strong> {normalizedTags.length > 0 ? normalizedTags.join(', ') : 'None'}
      </p>
      <div className="flex justify-end mt-4 gap-2">
        <button
            onClick={() => onEdit(snippet)}
            className="bg-yellow-500 px-4 py-2 rounded hover:bg-red-600"        >
            Edit
        </button>
        <button
            onClick={() => onDelete(id)}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"        >
            Delete
        </button>
      </div>

    </div>
  );
}

SnippetCard.propTypes = {
    snippet: PropTypes.shape({
      id: PropTypes.number.isRequired, // Ensure `id` is a number
      title: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
      language: PropTypes.string,
      tags: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    }).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };
  

export default SnippetCard;

