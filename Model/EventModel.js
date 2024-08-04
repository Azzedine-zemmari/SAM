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
        const sql = 'INSERT INTO event (name, description, adress, EventStart,EventPlace ,image,EventEnd) VALUES (?, ?, ?, ?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
          db.query(sql, [event.name, event.description, event.adress, event.EventStart, event.EventPlace,`/uploads/`+event.image,event.EventEnd], (err, result) => {
            if (err) {
              console.error('Database error:', err);
              return reject(err);
            }
            console.log(result)
            resolve(result);
          });
        });
    }
    
}

module.exports = EventModel;