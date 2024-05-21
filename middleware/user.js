// Get a specific user with a specific post and post's comments
router.get('/:userId/posts/:postId', async (req, res) => {
    const user = await User.findByPk(req.params.userId, {
      include: {
        model: Post,
        as: 'posts',
        where: { id: req.params.postId },
        include: { model: Comment, as: 'comments' }
      }
    });
    if (!user) {
      return res.status(404).json({ error: 'User or Post not found' });
    }
    res.json(user);
  });
  