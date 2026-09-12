import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

// Settings: id, kunci_pengaturan (mis. no_whatsapp, hero_banner), nilai
const Setting = sequelize.define('Setting', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  kunci_pengaturan: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  nilai: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'settings',
});

export default Setting;
