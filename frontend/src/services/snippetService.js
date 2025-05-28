// src/services/snippetService.js

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/snippets`;

// Fetch all snippets
export const getSnippets = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

// Fetch a single snippet by ID
export const getSnippetById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

// Create a new snippet
export const createSnippet = async (snippet) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(snippet),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

// Update an existing snippet
export const updateSnippet = async (id, updatedSnippet) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedSnippet),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

// Delete a snippet
export const deleteSnippet = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};


