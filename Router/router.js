const router = require("express").Router();
const db = require("../Config/db");

router.get('/', (req, res) => {
    res.render('index');
});

//do the login 
router.post("/login", (req, res) => {
    const { email, password } = req.body;
    const sql = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}';`;
    db.query(sql, (err, result) => {
        if (result.length === 0) {
            req.flash('message', 'Invalid email or password');
            res.redirect('/');
            return;
        }
        // req.session.user = result[0];
        req.session.user = {
            id: result[0].id,
            email: result[0].email,
            admin: result[0].admin 
        };
        if (result[0].admin == 1) {
            res.send("welcome admin")
        } else {
            res.render("index")
        }
    });
});
//do the register
router.post("/register",(req,res)=>{
    const {nom,email,password} = req.body; 
    const sql = `INSERT INTO users (name, email, password) VALUES (?,?,?)`;
    db.query(sql,[nom,email,password],(err,result)=>{
        if(err){
            res.status(500).send('Cet email est lie a un compte existant ! Veuillez saisir autre . <a href="/SignUp">go back</a>')
        }
        res.render("index");
    })
})


// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error :(');
        }
        res.redirect('/'); // Redirect to the login page after logout
    });
});


module.exports = router;