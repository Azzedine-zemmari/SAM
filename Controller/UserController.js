const Users = require("../Model/UsersModel");

class UsersController {
    static async showUsers(req, res) {
        try{
            const result = await Users.getUsers();
            res.render("Admin/TableUsers", { data: result });
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).send('Error fetching users.');
        }

    }
        
        static async DeleteUser(req, res) {
            const userId = req.params.id;
            try{
                const User = await Users.DeleteUser(userId);
                res.status(200).json({ message: 'User deleted successfully' });
            }catch (error) {
                console.error('Error Deleting user:', error);
                res.status(500).send('Error Deleting user');
            }
    }

}
module.exports = UsersController;