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
    //show the update form 
    static async ShowSpeakerById(req,res){
        const id = req.params.id;
    try {
        const speaker = await Speaker.GetSpeakerBtId(id)
        
        res.render("Admin/FormUpdateSpeaker", {speaker});
        console.log("this is the data speaker ",speaker )
        
    } catch (error) {
        console.error('Error fetching speaker:', error);
        res.status(500).send('Error fetching event');
    }
    }
    static async UpdateSpeaker(req, res) {
        const id = req.params.id;
        const { nom, prenom, description, event_id, email, phone } = req.body;
        const image = req.file ? req.file.filename : req.body.currentImage; // Use the new image if uploaded, otherwise keep the current image
    
        try {
            await Speaker.UpdateSpeaker(id, { nom, prenom, image, description, event_id, email, phone, currentImage: req.body.currentImage });
            res.redirect('/Speaker');
        } catch (error) {
            console.error('Error updating speaker:', error);
            res.status(500).send('Error updating speaker');
        }
    }
    static async DeleteSpeaker(req,res){
        const id = req.params.id
        try {
            console.log(`Attempting to delete event with ID: ${id}`); // Debug log
            const result = await Speaker.DeleteSpeaker(id);
            console.log(`Deletion result: ${result}`); // Debug log
            res.redirect("/Dashboard")
        } catch (error) {
            console.error('Error deleting event:', error);
            res.status(500).send('Error deleting event');
        }
    }
    
}

module.exports = SpeakerController;