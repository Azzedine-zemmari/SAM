const CountModel = require('../Model/CountModel'); // Adjust the path as necessary
//to show the data in the countView 
class CountController {
    static async showCounts(req, res) {
        try {
            const counts = await CountModel.getCounts();
            res.render('countView', { counts }); // Render countView with counts data
        } catch (error) {
            console.error('Error fetching counts:', error);
            res.status(500).send('Error fetching counts.');
        }
    }
    //show the data in the dashboard because i have to display it on the dashboard
    static async showDashboard(req, res) {
        try {
            const counts = await CountModel.getCounts();
            res.render('Admin/Dashboard', { counts }); // Pass counts data to Dashboard view
        } catch (error) {
            console.error('Error fetching counts for dashboard:', error);
            res.status(500).send('Error fetching counts for dashboard.');
        }
    }
}

module.exports = CountController;
