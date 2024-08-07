const db = require("../Config/db");
class ParticipeModel {
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
static async showParticipate(id){
    const sql = "SELECT * FROM candidature where user_id = ? "
    return new Promise((resolve,reject)=>{
        db.query(sql,[id],(err,result)=>{
            if(!err){
                resolve(result)
                console.log("this is the candida:",result)
            }
        })
    })
}
}

module.exports = ParticipeModel;
