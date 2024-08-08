const router = require("express").Router();
const db = require("../Config/db");
const bcrypt = require('bcrypt');
const Events = require("../Controller/EventController")
const CountController = require('../Controller/CountController'); // Adjust the path as necessary
const UserController = require("../Controller/UserController")
const DetailController = require("../Controller/DetailsController")
const ParticipateController = require("../Controller/ParticipateController")
const SpeakerController = require("../Controller/SpeakersController")
const SponsorController = require("../Controller/SponsorController")
const ProgramController = require("../Controller/ProgrammeController")
const ActualiterController = require("../Controller/ActualiterController")
const upload = require("../Middleware/uploadMiddleware")
const isAuthenticated = require("../Middleware/auth")


router.get("/",(req,res)=>{
    res.render("Home",{ user : req.session.id })
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/decouvrir', (req, res) => {
    res.render('decouvrir')
})

router.get("/aprops",(req,res)=>{
    res.render("Apropos")
})
// router.get("/Actualiter",(req,res)=>{
//     res.render("Neauveter")
// })

router.get("/Actualiter",ActualiterController.getAllDetails)
// router.get("/insert",(req,res)=>{
//     res.render("Admin/InsertActualiter")
// })
// router.post("/InsertActualiter",ActualiterController.AddAct)
router.post('/register', async (req, res) => {
    const { nom, tel, email, password } = req.body;
    if (!nom || !email || !password || !tel) {
        return res.status(400).send('Please fill in all fields.');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user if the email does not exist
    const sql = 'INSERT INTO users (name, email, password, tel) VALUES (?, ?, ?, ?)';
    db.query(sql, [nom, email, hashedPassword, tel], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Database error. Please try again later.');
        }
        return res.render('Home');
    });
});

// Login route
router.post('/login', (req, res) => {
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
        // Compare the provided password with the hashed password
        bcrypt.compare(password, result[0].password, (err, match) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.status(500).send('Error processing your request.');
            }

            if (match) {
                req.session.user = {
                    id: result[0].id,
                    email: result[0].email,
                    isAdmin: result[0].isAdmin
                };
                console.log('User details:', req.session.user); 
                if (result[0].isAdmin == 1) {
                    return res.redirect('/Dashboard');
                } else {
                    return res.redirect('/Home');
                }
            } else {
                return res.status(401).send('Invalid email or password.');
            }
        });
    });
});

// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error :(');
        }
        res.redirect('/login'); // Redirect to the login page after logout
    });
});


//Admin

router.get("/InsertEvent",(req,res)=>{
    res.render("Admin/InsertEvent")
})

router.get("/Speaker",SpeakerController.getAllSpeaker)

//open insert speaker form 
router.get("/InsertSpeaker",(req,res)=>{
    res.render("Admin/InsertSpeaker")
})
//add speaker
router.post("/AddSpeaker",upload.single("image"),SpeakerController.AddSpeakers)
//update form 
router.get("/update/:id",upload.single("image"),SpeakerController.ShowSpeakerById)
//update speaker
router.post("/updateEventspeaker/:id",upload.single("image"),SpeakerController.UpdateSpeaker)

//delete speaker

router.delete("/DeleteSpeaker/:id",SpeakerController.DeleteSpeaker)

//sponsors

router.get("/GetSponsors",SponsorController.getAllSponsor)

router.get("/InsertSponsr",(req,res)=>{
    res.render("Admin/InsertSponsors")
})
router.post("/AddSponsor",upload.single("logo"),SponsorController.AddSponsor)

router.delete("/delete/:id",SponsorController.DeleteSponsor)

//get programm
router.get("/getProgram",ProgramController.getAllProgrammes)
router.get("/InsertProgram",(req,res)=>{
    res.render("Admin/InsertProgramme")
})
//still has error
router.post("/AddProgramm", ProgramController.AddProgramm);
//get all event
router.get("/GetEvent", Events.getAllEvent)

// router.get('/Detail/:id', Events.getEventById);

router.get('/Dashboard', CountController.showDashboard);

router.get("/Admin/users",UserController.showUsers)

router.get("/Admin/Events",Events.GetEvents)

router.get("/FormAdd",(req,res)=>{
    res.render("Admin/InsertEvent")
})
router.post("/Add",upload.single("image"),Events.AddEvents)
//show the update form
router.get("/FormUpdate/:id",Events.ShowEvent)
//update the event
router.post("/updateEvent/:id", upload.single('image'), Events.Update)

router.delete("/FormDelete/:id",Events.Delete)

//details 
router.get("/FormEvent/:eventId", isAuthenticated,DetailController.getAllDetails);

//form participate

router.get("/Participate/:id/:name",isAuthenticated,(req,res)=>{
    res.render("ParticipateForm",{ eventId: req.params.id, eventName: req.params.name , id:req.session.user.id});
})

router.post("/AddParticipation",isAuthenticated,ParticipateController.AddParticipate)

//getParticipation

router.get("/Perticipation",isAuthenticated,ParticipateController.GetParticipate)

// router.get('/Detail/:id', Events.getEventDetails);

router.get('/Admin/participations', ParticipateController.getAllParticipations);

router.post('/validateParticipation/:id', ParticipateController.validateParticipation);

module.exports = router;    