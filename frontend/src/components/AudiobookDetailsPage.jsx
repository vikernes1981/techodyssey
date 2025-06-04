import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import UpdateAudiobookModal from './UpdateAudiobookModal';

const AudiobookDetailsPage = () => {
  const { id } = useParams(); // Get the audiobook ID from the URL
  const [audiobook, setAudiobook] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem('token');

  useEffect(() => {
    const fetchAudiobook = async () => {
      try {
        const response = await fetch(`https://techodyssey.org/audiobooks/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch audiobook.');
        }
        const data = await response.json();
        setAudiobook(data);
      } catch (error) {
        console.error('Failed to fetch audiobook:', error);
        setError('Failed to fetch audiobook');
      }
    };

    if (id) {
      fetchAudiobook();
    } else {
      setError('Invalid audiobook ID');
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://techodyssey.org/audiobooks/${id}`, {
        method: 'DELETE',
        headers: {
          'x-admin-token': 'IamthekilleroftrollS',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete audiobook.');
      }
      window.location.href = '/audiobooks';
    } catch (error) {
      console.error('Failed to delete audiobook:', error);
      setError('Failed to delete audiobook');
    }
  };

  if (error) return <div className="alert alert-error">{error}</div>;
  if (!audiobook) return <div className="loading loading-spinner loading-lg"></div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-600 to-black p-6">
      <div className="bg-gradient-to-b from-gray-400 to-[#D3EEDD] p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <figure className="flex justify-center mb-6">
          <img
            src={audiobook.image || 'https://picsum.photos/200/300'}
            alt={audiobook.title}
            className="h-60 w-60 object-cover border-b border-gray-300"
          />
        </figure>
        <div className="card-body">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">{audiobook.title}</h1>
          <p className="text-gray-600 text-lg mb-4">
            <strong>Author:</strong> {audiobook.author}
          </p>
          <p className="text-gray-600 text-lg mb-4">
            <strong>Source:</strong> {audiobook.source}
          </p>
          <p className="text-gray-600 text-lg mb-4">
            <strong>URL:</strong>{' '}
            <a
              href={audiobook.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {audiobook.url}
            </a>
          </p>
          <p className="prose lg:prose-lg text-gray-800 break-words overflow-wrap-anywhere">
            <strong>Description:</strong> {audiobook.description}
          </p>
        </div>
        <div className="text-center mt-4 flex flex-wrap justify-center gap-2">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-800"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-800"
              >
                Delete
              </button>
            </>
          ) : null}
          <Link
            to="/audiobooks"
            className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-800"
          >
            Back
          </Link>
        </div>
      </div>
      {isModalOpen && (
    <UpdateAudiobookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Close the modal
        onUpdate={() => {
            fetch(`https://techodyssey.org/audiobooks/${audiobook.id}`)
              .then((response) => response.json())
              .then((updatedAudiobook) => {
                setAudiobook(updatedAudiobook); // Update the state with fresh data
                setIsModalOpen(false); // Close the modal
              })
              .catch((error) => console.error('Error refetching audiobook:', error));
          }}
        audiobook={audiobook} // Pass the audiobook object
  />
)}

    </div>
  );
};

export default AudiobookDetailsPage;

