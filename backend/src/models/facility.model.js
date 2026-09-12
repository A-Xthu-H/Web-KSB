import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

// Fasilitas umum klinik (kantin, mushola, parkir, dsb).
const Facility = sequelize.define('Facility', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
  tableName: 'facilities',
});

export default Facility;
