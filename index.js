const express = require('express');
require('dotenv').config();
const rout = require("./Router/router")
const session = require('express-session');
const bodyParser = require('body-parser');
const multer = require("multer")
const methodOverride = require('method-override');
const app = express();
const Port = 3000;

//config db
const db = require('./Config/db');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// Set up session middleware
app.use(session({
    secret: "helloworld", // Use the secret key from the environment variable
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false,
        maxAge: 24 * 60 * 60 * 1000 // duration 24 hours
     } // Set secure to true if using HTTPS
}));


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
