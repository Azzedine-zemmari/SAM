const ActualiterModel = require("../Model/ActualiterModel");
class ActualiterController{
    static async getAllDetails(req, res) {
        try {
            const detail = await ActualiterModel.getActualiter();
            res.render('Neauveter', { data: detail }); // Pass data to the view
        } catch (error) {
            res.status(500).send('Error fetching Actualiter');
        }
    }
    // static async AddAct(req, res) {
    //     const { title, description } = req.body;

    //     try {
    //         const Act = {
    //             title,
    //             description,
    //         };
    //         await ActualiterModel.Insert(Act); // Use the correct model name here
    //         res.redirect('/Admin/Actualiter');
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).send('Error creating event');
    //     }
    // }
}


module.exports = ActualiterController