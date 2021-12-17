const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../secrets');

module.exports = (req, res, next) => {
  // Pull token from header
  // Check if token is there, if not respond: "token required"
  // If token is there, verify it
    // if invalid: "token invalid"
    // if valid, then next
  // Style Note: Using return as an escape instead of if / else
  console.log('\n### RESTRICTED ###  ')
  const token = req.headers.authorization;
  if (!token){
    return next({ status: 401, message: 'token required'})
  } 
  jwt.verify(token, JWT_SECRET, (err, decoded)  => {
    if (err) {
      return next({ status: 401, message: 'token invalid'})
    }
    req.decodedJwt = decoded;
    next();
  })




  /*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */

};
