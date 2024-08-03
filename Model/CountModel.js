const db = require('../Config/db');

class CountModel {
  static async getCounts() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 'events' AS table_name, COUNT(*) AS count FROM event
        UNION ALL
        SELECT 'users' AS table_name, COUNT(*) AS count FROM users
      `;
      db.query(query, (err, results) => {
          if (err) {
              console.error('Database error:', err);
              return reject(err);
            }
            resolve(results);
            console.log(results);
      });
    });
  }
}

module.exports = CountModel;
