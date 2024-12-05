import express from 'express';
import { getPost, getPosts, createPost, updatePost, deletePost } from '../controllers/postController.js';

const router = express.Router();

// Define routes
router.get('/entries/:id', getPost);         // GET /api/entries/:id
router.get('/entries', getPosts);           // GET /api/entries
router.post('/entries', createPost);        // POST /api/entries
router.put('/entries/:id', updatePost);     // PUT /api/entries/:id
router.delete('/entries/:id', deletePost);  // DELETE /api/entries/:id

export default router;
