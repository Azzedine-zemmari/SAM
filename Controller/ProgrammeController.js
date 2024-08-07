const Programme = require("../Model/ProgrammModel")

class ProgramController{
    static async getAllProgrammes(req,res){
        try{
            const result = await Programme.getProgramm();
            res.render("Admin/Programme",{data:result})
        }
        catch(error){
            res.status(500).send("Error fetching speaker")
        }
    }
}

module.exports = ProgramController