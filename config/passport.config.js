const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');
const createError = require('http-errors'); 



module.exports.setup = (passport) => {
  
  passport.serializeUser((user, next) => {
    next(null, user._id);
  });

  passport.deserializeUser((id, next) => {
    User.findById(id)
      .then(user => next(null, user))
      .catch(error => next(error))
  });

  passport.use('auth-local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, next) => {   
    console.log('dsadas' + email);
     
    User.findOne({ email: email })
      .then(user => {
        if (!user) {
        console.log('no user');
                  
          throw createError(401, 'Invalid email ');
        } else {
          return user.checkPassword(password)
            .then(match => {                            
              if (!match) {
                console.log('wrong password');
                                
                throw createError(401, 'Invalid password');
              } else {
                              
                next(null, user);
              }
            })
        }
      })
      .catch(error => {
        console.log('5');
        
        next(error);
      })
  }));
}