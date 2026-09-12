import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

// Services & Facilities: id, kategori, nama, deskripsi, foto_url
const Service = sequelize.define('Service', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  kategori: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deskripsi: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  foto_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'services',
});

export default Service;
