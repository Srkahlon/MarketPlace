const path = require('path');
const express = require("express");
const session = require('express-session');
const bodyParser = require("body-parser");
const app = express();
app.use(session({ 
    secret: 'keyboard cat', 
    cookie: { 
        secureProxy: false,
        httpOnly: false
    },
    resave: true, 
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, './src/views'));

require('./src/routes/apiRoutes.js')(app);

module.exports = app;