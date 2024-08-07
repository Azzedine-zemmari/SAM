const Detail = require("../Model/DetailModel");
const moment = require('moment');
class Participation{
    static async getAllDetails(req, res) {
        try {
            const eventId = req.params.eventId; // Get event ID from URL parameter

            // console.log("this is user",user)
            // Fetch event details with speakers and sponsors
            const eventDetails = await Detail.getEventDetails(eventId);

             // Format the dates using Moment.js
            eventDetails.event.EventStart = moment(eventDetails.event.EventStart).format('YYYY/MM/DD');
            eventDetails.event.EventEnd = moment(eventDetails.event.EventEnd).format('YYYY/MM/DD');
             // Format the dates in the program array
             eventDetails.program.forEach(day => {
                day.jour = moment(day.jour).format('YYYY/MM/DD');
            });

            console.log("Event Details:", eventDetails); // Debugging
            res.render('Participation', {eventDetails });
        } catch (error) {
            console.error('Error fetching events:', error);
            res.status(500).send('Error fetching events.');
        }
    }
}

module.exports = Participation