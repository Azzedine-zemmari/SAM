const db = require("../Config/db");

class EventModel {
    static async getEvent() {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM event";
            db.query(sql, (err, result) => {
                if (err) {
                    console.error('Database error:', err);
                    return reject(err);
                }
                resolve(result);
            });
        });
    }
     static async getEventById(id) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM event WHERE id = ?";
            db.query(sql, [id], (err, result) => {
                if (err) {
                    console.error('Database error:', err);
                    return reject(err);
                }
                resolve(result[0]);
            });
        });
    }
    static async InsertEvent(event){
        return new Promise((resolve,reject)=>{
            const sql = "INSERT INTO event VALUES()"
        })
    }
    
}

module.exports = EventModel;