import { blogDb } from '../db.js';

// Get all posts
export const getPosts = async (req, res, next) => {
  try {
    const rows = await blogDb.all('SELECT * FROM entries');
    res.json(rows);
  } catch (err) {
    console.error(err);
    const error = new Error("Failed to fetch posts");
    error.status = 500;
    return next(error);
  }
};

// Get a post by ID
export const getPost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const row = await blogDb.get('SELECT * FROM entries WHERE id = ?', [id]);
    if (!row) {
      const error = new Error('Post not found');
      error.status = 404;
      return next(error);
    }
    res.json(row);
  } catch (err) {
    console.error(err);
    const error = new Error("Failed to fetch the post");
    error.status = 500;
    return next(error);
  }
};

// Create a new post
export const createPost = async (req, res, next) => {
  const { title, date, image, content } = req.body || {};
  if (!title || !date || !image || !content) {
    const error = new Error("Missing required fields");
    error.status = 400;
    return next(error);
  }

  try {
    const result = await blogDb.run(
      'INSERT INTO entries (title, date, image, content) VALUES (?, ?, ?, ?)',
      [title, date, image, content]
    );
    res.json({ success: true, id: result.lastID });
  } catch (err) {
    console.error(err);
    const error = new Error("Failed to create post");
    error.status = 500;
    return next(error);
  }
};

// Update a post by ID
export const updatePost = async (req, res, next) => {
  const { id } = req.params;
  const { title, content, image } = req.body;

  try {
    const existingPost = await blogDb.get('SELECT * FROM entries WHERE id = ?', [id]);
    if (!existingPost) {
      const error = new Error('Post not found');
      error.status = 404;
      return next(error);
    }

    const updatedTitle = title !== undefined ? title : existingPost.title;
    const updatedContent = content !== undefined ? content : existingPost.content;
    const updatedImage = image !== undefined ? image : existingPost.image;

    if (
      updatedTitle === existingPost.title &&
      updatedContent === existingPost.content &&
      updatedImage === existingPost.image
    ) {
      const error = new Error("No changes provided");
      error.status = 400;
      return next(error);
    }

    const result = await blogDb.run(
      'UPDATE entries SET title = ?, content = ?, image = ? WHERE id = ?',
      [updatedTitle, updatedContent, updatedImage, id]
    );

    if (result.changes === 0) {
      const error = new Error('Post not updated');
      error.status = 404;
      return next(error);
    }

    res.json({
      success: true,
      message: 'Post updated successfully',
      updatedPost: { id, title: updatedTitle, content: updatedContent, image: updatedImage },
    });
  } catch (err) {
    console.error(err);
    const error = new Error("Failed to update post");
    error.status = 500;
    return next(error);
  }
};

// Delete a post by ID
export const deletePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await blogDb.run('DELETE FROM entries WHERE id = ?', [id]);
    if (result.changes === 0) {
      const error = new Error("Post not found.");
      error.status = 404;
      return next(error);
    }
    res.json({ success: true, message: 'Post deleted successfully' });
  } catch (err) {
    console.error(err);
    const error = new Error("Failed to delete post");
    error.status = 500;
    return next(error);
  }
};
