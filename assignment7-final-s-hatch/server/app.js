const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const appRoutes = require('./routes/reviews');
const apiReviews = require('./routes/api/api-reviews');
const path = require('path');
require('dotenv').config({path:`${__dirname}/.env`});

const app = express();

mongoose.connect(
    // connects the app to the database and specifies the name of the database
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.dgxxefi.mongodb.net/?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'MBTAReviews'
    }
)
.then(() => {
    console.log('Connection to MongoDB successful');
})
.catch((err) => {
    console.error(`Database connection error: ${err}`);
})

// the http method can be changed when sent from
// an html form to allow for delete and put requests from the page
app.use(methodOverride('_method'));

// allows access to html form input data
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// set the view engine to handlebars, configure
// an abbreviated extension name, and point any views to
// the main.hbs template to plug in to
const { engine } = handlebars;
app.engine('hbs', engine({
    layoutsDir: `${__dirname}/views/layouts`,
    extname: '.hbs'
}));
app.set('view engine', 'hbs');

// set the views directory
app.set('views', `${__dirname}/views`);

// creates a session to enable the use of connect-flash
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}))

// allows storage of flash messages on session object
app.use(flash());

// serve static files from the public directory
app.use(express.static(`${__dirname}/public`));

// incoming requests to the app will be sent to reviews.js
// to be further specifically routed
//app.use('/', appRoutes);
app.use('/api/reviews', apiReviews);

// as pasted from the module 13 repository, modified to have relevant
// file extensions for this project
app.use('/', (req, res) => {
    // filter for actual files we want to deliver from disk
    var pattern = new RegExp('(.css|.html|.js)+\/?$', 'gi'); 
    if (pattern.test(req.url)) {
       // in cases where the Angular app is mounted at the root url, we may need to strip a trailing slash from the redirected request 
       let url = req.url.replace(/\/$/, "");
       // deliver the requested file
       res.sendFile(path.resolve(__dirname, `../client/dist/mbta-reviews/${url}`));
    } else {
       // in this case, the request should be handled by Angular, which is index.html
       res.sendFile(path.resolve(__dirname, '../client/dist/mbta-reviews/index.html'));
    }
 });

// if a file is requested that doesn't exist, create and
// display an error
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    res.end(`${err.status} Page not found`);
    next(err);
});

module.exports = app;