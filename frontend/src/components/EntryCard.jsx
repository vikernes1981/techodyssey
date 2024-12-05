import React from 'react';
import PropTypes from 'prop-types';

function EntryCard({ entry = {} }) {
  const fallbackImage = "https://picsum.photos/200/300";

  return (
    <div className="bg-gradient-to-b from-gray-400 to-[#D3EEDD] shadow-lg rounded-lg p-4 cursor-pointer">
      <img
        src={entry.image || fallbackImage} // Use the provided image or fallback
        alt={entry.title}
        onError={(e) => {
          e.target.src = fallbackImage; // Fallback if the provided image URL is invalid
        }}
        className="rounded-lg w-full h-48 object-cover"
      />
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-bold text-gray-800">{entry.title}</h2>
      </div>
      <p
        className="text-gray-600"
        dangerouslySetInnerHTML={{
          __html: entry.content.substring(0, 100) + '...',
        }}
      />
    </div>
  );
}

EntryCard.propTypes = {
  entry: PropTypes.shape({
    id: PropTypes.number.isRequired, // Ensure the ID is required
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    image: PropTypes.string, // Optional image field
  }).isRequired,
};

export default EntryCard;
