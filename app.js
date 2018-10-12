require('dotenv').config();

const createError   = require('http-errors');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const passport = require('passport');
const session      = require('express-session')
const cors = require('cors');
const corsConfig = require('./config/cors.config');
const app = express();


app.use(passport.initialize()); 
app.use(passport.session()); 

require('./config/passport.config').setup(passport); 
app.use(cors(corsConfig));



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

require("./config/session.config")(app);
app.use(cookieParser());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(session({
//   secret: process.env.COOKIE_SECRET || 'Super Secret',
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     secure: false,
//     httpOnly: true,
//     maxAge: 60 * 60 * 1000
//   }
//  }));


// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// const index = require('./routes/index');
// app.use('/', index);

app.use('/users', usersRoute)
app.use('/sessions', sessionsRoute);
app.use('/meals', mealsRoute);
app.use('/meals/:mealId/reviews', reviewsRoute);

// app.use((req, res, next) => {
//   next(createError(404)); 
// })

// app.use((error, req, res, next) => {
//   console.error(error);

//   res.status(error.status || 500);
//   res.json({ message: error.message });
// })



app.use(function (error, req, res, next) {
  console.error('ERROR:', error);

  res.status(error.status || 500);
  
  const data = {};
  
  if (error instanceof mongoose.Error.ValidationError) {
    res.status(400);
    for (field of Object.keys(error.errors)) {
      error.errors[field] = error.errors[field].message;
    }
    data.errors = error.errors;
  } else if (error instanceof mongoose.Error.CastError) {
    error = createError(404, 'Resource not found');
  }
  
  data.message = error.message;  
  res.json(data);
});




module.exports = app; 
