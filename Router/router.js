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
const isAdmin = require("../Middleware/isAdmin")


router.get("/",(req,res)=>{
    res.render("Home", { session: req.session })
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
// 

router.get("/Actualiter",ActualiterController.getAllDetails)
// router.get("/insert",(req,res)=>{
//     res.render("Admin/InsertActualiter")
// })
// router.post("/InsertActualiter",ActualiterController.AddAct)
// Register route
router.post('/register', async (req, res) => {
    const { nom, tel, email, password } = req.body;
    if (!nom || !email || !password || !tel) {
        return res.render('login', { error: 'Please fill in all fields.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (name, email, password, tel) VALUES (?, ?, ?, ?)';
    db.query(sql, [nom, email, hashedPassword, tel], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.render('login', { error: 'Database error. Please try again later.' });
        }
        req.session.user = {
            id: result.insertId,
            email: email,
            isAdmin: false
        };
        req.session.save(err => {
            if (err) {
                console.error('Session save error:', err);
                return res.render('login', { error: 'Registration succeeded, but there was an issue with the session. Please try logging in.' });
            }

            return res.redirect('/');
        });
    });
});


// Login route
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.render('login', { error: 'Database error. Please try again later.' });
        }

        if (result.length === 0) {
            return res.render('login', { error: 'Invalid email or password.' });
        }

        bcrypt.compare(password, result[0].password, (err, match) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.render('login', { error: 'Error processing your request.' });
            }

            if (match) {
                req.session.user = {
                    id: result[0].id,
                    email: result[0].email,
                    isAdmin: result[0].isAdmin
                };
                req.session.save(err => {
                    if (err) {
                        console.error('Session save error:', err);
                        return res.render('login', { error: 'Login succeeded, but there was an issue with the session. Please try logging in again.' });
                    }

                    if (req.session.user.isAdmin) {
                        return res.redirect('/Dashboard');
                    } else {
                        return res.redirect('/');
                    }
                });
            } else {
                return res.render('login', { error: 'Invalid email or password.' });
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

router.get("/InsertEvent",isAdmin,(req,res)=>{
    res.render("Admin/InsertEvent")
})

//Get the all the speaker inside a table in the admin part
router.get("/Speaker",isAdmin,SpeakerController.getAllSpeaker)

//open insert speaker form 
router.get("/InsertSpeaker",isAdmin,(req,res)=>{
    res.render("Admin/InsertSpeaker")
})
//add speaker
router.post("/AddSpeaker",isAdmin,upload.single("image"),SpeakerController.AddSpeakers)
//get the update form for speaker 
router.get("/update/:id",isAdmin,upload.single("image"),SpeakerController.ShowSpeakerById)
//update speaker
router.post("/updateEventspeaker/:id",isAdmin,upload.single("image"),SpeakerController.UpdateSpeaker)

//delete speaker

router.delete("/DeleteSpeaker/:id",isAdmin,SpeakerController.DeleteSpeaker)

//get all the sponsor inside the admin part

router.get("/GetSponsors",isAdmin,SponsorController.getAllSponsor)

//get a form to insert new sponsor
router.get("/InsertSponsr",isAdmin,(req,res)=>{
    res.render("Admin/InsertSponsors")
})
//Add new sponsor
router.post("/AddSponsor",isAdmin,upload.single("logo"),SponsorController.AddSponsor)
//delete sponsor
router.delete("/delete/:id",isAdmin,SponsorController.DeleteSponsor)

//get all the programm in the admin Part
router.get("/getProgram",isAdmin,ProgramController.getAllProgrammes)

//get the formulaire to insert new Programme
router.get("/InsertProgram",isAdmin,(req,res)=>{
    res.render("Admin/InsertProgramme")
})
//still has error
router.post("/AddProgramm",isAdmin, ProgramController.AddProgramm);
//get all event part user
router.get("/GetEvent", Events.getAllEvent)


//get the Dashboard 
router.get('/Dashboard',isAdmin, CountController.showDashboard);

//get all the user in the admin part
router.get("/Admin/users",isAdmin,UserController.showUsers)
//get all the events in the admin part
router.get("/Admin/Events",isAdmin,Events.GetEvents)
//get form to insert Events
router.get("/FormAdd",isAdmin,(req,res)=>{
    res.render("Admin/InsertEvent")
})
//insert event
router.post("/Add",isAdmin,upload.single("image"),Events.AddEvents)
//show the update form
router.get("/FormUpdate/:id",isAdmin,Events.ShowEvent)
//update the event
router.post("/updateEvent/:id",isAdmin, upload.single('image'), Events.Update)
//delete event
router.delete("/FormDelete/:id",isAdmin,Events.Delete)

//details 
router.get("/FormEvent/:eventId",DetailController.getAllDetails);

//form participate
//get the participation form
router.get("/Participate/:id/:name",isAuthenticated,(req,res)=>{
    res.render("ParticipateForm",{ eventId: req.params.id, eventName: req.params.name , id:req.session.user.id});
})
//insert a participation
router.post("/AddParticipation",isAuthenticated,ParticipateController.AddParticipate)

//go to the page reservation to check he's perticipations

router.get("/Perticipation",isAuthenticated,ParticipateController.GetParticipate)

//admin get all the participation

router.get('/Admin/participations',isAdmin,ParticipateController.getAllParticipations);
//validate a participation
router.post('/validateParticipation/:id',isAdmin, ParticipateController.validateParticipation);

//form 
router.get("/Form",(req,res)=>{
    res.render("Froms");
})

module.exports = router;    