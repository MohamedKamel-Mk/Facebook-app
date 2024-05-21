import express from 'express';
import Comment from '../models/comment.js';
import Post from '../models/post.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Create Comment
router.post('/', authMiddleware, async (req, res) => {
  const { content, postId } = req.body;
  const post = await Post.findByPk(postId);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  const comment = await Comment.create({ content, postId, userId: req.user.id });
  res.status(201).json(comment);
});

// Get all comments for a post
router.get('/post/:postId', async (req, res) => {
  const comments = await Comment.findAll({ where: { postId: req.params.postId }, include: ['user', 'post'] });
  res.json(comments);
});

// Update Comment
router.put('/:id', authMiddleware, async (req, res) => {
  const comment = await Comment.findByPk(req.params.id);
  if (!comment || comment.userId !== req.user.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  comment.content = req.body.content;
  await comment.save();
  res.json(comment);
});

// Delete Comment
router.delete('/:id', authMiddleware, async (req, res) => {
  const comment = await Comment.findByPk(req.params.id);
  if (!comment || comment.userId !== req.user.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  await comment.destroy();
  res.status(204).end();
});

export default router;

