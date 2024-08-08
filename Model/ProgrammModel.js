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
    static async InsertProgramme(programme) {
        const sql = 'INSERT INTO programme (event_id, jour, description) VALUES (?, ?, ?)';
        console.log('SQL Query:', sql); // Debugging statement
        console.log('Values:', [programme.event_id, programme.jour, programme.description]); // Debugging statement
        return new Promise((resolve, reject) => {
            db.query(sql, [programme.event_id, programme.jour, programme.description], (err, result) => {
                if (err) {
                    console.error('Database error:', err);
                    return reject(err);
                }
                console.log('Insert result:', result);
                resolve(result);
            });
        });
    }
    
}

module.exports = ProgrammModel