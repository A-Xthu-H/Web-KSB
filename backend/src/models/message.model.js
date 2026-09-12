import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

// Pesan masuk dari formulir kontak publik.
const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  telepon: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isi: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  dibaca: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'messages',
});

export default Message;
