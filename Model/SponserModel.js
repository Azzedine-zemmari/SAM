const db = require("../Config/db")

class SponserModel{
    static async getsponser(resolve,reject){
        return new Promise((resolve,reject)=>{
            const sql = "SELECT * FROM sponsor"
            db.query(sql,(err,result)=>{
                if(!err){
                    resolve(result)
                }
            })
        })
    }
    static async InsertSponsor(sponsor){
        const sql = 'INSERT INTO sponsor (nom, description, event_id, logo) VALUES (?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
          db.query(sql, [sponsor.nom, sponsor.description, sponsor.event_id,`/uploads/`+sponsor.logo,], (err, result) => {
            if (err) {
              console.error('Database error:', err);
              return reject(err);
            }
            console.log(result)
            resolve(result);
          });
        });
    }
    static async DeleteSponsor(id){
        return new Promise((resolve,reject)=>{
            const sql = "delete from sponsor where id = ?"
            db.query(sql,[id],(err,result)=>{
                if(!err){
                    resolve(result)
                }
            })
        })
    }
}

module.exports = SponserModel;