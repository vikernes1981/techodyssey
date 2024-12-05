import express from 'express';
import { createSnippet, getSnippets, updateSnippet, deleteSnippet } from '../controllers/snippetController.js';

const router = express.Router();

router.post('/snippets', createSnippet);
router.get('/snippets', getSnippets);
router.put('/snippets/:id', updateSnippet);
router.delete('/snippets/:id', deleteSnippet);

export default router;
