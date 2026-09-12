import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

// Entitas generik untuk konten statis halaman (mis. teks beranda/sambutan).
const Content = sequelize.define('Content', {
  section: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'contents',
});

export default Content;