import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

// Job_Vacancies: id, posisi, deskripsi_pekerjaan, persyaratan, status
const JobVacancy = sequelize.define('JobVacancy', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  posisi: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deskripsi_pekerjaan: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  persyaratan: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('buka', 'tutup'),
    defaultValue: 'buka',
  },
}, {
  tableName: 'job_vacancies',
});

export default JobVacancy;
