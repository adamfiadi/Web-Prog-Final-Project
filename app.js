const express = require('express');
const path = require('path');
const mysql = require('mysql');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config({ path: './.env' });

const app = express();

//CREATE Connection
const db = mysql.createConnection({
    host: process.env.dbHost,
    user: process.env.dbUser,
    password: process.env.dbPass,
    database: process.env.db
});

//Pointing out the directory of our file where we are currently
const publicDirectory = path.join(__dirname, './public');

//to make sure our server (exp) is using publicDirectory
app.use(express.static(publicDirectory));

//Grabbing data in many forms
app.use(express.urlencoded({ extended: false }));
//Making sure the values coming from the form come in as json
app.use(express.json());
app.use(cookieParser());

//set template engine
app.set('view engine', 'hbs');
app.use(express.static('views'));

//Connect DB and nodejs
db.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('MySQL connected...')
    }
});

//Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen('5005', () => {
    console.log('Server started on port 5005');
});