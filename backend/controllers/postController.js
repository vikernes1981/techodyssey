import db from '../db.js';

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const rows = await db.all('SELECT * FROM entries');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a post by ID
export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const row = await db.get('SELECT * FROM entries WHERE id = ?', id);
    if (!row) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(row);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Create a new post
export const createPost = async (req, res) => {
  const { title, date, image, content } = req.body || {};
  if (!title || !date || !image || !content) {
    return res.status(400).json({ error: 'Missing title, date, image, or content' });
  }
  try {
    const result = await db.run(
      'INSERT INTO entries (title, date, image, content) VALUES (?, ?, ?, ?)',
      title, date, image, content
    );
    res.json({ id: result.lastID });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update a post by ID
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, image } = req.body; // Include image in the request body

  try {
    // Fetch the existing post
    const existingPost = await db.get('SELECT * FROM entries WHERE id = ?', id);

    if (!existingPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Use the existing values if the new ones are not provided
    const updatedTitle = title !== undefined ? title : existingPost.title;
    const updatedContent = content !== undefined ? content : existingPost.content;
    const updatedImage = image !== undefined ? image : existingPost.image;

    // Check if there's anything to update
    if (
      updatedTitle === existingPost.title &&
      updatedContent === existingPost.content &&
      updatedImage === existingPost.image
    ) {
      return res.status(400).json({ message: 'No changes to update' });
    }

    // Update the database with new values
    const result = await db.run(
      'UPDATE entries SET title = ?, content = ?, image = ? WHERE id = ?',
      updatedTitle, updatedContent, updatedImage, id
    );

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Post not updated' });
    }

    res.json({
      message: 'Post updated successfully',
      updatedPost: { id, title: updatedTitle, content: updatedContent, image: updatedImage },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};



// Delete a post by ID
export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.run('DELETE FROM entries WHERE id = ?', id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};
