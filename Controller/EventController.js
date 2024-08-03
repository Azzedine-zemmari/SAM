const Event = require("../Model/EventModel");
const moment = require("moment");

class EventController {
    static async getAllEvent(req, res) {
        try {
            const result = await Event.getEvent();
            console.log('Database result:', result); // Log the raw data from the database
            result.forEach(event => {
                event.formattedDate = EventController.formatDate(event.EventDate);
                console.log('Formatted date for event:', event); // Log each event with formatted date
            });
            res.render("events", { data: result });
        } catch (error) {
            console.error('Error fetching events:', error);
            res.status(500).send('Error fetching events.');
        }
    }

    static async getEventById(req, res) {
        try {
            const eventId = req.params.id;
            const event = await Event.getEventById(eventId);
            if (event) {
                event.formattedDate = EventController.formatDate(event.EventDate);
                res.render("Detail", { event });
            } else {
                res.status(404).send('Event not found');
            }
        } catch (error) {
            console.error('Error fetching event:', error);
            res.status(500).send('Error fetching event.');
        }
    }

    static formatDate(dateString) {
        return moment(dateString).format('DD/MM/YYYY');
    }
}

module.exports = EventController;
