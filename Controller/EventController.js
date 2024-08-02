const Event = require("../Model/EventModel");

class EventController {
    static async getAllEvent(req, res) {
        try {
            const result = await Event.getEvent();
            console.log(result)
            res.render("Dashboard", { data: result });
        } catch (error) {
            console.error('Error fetching events:', error);
            res.status(500).send('Error fetching events.');
        }
    }
}

module.exports = EventController;
