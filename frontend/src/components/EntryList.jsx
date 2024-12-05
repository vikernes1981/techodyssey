import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import EntryCard from './EntryCard';

function EntryList({ entries }) {
  const navigate = useNavigate();

  const handleEntryClick = (entry) => {
    navigate(`/entries/${entry.id}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {entries.map((entry) => (
        <div
          key={entry.id}
          onClick={() => handleEntryClick(entry)} // Navigate on card click
          className="cursor-pointer"
        >
          <EntryCard entry={entry} />
        </div>
      ))}
    </div>
  );
}

EntryList.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      image: PropTypes.string, // Optional
    })
  ).isRequired,
};

export default EntryList;
