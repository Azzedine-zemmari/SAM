const db = require("../Config/db");
class ParticipeModel {
    static async showParticipate(id) {
        const sql = "SELECT * FROM candidature WHERE user_id = ?";
        return new Promise((resolve, reject) => {
            console.log('Executing query with user_id:', id);
            db.query(sql, [id], (err, result) => {
                if (err) {
                    console.error('Database query error:', err);
                    reject(err);  // Pass the error to the reject function
                } else {
                    console.log('Query result:', result);
                    resolve(result);
                }
            });
        });
    }
    
static async InsertParticipate(pro) {
    const sql =
        "INSERT INTO candidature (name,email, profession , user_id , event_id , eventName ,status) VALUES (?, ?, ?,?, ?, ?,'no valide')";
    return new Promise((resolve, reject) => {
        db.query(
        sql,
        [
            pro.name,
            pro.email,
            pro.Profession,
            pro.UserId,
            pro.eventId,
            pro.eventName,
            pro.status,
        ],
        (err, result) => {
            if (err) {
            console.error("Database error:", err);
            return reject(err);
        }
        console.log(result);
        resolve(result);
        }
    );
    });
}
static async getAllParticipations() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM candidature';
        db.query(sql, (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

static async updateParticipationStatus(id, status) {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE candidature SET status = ? WHERE id = ?';
        db.query(sql, [status, id], (err, result) => {
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
