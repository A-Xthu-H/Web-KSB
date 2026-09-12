import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

// Articles: id, judul, slug, konten, thumbnail_url, penulis_id (FK), status
const Article = sequelize.define('Article', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  judul: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  konten: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
  },
  thumbnail_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  penulis_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('draft', 'published'),
    defaultValue: 'draft',
  },
}, {
  tableName: 'articles',
});

export default Article;
