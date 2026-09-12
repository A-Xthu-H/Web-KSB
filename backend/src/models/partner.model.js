import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

// Partners: id, nama_mitra, logo_url, jenis
const Partner = sequelize.define('Partner', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nama_mitra: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  logo_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  jenis: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'partners',
});

export default Partner;
