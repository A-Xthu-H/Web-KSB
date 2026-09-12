import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const Doctor = sequelize.define('Doctor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nama_dokter: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  spesialisasi: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  foto_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  deskripsi: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status_aktif: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'doctors',
});

export default Doctor;