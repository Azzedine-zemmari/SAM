const db = require("../Config/db")

class ActualiterModel{
    static async getActualiter(){
        return new Promise((resolve,reject)=>{
            const sql = "SELECT * FROM actualiter"
            db.query(sql,(err,result)=>{
                if(!err){
                    resolve(result)
                }
            })
        })
    }
    //(Error)
    // static async Insert(Act) {
    //     const sql = 'INSERT INTO actualiter (title, description) VALUES (?, ?)';
    //     return new Promise((resolve, reject) => {
    //         db.query(sql, [Act.title, Act.description], (err, result) => {
    //             if (err) {
    //                 console.error('Database error:', err);
    //                 return reject(err);
    //             }
    //             resolve(result);
    //         });
    //     });
    // }
}

module.exports = ActualiterModel