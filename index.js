import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './sequelize.js';
import userRoutes from './routes/user.js';
import postRoutes from './routes/post.js';
import commentRoutes from './routes/comment.js';
import cors from 'cors'

const app = express();
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

// Sync database and start server
sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!');
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

export default app;
