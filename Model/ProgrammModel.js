const db = require("../Config/db");

class ProgrammModel {
    static async getProgramm(){
        return new Promise((resolve,reject)=>{
            const sql = "SELECT * FROM programme"
            db.query(sql,(err,result)=>{
                if(!err){
                    resolve(result)
                }
            })
        })
    }
}

module.exports = ProgrammModel