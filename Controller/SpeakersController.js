const Speaker = require("../Model/SpeakerModel")

class SpeakerController{
    static async getAllSpeaker(req,res){
        try{
            const result = await Speaker.getSpeaker();
            res.render("Admin/Speaker",{data:result})
        }
        catch(error){
            res.status(500).send("Error fetching speaker")
        }
    }
    static async AddSpeakers(req,res){
        if (!req.file) {
            return res.status(400).send('No files were uploaded.');
          }
        
          // Get form data
          const { nom, prenom, description, event_id, email,phone } = req.body;
          const image = req.file.filename; // Get the filename of the uploaded image
        
          // Insert data into the database
          try {
            const speaker = {
              nom,
              prenom,
              image,
              description,
              event_id,
              email,
              phone
              
            };
            await Speaker.InsertSpeaker(speaker);
            res.redirect('/Speaker');
          } catch (error) {
            console.log(error);
            res.status(500).send('Error creating event');
          }
    }
}

module.exports = SpeakerController;