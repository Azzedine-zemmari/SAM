const participate = require("../Model/Participation")
require('dotenv').config();
const nodemailer = require('nodemailer');
class ParticipateController {
  static async GetParticipate(req, res) {
    try {
        const user = req.session.user;
        console.log('Session user:', user);
        if (!user || !user.id) {
            console.error('User not found or user ID is missing in session');
            return res.status(400).send('User not found or user ID is missing in session');
        }
        console.log('User ID:', user.id);
        const result = await participate.showParticipate(user.id);
        console.log("This is participate", result);
        res.render("Condida", { data: result });
    } catch (error) {
        console.error('Error fetching participate:', error);
        res.status(500).send('Error fetching Participate.');
    }
}

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
    //get all the participation (admin part)
    static async getAllParticipations(req, res) {
      try {
          const participations = await participate.getAllParticipations();
          res.render('Admin/ParticipationView', { data: participations });
      } catch (error) {
          res.status(500).send('Error fetching participations');
      }
  }

    // Validate a participation (admin part)
    static async validateParticipation(req, res) {
      const { id } = req.params;

      try {
          // Update the participation status
          await participate.updateParticipationStatus(id, 'valide');

          // Get the participation details for emailing
          const participation = await participate.showParticipate(id);

          console.log(participation)
          // Send confirmation email
          await ParticipateController.sendValidationEmail(participation.email);

          res.redirect('/Perticipation');
      } catch (error) {
          res.status(500).send('Error validating participation');
      }
  }

   // Function to send validation email
   static async sendValidationEmail(email) {
    // Configure nodemailer transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Participation Validated',
        text: 'Your participation has been validated.',
    };

    return transporter.sendMail(mailOptions);
}
    
}

module.exports = ParticipateController