// src/components/CreatePostPage.jsx
import React, { useState } from 'react';
import { createPost } from '../services/postService'; // Import service
import { useNavigate } from 'react-router-dom';

const CreatePostPage = () => {
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [cover, setCover] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createPost({ author, title, content, cover }); // Call service
        navigate('/'); // Redirect to home
    };

    return (
        <div className="p-4">
            <h1>Create New Post</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Cover Image URL"
                    value={cover}
                    onChange={(e) => setCover(e.target.value)}
                    required
                />
                <button type="submit">Create Post</button>
            </form>
        </div>
    );
};

export default CreatePostPage;
