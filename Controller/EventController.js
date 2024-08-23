const Event = require("../Model/EventModel");
const moment = require("moment");

class EventController {
    static async getAllEvent(req, res) {
        try {
            const result = await Event.getEvent();
            console.log('Database result:', result); // Log the raw data from the database
    
            // Check if there is any data
            if (!result || result.length === 0) {
                console.log('No events found.');
                res.render("eventsSection", { data: [], message: 'No events found.' });
                return;
            }
    
            result.forEach(event => {
                event.formattedDate = EventController.formatDate(event.EventDate);
                console.log('Formatted date for event:', event); // Log each event with formatted date
            });
    
            res.render("eventsSection", { data: result });
        } catch (error) {
            console.error('Error fetching events:', error);
            res.status(500).send('Error fetching events.');
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
            res.render("Admin/Event", { data: result });
        } catch (error) {
            console.error('Error fetching events:', error);
            res.status(500).send('Error fetching events.');
        }
    }
    static async AddEvents(req, res) {
        let formData = {
            name: '',
            description: '',
            adress: '',
            EventStart: '',
            EventEnd: '',
            EventPlace: ''
        };
        let errorMessage = null;
    
        if (req.method === 'POST') {
            try {
                formData = {
                    name: req.body.name,
                    description: req.body.description,
                    adress: req.body.adress,
                    EventStart: req.body.EventStart,
                    EventEnd: req.body.EventEnd,
                    EventPlace: req.body.EventPlace
                };
    
                // Handle file upload if exists
                if (req.file) {
                    formData.image = req.file.filename;
                }
    
                // Validate required fields
                if (!formData.name || !formData.description || !formData.adress || !formData.EventStart || !formData.EventEnd || !formData.EventPlace) {
                    throw new Error('All fields are required.');
                }
    
                // Insert event into the database 
                await Event.InsertEvent(formData);
    
                // Redirect to the event list 
                return res.redirect('/Admin/Events');
            } catch (error) {
                console.error('Error during event insertion:', error);
    
                if (error.message.includes('ValidationError')) {
                    errorMessage = 'There was a validation error. Please check your input data.';
                } else if (error.message.includes('File')) {
                    errorMessage = 'There was an error with the file upload. Please try again.';
                } else if (error.message === 'All fields are required.') {
                    errorMessage = 'Please fill in all required fields.';
                } else {
                    errorMessage = 'An error occurred while inserting the event. Please try again.';
                }
    
                // Render the form with error message
                return res.render('Admin/InsertEvent', {
                    formData,
                    errorMessage
                });
            }
        }
    
        // Render the form with empty data or previously entered data
        res.render('Admin/InsertEvent', { formData, errorMessage });
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
            res.render("Admin/FormUpdateEvent", { event: eventData });
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
