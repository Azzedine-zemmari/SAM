const express = require('express');
require('dotenv').config();
const rout = require("./Router/router")
const session = require('express-session');
const flash = require('connect-flash');
const db = require('./Config/db');
const app = express();
const Port = process.env.PORT;


// Set up session middleware
app.use(session({
    secret: process.env.SESSION_SECRET, // Use the secret key from the environment variable
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set secure to true if using HTTPS
}));

// Set up flash messages
app.use(flash());

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static('public'));

//for router
app.use(rout);

// Start the server
app.listen(Port, () => {
    console.log(`Server is running at http://localhost:${Port}`);
});
