const Sponsor = require("../Model/SponserModel")

class SpeakerController{
    static async getAllSponsor(req,res){
        try{
            const result = await Sponsor.getsponser();
            res.render("Admin/Sponsor",{data:result})
        }
        catch(error){
            res.status(500).send("Error fetching speaker")
        }
    }
    static async AddSponsor(req,res){
        if (!req.file) {
            return res.status(400).send('No files were uploaded.');
          }
        console.log("this is req.file",req.file)
        
          // Get form data
          const { nom, description, event_ID} = req.body;
          const logo = req.file.filename; // Get the filename of the uploaded image
        
          // Insert data into the database
          try {
            const sponsor = {
              nom,
              description,
              event_ID,
              logo,
            };
            await Sponsor.InsertSponsor(sponsor);
            res.redirect('/GetSponsors');
          } catch (error) {
            console.log(error);
            res.status(500).send('Error creating sponsors');
          }
    }
}

module.exports = SpeakerController