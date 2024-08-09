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
                console.log("events",result)
            });
        });
    }
    //admin part
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
    //to show the update form
    //admin part
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
    //admin part
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
    //admin part
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