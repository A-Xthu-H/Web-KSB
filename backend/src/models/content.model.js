import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const Content = sequelize.define('Content', {
  section: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  body: {
    type: DataTypes.TEXT, // Gunakan TEXT untuk konten panjang
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING
  }
});

export default Content;