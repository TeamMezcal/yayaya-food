require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const passport = require('passport');
const session      = require('express-session')


require('./config/passport.config').setup(passport); 


const usersRoute = require('./routes/users.routes')
const mealsRoute = require('./routes/meals.routes')
const sessionsRoute = require('./routes/sessions.routes')
const reviewsRoute = require('./routes/reviews.routes')


mongoose.Promise = Promise;
mongoose
  .connect('mongodb://localhost/yayaya-project', {useMongoClient: true})
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.COOKIE_SECRET || 'Super Secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 2419200000
  }
 }));

app.use(passport.initialize()); 
app.use(passport.session()); 

app.use((req, res, next) => {
  res.locals.session = req.user; 
  next(); 
})


// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';
//@TO-DO:
app.use((req, res, next) => {
  res.locals.session = req.user; 
  next(); 
})



// const index = require('./routes/index');
// app.use('/', index);

app.use('/users', usersRoute)

app.use('/sessions', sessionsRoute);

app.use('/meals', mealsRoute);

app.use('/reviews', reviewsRoute);




module.exports = app; 
