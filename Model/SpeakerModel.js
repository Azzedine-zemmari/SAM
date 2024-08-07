const db = require("../Config/db");

class SpeakerModel {
    static async getSpeaker(){
        return new Promise((resolve,reject)=>{
            const sql = "SELECT * FROM speaker"
            db.query(sql,(err,result)=>{
                if(!err){
                    resolve(result)
                }
            })
        })
    }
    static async InsertSpeaker(speaker){
        const sql = 'INSERT INTO speaker (nom, prenom, image, description,event_id ,email,phone) VALUES (?, ?, ?, ?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
          db.query(sql, [speaker.nom, speaker.prenom,`/uploads/`+speaker.image, speaker.description, speaker.event_id,speaker.email,speaker.phone], (err, result) => {
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

module.exports = SpeakerModel