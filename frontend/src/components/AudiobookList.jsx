import React from 'react';
import AudiobookCard from './AudiobookCard';

function AudiobookList({ audiobooks }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {audiobooks.map((audiobook) => (
        <AudiobookCard key={audiobook.id} audiobook={audiobook} />
      ))}
    </div>
  );
}

export default AudiobookList;

