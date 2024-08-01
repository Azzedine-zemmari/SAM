const express = require('express');
const router = express.Router();
const db = require('../Config/db');
require('dotenv').config();

router.get('/', (req, res) => {
    res.render('Auth');
});

// Register route
router.post("/register", (req, res) => {
    const { nom, email, password } = req.body;
    if (!nom || !email || !password) {
        return res.status(400).send('Please fill in all fields.');
    }

    // Insert the new user if the email does not exist
    const sql = 'INSERT INTO users (name, email, password , isAdmin) VALUES (?, ?, ?,0)';
    db.query(sql, [nom, email, password], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Database error. Please try again later.');
        }
        return res.send('good');
    });
});

// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error :(');
        }
        return res.redirect('/'); // Redirect to the login page after logout
    });
});

module.exports = router;

