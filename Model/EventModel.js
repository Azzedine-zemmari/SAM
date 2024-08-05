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

    // static async getEventWithDetails(eventId) {
    //     return new Promise((resolve, reject) => {
    //         const sql = `
    //             SELECT e.*, 
    //                 s.id AS sponsor_id, s.nom AS sponsor_name, s.logo AS sponsor_logo,
    //                 sp.id AS speaker_id, sp.nom AS speaker_name, sp.prenom AS speaker_prenom, sp.image AS speaker_image, sp.description AS speaker_description, sp.email AS speaker_email, sp.phone AS speaker_phone
    //             FROM event e
    //             LEFT JOIN sponsor s ON e.id = s.event_id
    //             LEFT JOIN speaker sp ON e.id = sp.event_id
    //             WHERE e.id = ?
    //         `;
    //         db.query(sql, [eventId], (err, results) => {
    //             if (err) {
    //                 return reject(err);
    //             }
    //             console.log(results);
    //             if (results.length === 0) {
    //                 return resolve(null);
    //             }
                
    //             const event = {
    //                 id: results[0].id,
    //                 name: results[0].name,
    //                 description: results[0].description,
    //                 address: results[0].address,
    //                 EventStart: results[0].EventStart,
    //                 EventEnd: results[0].EventEnd,
    //                 EventPlace: results[0].EventPlace,
    //                 image: results[0].image,
    //                 sponsors: [], // Use plural
    //                 speakers: []  // Use plural
    //             };
                
    //             results.forEach(row => {
    //                 if (row.sponsor_id) {
    //                     event.sponsors.push({
    //                         id: row.sponsor_id,
    //                         nom: row.sponsor_name,
    //                         logo: row.sponsor_logo
    //                     });
    //                 }
    //                 if (row.speaker_id) {
    //                     event.speakers.push({
    //                         id: row.speaker_id,
    //                         nom: row.speaker_name,
    //                         prenom: row.speaker_prenom,
    //                         image: row.speaker_image,
    //                         description: row.speaker_description,
    //                         email: row.speaker_email,
    //                         phone: row.speaker_phone
    //                     });
    //                 }
    //             });
                
    //             resolve(event);
    //             console.log(event)
    //         });
    //     });
    // }
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
    static async UpdateEvent(id){
        return new Promise((resolve, reject) => {
            const sql = 'select * from event where id = ?'
            db.query(sql,[id],(err,result)=>{
                if(!err){
                    resolve(result);
                }
            })
        })
    }

    static async Update(id,event){
        return new Promise((resolve,reject)=>{
            const sql = 'update event set name = ? , description = ? , adress = ? , EventStart = ? , EventPlace  = ? , image = ? , EventEnd = ? where id = ?'
            db.query(sql,[event.name, event.description, event.adress , event.EventStart , event.EventPlace , `/uploads/`+event.image , event.EventEnd , id],(err,result)=>{
                if(!err){
                    resolve(result)
                }
            })
        })
    }
    static async DeleteEvent(id){
        return new Promise((resolve,reject)=>{
            const sql = "delete from event where id = ?"
            db.query(sql,[id],(err,result)=>{
                if(!err){
                    resolve(result)
                }
            })
        })
    }
}

module.exports = EventModel;