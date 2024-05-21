import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';
import User from './user.js';
import Post from './post.js';

const Comment = sequelize.define('Comment', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  timestamps: true
});

Comment.belongsTo(User, { as: 'user' });
Comment.belongsTo(Post, { as: 'post' });

export default Comment;
