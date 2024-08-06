const db = require("../Config/db");

class DetailModel {
    static async getEventDetails(eventId) {
        return new Promise((resolve, reject) => {
            const eventSql = 'SELECT * FROM event WHERE id = ?';
            db.query(eventSql, [eventId], (err, eventResult) => {
                if (err) {
                    console.error('Database error in event query:', err);
                    return reject(err);
                }
                if (eventResult.length === 0) {
                    console.error('No event found with id:', eventId);
                    return reject(new Error('Event not found.'));
                }

                console.log('Event result:', eventResult);

                const speakersSql = 'SELECT * FROM speaker WHERE event_id = ?';
                const sponsorsSql = 'SELECT * FROM sponsor WHERE event_id = ?';

                db.query(speakersSql, [eventId], (err, speakersResult) => {
                    if (err) {
                        console.error('Database error in speakers query:', err);
                        return reject(err);
                    }

                    console.log('Speakers result:', speakersResult);

                    db.query(sponsorsSql, [eventId], (err, sponsorsResult) => {
                        if (err) {
                            console.error('Database error in sponsors query:', err);
                            return reject(err);
                        }

                        console.log('Sponsors result:', sponsorsResult);

                        const eventDetails = {
                            event: eventResult[0],
                            speakers: speakersResult,
                            sponsors: sponsorsResult
                        };

                        resolve(eventDetails);
                        console.log("Event details resolved:", eventDetails);
                    });
                });
            });
        });
    }
}

module.exports = DetailModel;
