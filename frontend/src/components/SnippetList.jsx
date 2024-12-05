import React from 'react';
import PropTypes from 'prop-types';
import SnippetCard from './SnippetCard';

function SnippetList({ snippets, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {snippets.map((snippet) => (
        <SnippetCard
          key={snippet.id}
          snippet={snippet}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

SnippetList.propTypes = {
    snippets: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired, // Ensure `id` is a number
        title: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
        language: PropTypes.string,
        tags: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
      })
    ).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };
  


export default SnippetList;

