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
    //Error
    static async AddProgramm(req, res) {
        const { event_id, jour, description } = req.body;
        console.log('Request body:', req.body); // Debugging statement
        try {
            const programme = {
                event_id,
                jour,
                description,
            };
            console.log('Program object:', programme); // Debugging statement
            await Programme.InsertProgramme(programme);
            res.redirect('/getProgram'); // Ensure you have this route defined
        } catch (error) {
            console.error('Error creating program:', error);
            res.status(500).send('Error creating program');
        }
    }
}

module.exports = ProgramController