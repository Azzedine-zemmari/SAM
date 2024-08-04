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
    //admin part
    static async GetEvents(req, res) {
        try {
            const result = await Event.getEvent();
            console.log('Database result:', result); // Log the raw data from the database
            result.forEach(event => {
                event.formattedDateS = EventController.formatDate(event.EventStart);
                event.formattedDateE = EventController.formatDate(event.EventEnd);
                console.log('Formatted date for event:', event); // Log each event with formatted date
            });
            res.render("Admin/TableEvent", { data: result });
        } catch (error) {
            console.error('Error fetching events:', error);
            res.status(500).send('Error fetching events.');
        }
    }
    static async AddEvents(req,res){
        if (!req.file) {
            return res.status(400).send('No files were uploaded.');
          }
        
          // Get form data
          const { name, description, adress, EventStart, EventEnd, EventPlace } = req.body;
          const image = req.file.filename; // Get the filename of the uploaded image
        
          // Insert data into the database
          try {
            const event = {
              name,
              description,
              adress,
              EventStart,
              EventEnd,
              EventPlace,
              image,
            };
            await Event.InsertEvent(event);
            res.redirect('/Admin/Events');
          } catch (error) {
            console.log(error);
            res.status(500).send('Error creating event');
          }
    }
    //show form to update event
    static async ShowEvent(req,res){
        const id = req.params.id;
    try {
        const event = await Event.UpdateEvent(id);
        if (event.length) {
            const eventData = event[0];
            eventData.EventStart = eventData.EventStart ? new Date(eventData.EventStart).toISOString().split('T')[0] : null;
            eventData.EventEnd = eventData.EventEnd ? new Date(eventData.EventEnd).toISOString().split('T')[0] : null;
            res.render("Admin/FormUpdate", { event: eventData });
        } else {
            res.status(404).send('Event not found');
        }
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).send('Error fetching event');
    }
    }
    static async Update(req,res){
        const id = req.params.id
        const {name,description,adress,EventStart,EventEnd,EventPlace} = req.body
        const image = req.file ? req.file.filename : req.body.currentImage; // Use the new image if uploaded, otherwise keep the current image

        try {
            await Event.Update(id, { name, description, adress, EventStart, EventEnd, EventPlace, image });
            res.redirect('/Admin/Events');
        } catch (error) {
            console.error('Error updating event:', error);
            res.status(500).send('Error updating event');
        }
    }
    static async Delete(req,res){
        const id = req.params.id
        try {
            console.log(`Attempting to delete event with ID: ${id}`); // Debug log
            const result = await Event.DeleteEvent(id);
            console.log(`Deletion result: ${result}`); // Debug log
            res.redirect("/Dashboard")
        } catch (error) {
            console.error('Error deleting event:', error);
            res.status(500).send('Error deleting event');
        }
    }
}

module.exports = EventController;
