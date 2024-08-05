const db = require("../Config/db");

class ParticipeModel {
    static async getParticipate() {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM candidature";
            db.query(sql, (err, result) => {
                if (err) {
                    console.error('Database error:', err);
                    return reject(err);
                }
                resolve(result);
            });
        });
    }
}

module.exports = ParticipeModel;