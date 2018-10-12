const createError = require('http-errors');

module.exports.isAuthenticated = (req, res, next) => {

  if (req.isAuthenticated()) {
    console.log('you are auth ');
    next();
    
  } else {  
    throw createError(403);
      
  }
}
  