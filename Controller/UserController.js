const Users = require("../Model/UsersModel");

class UsersController {
    static async showUsers(req, res) {
        try{
            const result = await Users.getUsers();
            res.render("Admin/User", { data: result });
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).send('Error fetching users.');
        }

    }
        
    

}
module.exports = UsersController;