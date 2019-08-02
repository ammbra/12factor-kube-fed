const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
var request = require('request');


const {getHomePage} = require('./routes/index');
const {addPropertyPage, addProperty, deleteProperty, editProperty, editPropertyPage, getProperties, getProperty} = require('./routes/property');

var port = 3000;
var host = ("127.0.0.1" || "localhost");


// configure middleware
app.set('port', port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder

app.use(fileUpload()); // configure fileupload

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
// routes for the app

app.get('/', getHomePage);

app.get('/add', addPropertyPage);
app.get('/edit/:id', editPropertyPage);
app.get('/delete/:id/:rev', deleteProperty);
app.post('/add', addProperty);
app.post('/edit/:id', editProperty);
app.get('/get', getProperties);


// set the app to listen on the port
app.listen(port, () = > {
    console.log(`Server running on port: ${port}`);
})
;