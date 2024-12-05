import React, { useEffect, useState } from 'react';
import { getPostById, deletePost } from '../services/postService';
import { useParams, Link } from 'react-router-dom';
import UpdateEntryModal from './UpdateEntryModal';

const PostDetailsPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isLoggedIn = !!localStorage.getItem('token');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getPostById(id);
                setPost(data);
            } catch (error) {
                console.error('Failed to fetch post:', error);
                setError('Failed to fetch post');
            }
        };

        if (id) {
            fetchPost();
        } else {
            setError('Invalid post ID');
        }
    }, [id]);

    const handleDelete = async () => {
        try {
            await deletePost(id);
            window.location.href = '/';
        } catch (error) {
            console.error('Failed to delete post:', error);
            setError('Failed to delete post');
        }
    };

    const handleUpdate = (updatedPost) => {
        setPost(updatedPost);
    };

    if (error) return <div className="alert alert-error">{error}</div>;
    if (!post) return <div className="loading loading-spinner loading-lg"></div>;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-600 to-black p-6">
            <div className="bg-gradient-to-b from-gray-400 to-[#D3EEDD] p-6 rounded-lg shadow-lg w-full max-w-4xl">
                <figure className="flex justify-center mb-6">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="h-60 w-60 object-cover border-b border-gray-300"
                    />
                </figure>
                <div className="card-body">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">{post.title}</h1>
                    <div className="prose lg:prose-lg text-gray-800 break-words overflow-wrap-anywhere" dangerouslySetInnerHTML={{ __html: post.content }}>
                    </div>
                </div>
                <div className="text-center mt-4 flex flex-wrap justify-center gap-2">
                    {isLoggedIn ? (
                        <>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-800"
                            >
                                Update Post
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-800"
                            >
                                Delete Post
                            </button>
                        </>
                    ) : null}
                    <Link
                        to="/"
                        className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-800"
                    >
                        Back to Posts
                    </Link>
                </div>
            </div>
            {isModalOpen && (
                <UpdateEntryModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onUpdate={handleUpdate}
                    entry={post}
                />
            )}
        </div>
    );
};

export default PostDetailsPage;
