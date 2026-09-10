import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // Nama file database lokal Anda
  logging: false 
});

export default sequelize;