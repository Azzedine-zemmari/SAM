const Part = require("../Model/ParticipeModel");

class Participation{
    static async getAllParticipate(req, res) {
        try {
            const user = req.session.user; // Get authenticated user from session
            const eventName = req.params.name; // Get event name from URL parameter
            console.log(user)
            const result = await Part.getParticipate();

            console.log('Authenticated user:', user); // Log the authenticated user
            console.log('Event name:', eventName); // Log the event name
            console.log('Database result:', result); // Log the raw data from the database

            res.render('Participation', { user, eventName, data: result });
        } catch (error) {
            console.error('Error fetching events:', error);
            res.status(500).send('Error fetching events.');
        }
    }
}

module.exports = Participation