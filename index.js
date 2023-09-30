//Importing the modules needed 
var express = require('express');
var ejs = require('ejs');
var bodyParser= require ('body-parser');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');

//Creating the express application object
const app = express()
const port = 8000
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser());

//Defining the database connection
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'myDatabase',
    password: 'qwerty',
    database: 'myDatabase'
});

//Connect the database
db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('Connected to the database')
});
global.db = db;

//Set the directory where the files will be
app.use(express.static(__dirname+"/public"));

// Set the directory where Express will pick up HTML files
// __dirname will get the current directory
app.set('views',__dirname+'/views');

// Tell Express that we want to use EJS as the templating engine
app.set('view engine', 'ejs');

// Tells Express how we should process html files
// We want to use EJS's rendering engine
app.engine('html', ejs.renderFile);

var websiteData = {theName: "Minimalist HR"}

// Requires the main.js file inside the routes folder passing in the Express app and data as arguments.  All the routes will go in this file
require("./routes/main.js")(app, websiteData);

// Start the web app listening
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
