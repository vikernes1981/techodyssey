import { blogDb } from '../db.js';

// CREATE: Add a new snippet
export const createSnippet = async (req, res, next) => {
  try {
    const { title, code, language, tags } = req.body;
    if (!title || !code) {
      const err = new Error('Title and code are required.');
      err.status = 400;
      return next(err);
    }

    const tagsArray = Array.isArray(tags)
      ? tags
      : typeof tags === 'string'
        ? tags.split(',').map(t => t.trim())
        : [];

    const result = await blogDb.run(
      `INSERT INTO snippets (title, code, language, tags) VALUES (?, ?, ?, ?)`,
      [title, code, language, tagsArray.join(',')]
    );

    const newSnippet = {
      id: result.lastID,
      title,
      code,
      language,
      tags: tagsArray,
    };
    res.status(201).json(newSnippet);
  } catch (err) {
    console.error(err);
    const error = new Error('Failed to create snippet.');
    error.status = 500;
    return next(error);
  }
};

// READ: Get all snippets or filter by language/tags
export const getSnippets = async (req, res, next) => {
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

    const rows = await blogDb.all(query, params);
    const snippets = rows.map((row) => ({
      ...row,
      tags: row.tags ? row.tags.split(',').map(t => t.trim()) : [],
    }));

    res.status(200).json(snippets);
  } catch (err) {
    console.error(err);
    const error = new Error('Failed to fetch snippets.');
    error.status = 500;
    return next(error);
  }
};

// READ: Get snippet by ID
export const getSnippetById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const snippet = await blogDb.get(`SELECT * FROM snippets WHERE id = ?`, [id]);
    if (!snippet) {
      const err = new Error('Snippet not found.');
      err.status = 404;
      return next(err);
    }
    res.status(200).json({
      ...snippet,
      tags: snippet.tags ? snippet.tags.split(',').map(t => t.trim()) : [],
    });
  } catch (err) {
    console.error(err);
    const error = new Error('Failed to fetch snippet.');
    error.status = 500;
    return next(error);
  }
};

// UPDATE: Update a snippet by ID
export const updateSnippet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, code, language, tags } = req.body;

    // Validate required fields
    if (!title || !code) {
      const err = new Error('Title and code are required.');
      err.status = 400;
      return next(err);
    }

    const snippet = await blogDb.get(`SELECT * FROM snippets WHERE id = ?`, [id]);
    if (!snippet) {
      const err = new Error('Snippet not found.');
      err.status = 404;
      return next(err);
    }

    const tagsArray = Array.isArray(tags)
      ? tags
      : typeof tags === 'string'
        ? tags.split(',').map(t => t.trim())
        : [];

    await blogDb.run(
      `UPDATE snippets SET title = ?, code = ?, language = ?, tags = ? WHERE id = ?`,
      [title, code, language, tagsArray.join(','), id]
    );

    // Fetch the updated snippet for accurate return
    const updatedSnippet = await blogDb.get(`SELECT * FROM snippets WHERE id = ?`, [id]);

    res.status(200).json({
      ...updatedSnippet,
      tags: updatedSnippet.tags ? updatedSnippet.tags.split(',').map(t => t.trim()) : [],
    });
  } catch (err) {
    console.error(err);
    const error = new Error('Failed to update snippet.');
    error.status = 500;
    return next(error);
  }
};

// DELETE: Remove a snippet by ID
export const deleteSnippet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const snippet = await blogDb.get(`SELECT * FROM snippets WHERE id = ?`, [id]);
    if (!snippet) {
      const err = new Error('Snippet not found.');
      err.status = 404;
      return next(err);
    }
    await blogDb.run(`DELETE FROM snippets WHERE id = ?`, [id]);
    res.status(200).json({ message: 'Snippet deleted successfully.' });
  } catch (err) {
    console.error(err);
    const error = new Error('Failed to delete snippet.');
    error.status = 500;
    return next(error);
  }
};
