const express = require('express');
require('dotenv').config();
const rout = require("./Router/router")
const app = express();
const Port = process.env.PORT;

//config db
const db = require('./Config/db');


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
