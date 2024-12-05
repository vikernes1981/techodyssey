import { useState } from 'react';
import { createSnippet } from '../services/snippetService';

function AddSnippetModal({ setIsModalOpen, setSnippets }) {
    const [title, setTitle] = useState('');
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('');
    const [tags, setTags] = useState('');

    const handleSubmit = async () => {
        try {
            const newSnippet = await createSnippet({ title, code, language, tags });
            setSnippets(prev => [...prev, newSnippet]);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Failed to create snippet:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-xl font-bold mb-4">Add New Snippet</h2>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 w-full mb-2"
                />
                <textarea
                    placeholder="Code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="border p-2 w-full mb-2"
                />
                <input
                    type="text"
                    placeholder="Language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="border p-2 w-full mb-2"
                />
                <input
                    type="text"
                    placeholder="Tags (comma-separated)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="border p-2 w-full mb-2"
                />
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Save
                </button>
                <button
                    onClick={() => setIsModalOpen(false)}
                    className="ml-2 px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default AddSnippetModal;

