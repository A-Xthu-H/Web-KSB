import db from '../config/db.config.js';

const Doctor = {
  findAll: (callback) => {
    const sql = 'SELECT * FROM doctors';
    db.all(sql, [], (err, rows) => {
      callback(err, rows);
    });
  }
};

export default Doctor;