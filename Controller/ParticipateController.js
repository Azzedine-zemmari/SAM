const participate = require("../Model/Participation")
class ParticipateController {
    static async AddParticipate(req,res){
          // Get form data
        const { name, email, Profession ,eventId , eventName , UserId } = req.body;
        
        
          // Insert data into the database
          try {
            const event = {
              name,
              email,
              Profession,
              UserId,
              eventId,
              eventName,
            };
            await participate.InsertParticipate(event);
            res.redirect('/Perticipation');
          } catch (error) {
            console.log(error);
            res.status(500).send('Error creating event');
          }
    }
    static async GetParticipate(req,res){
            try {
                const result = await participate.showParticipate();
                console.log("this is participate",result)
                res.render("Condida", { data: result });
            } catch (error) {
                console.error('Error fetching participate:', error);
                res.status(500).send('Error fetching Praticipate.');
            }
    }
}

module.exports = ParticipateController