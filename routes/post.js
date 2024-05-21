import express from 'express';
import Post from '../models/post.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Create Post
router.post('/', authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  const post = await Post.create({ title, content, authorId: req.user.id });
  res.status(201).json(post);
});

// Get all posts
router.get('/', async (req, res) => {
  const posts = await Post.findAll({ include: 'author' });
  res.json(posts);
});

// Get a specific post with author
router.get('/:id', async (req, res) => {
  const post = await Post.findByPk(req.params.id, { include: 'author' });
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  res.json(post);
});

// Update Post
router.put('/:id', authMiddleware, async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  if (!post || post.authorId !== req.user.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const { title, content } = req.body;
  post.title = title;
  post.content = content;
  await post.save();
  res.json(post);
});

// Delete Post (soft delete)
router.delete('/:id', authMiddleware, async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  if (!post || post.authorId !== req.user.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  await post.destroy();
  res.status(204).end();
});

export default router;
