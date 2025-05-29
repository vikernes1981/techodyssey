import express from 'express';
import * as messageController from '../controllers/messageController.js';

const router = express.Router();

router.get('/messages', messageController.getAllMessages);
router.put('/messages/:id', messageController.updateMessage);
router.delete('/messages/:id', messageController.deleteMessage);

export default router;

