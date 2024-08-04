const router = require("express").Router();
const db = require("../Config/db");
const bcrypt = require('bcrypt');
const Events = require("../Controller/EventController")
const CountController = require('../Controller/CountController'); // Adjust the path as necessary
const UserController = require("../Controller/UserController")
const upload = require("../Middleware/uploadMiddleware")

router.get('/Home', (req, res) => {
    res.render('index');
});

router.get("/",(req,res)=>{
    res.render("form")
})
// Register route
router.post("/register", async (req, res) => {
    const { nom, tel, email , password} = req.body;
    console.log({nom, tel, email , password})
    if (!nom || !email || !password || !tel) {
        return res.status(400).send('Please fill in all fields.');
    }
     // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user if the email does not exist
    const sql = 'INSERT INTO users (name, email, password , isAdmin , tel) VALUES (?, ?, ?,0,?)';
    db.query(sql, [nom, email, hashedPassword,tel], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Database error. Please try again later.');
        }
        return res.render("index");
    });
});

//login route

//do the login 
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Database error. Please try again later.');
        }

        if (result.length === 0) {
            return res.status(401).send('Invalid email or password.');
        }

        const user = result[0];
        
        // Compare the provided password with the hashed password
        bcrypt.compare(password, user.password, (err, match) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.status(500).send('Error processing your request.');
            }

            if (match) {
                if (user.isAdmin == 1) {
                    res.redirect("/Home");
                } else {
                    res.send("Keep going");
                }
            } else {
                res.status(401).send('Invalid email or password.');
            }
        });
    });
});

//Admin

router.get("/InsertEvent",(req,res)=>{
    res.render("FormularieEvent")
})
//get all event
router.get("/GetEvent", Events.getAllEvent)

router.get('/Detail/:id', Events.getEventById);

router.get('/Dashboard', CountController.showDashboard);

router.get("/Admin/users",UserController.showUsers)

router.get("/Admin/Events",Events.GetEvents)

router.get("/FormAdd",(req,res)=>{
    res.render("FormularieEvent")
})
router.post("/Add",upload.single("image"),Events.AddEvents)
//show the update form
router.get("/FormUpdate/:id",Events.ShowEvent)
//update the event
router.post("/updateEvent/:id", upload.single('image'), Events.Update)

router.delete("/FormDelete/:id",Events.Delete)

module.exports = router;    