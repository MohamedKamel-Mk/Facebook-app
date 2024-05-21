// Get a specific post with the author
router.get('/:id/author', async (req, res) => {
    const post = await Post.findByPk(req.params.id, {
      include: { model: User, as: 'author' }
    });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  });
  