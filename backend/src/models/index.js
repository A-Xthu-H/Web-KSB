import sequelize from '../config/db.config.js';
import User from './admin.model.js';
import Doctor from './doctor.model.js';
import Schedule from './schedule.model.js';
import Service from './service.model.js';
import Facility from './facility.model.js';
import Article from './article.model.js';
import JobVacancy from './jobVacancy.model.js';
import Partner from './partner.model.js';
import Setting from './setting.model.js';
import Message from './message.model.js';
import Content from './content.model.js';

// --- Asosiasi (relasi antar entitas) ---

// Satu dokter punya banyak jadwal praktik.
Doctor.hasMany(Schedule, { foreignKey: 'doctor_id', as: 'schedules' });
Schedule.belongsTo(Doctor, { foreignKey: 'doctor_id', as: 'doctor' });

// Satu admin (user) dapat menulis banyak artikel.
User.hasMany(Article, { foreignKey: 'penulis_id', as: 'articles' });
Article.belongsTo(User, { foreignKey: 'penulis_id', as: 'penulis' });

const db = {
  sequelize,
  User,
  Doctor,
  Schedule,
  Service,
  Facility,
  Article,
  JobVacancy,
  Partner,
  Setting,
  Message,
  Content,
};

export default db;
export {
  sequelize,
  User,
  Doctor,
  Schedule,
  Service,
  Facility,
  Article,
  JobVacancy,
  Partner,
  Setting,
  Message,
  Content,
};
