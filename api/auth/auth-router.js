const router = require('express').Router();

// Require bcryptjs
const bcryptjs = require('bcryptjs');
const BCRYPTJS_ROUNDS = 8;

// Require (1) middleware, (2) tokenBuilder, (3) JWT Secret
const { checkUnAndPwdProvided, checkUnTaken, checkUnExistsInDb, checkPwdIsValid } = require('./auth-middleware')
const { tokenBuilder } = require('./auth-helpers');
const JWT_SECRET = require('../secrets/')

// Require Model for DB access
const User = require('../users/users-model');


router.post('/register', checkUnAndPwdProvided, checkUnTaken, (req, res,next) => {
  // Take username and pwd, create hash w. bcrypt, add it to a user object, store in db
  // If success, return { id, un, and hash }; NEED to  deconstruct the response from findBy
  // Add middleware for checks and fails
  const user = req.body;
  user.password = bcryptjs.hashSync(user.password, BCRYPTJS_ROUNDS);
  User.create(user)
    .then( ([response]) => { 
      console.log(response);
      res.json(response)
    })
    .catch(next);
  

  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.
    DO NOT EXCEED 2^8 ROUNDS OF HASHING!

    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `users` table
        "password": "foobar"          // needs to be hashed before it's saved
      }

    2- On SUCCESSFUL registration,
      the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
  */
});

router.post('/login', checkUnAndPwdProvided, checkUnExistsInDb, (req, res, next) => {
  // Receive un and pwd
  // Check db for un and pull the stored user from the dbhash from db
  // Compare the provided pwd and hash using bcryptjs
  // If success (match), call tokenBuilder and return { msg + token }
  // Add middleware for checks and fails
  const { username, password } = req.body;
  User.findBy({username})
    .then( ([userFromDb]) => {
      if ( userFromDb && bcryptjs.compareSync(password, userFromDb.password) ){
        const token = tokenBuilder(userFromDb);
        res.json({
          message: `welcome, ${userFromDb.username}`,
          token: token
        })
      } else {
        next({ status: 401, message: 'invalid credentials' })
      }
    })
    .catch(next);


  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
});

module.exports = router;
