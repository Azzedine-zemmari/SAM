const mysql = require("mysql");

const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"SAM"
})

db.getConnection(()=>{
    console.log("database connected");
})

module.exports=db;