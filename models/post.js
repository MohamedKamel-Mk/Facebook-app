import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';
import User from './user.js';

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  timestamps: true
});

Post.belongsTo(User, { as: 'author' });

export default Post;
