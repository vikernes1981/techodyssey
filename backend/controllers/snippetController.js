import db from '../db.js'; // Import the database connection

// CREATE: Add a new snippet
export const createSnippet = async (req, res) => {
    try {
        const { title, code, language, tags } = req.body;
        if (!title || !code) {
            return res.status(400).json({ error: 'Title and code are required.' });
        }

        // Ensure tags is an array before calling join
        const tagsArray = Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim());

        const result = await db.run(
            `INSERT INTO snippets (title, code, language, tags) VALUES (?, ?, ?, ?)`,
            [title, code, language, tagsArray.join(',')] // Store as comma-separated string
        );
        const newSnippet = {
            id: result.lastID,
            title,
            code,
            language,
            tags: tagsArray, // Return tags as an array
        };
        res.status(201).json(newSnippet);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create snippet.', details: err.message });
    }
};

// READ: Get all snippets or filter by language/tags
export const getSnippets = async (req, res) => {
    try {
        const { language, tag } = req.query;
        let query = `SELECT * FROM snippets`;
        const params = [];
        if (language || tag) {
            query += ` WHERE `;
            if (language) {
                query += `language = ?`;
                params.push(language);
            }
            if (tag) {
                if (language) query += ` AND `;
                query += `tags LIKE ?`;
                params.push(`%${tag}%`);
            }
        }
        const rows = await db.all(query, params);

        // Normalize tags to always be an array
        const snippets = rows.map((row) => ({
            ...row,
            tags: row.tags ? row.tags.split(',') : [],
        }));

        res.status(200).json(snippets);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch snippets.', details: err.message });
    }
};

// READ: Get snippet by ID
export const getSnippetById = async (req, res) => {
    try {
        const { id } = req.params;
        const snippet = await db.get(`SELECT * FROM snippets WHERE id = ?`, [id]);
        if (!snippet) {
            return res.status(404).json({ error: 'Snippet not found.' });
        }
        res.status(200).json({
            ...snippet,
            tags: snippet.tags ? snippet.tags.split(',') : [], // Normalize tags
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch snippet.', details: err.message });
    }
};

// UPDATE: Update a snippet by ID
export const updateSnippet = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, code, language, tags } = req.body;
        const snippet = await db.get(`SELECT * FROM snippets WHERE id = ?`, [id]);
        if (!snippet) {
            return res.status(404).json({ error: 'Snippet not found.' });
        }
        await db.run(
            `UPDATE snippets SET title = ?, code = ?, language = ?, tags = ? WHERE id = ?`,
            [title, code, language, tags?.join(','), id] // Store tags as a comma-separated string
        );
        const updatedSnippet = {
            id,
            title,
            code,
            language,
            tags: tags || [], // Ensure tags is always an array
        };
        res.status(200).json(updatedSnippet);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update snippet.', details: err.message });
    }
};

// DELETE: Remove a snippet by ID
export const deleteSnippet = async (req, res) => {
    try {
        const { id } = req.params;
        const snippet = await db.get(`SELECT * FROM snippets WHERE id = ?`, [id]);
        if (!snippet) {
            return res.status(404).json({ error: 'Snippet not found.' });
        }
        await db.run(`DELETE FROM snippets WHERE id = ?`, [id]);
        res.status(200).json({ message: 'Snippet deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete snippet.', details: err.message });
    }
};

