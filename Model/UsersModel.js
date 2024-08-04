const db = require('../Config/db');

class UserModel {
  static async getUsers() {
    return new Promise((resolve, reject) => {
        const sql = `
        select * from users
      `;
      db.query(sql, (err, results) => {
          if (err) {
              console.error('Database error:', err);
              return reject(err);
            }
            resolve(results);
            console.log(results);
      });
    })}

}

module.exports = UserModel;