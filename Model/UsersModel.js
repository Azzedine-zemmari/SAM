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
    static async DeleteUser(id) {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM users WHERE id = ?";
            db.query(sql, [id], (err, result) => {
                if (err) {
                    console.error('Database error:', err);
                    return reject(err);
                }
                // Check if any rows were affected
                if (result.affectedRows === 0) {
                    return reject(new Error('User not found'));
                }
                resolve(result);
            });
        });
    }
        
}

module.exports = UserModel;