import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

// Schedules: id, doctor_id (FK), hari, jam_mulai, jam_selesai, status_aktif
const Schedule = sequelize.define('Schedule', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  doctor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  hari: {
    type: DataTypes.ENUM('Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'),
    allowNull: false,
  },
  jam_mulai: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  jam_selesai: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  status_aktif: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'schedules',
});

export default Schedule;
