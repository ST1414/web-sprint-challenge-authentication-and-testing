const User = require('../users/users-model');

// Register + Login
// Add un & pwd 'missing; check here
// "username and password required"
const checkUnAndPwdProvided = (req, res, next) => {
    if (req.body.username === undefined || req.body.password === undefined){
        next({ status: 401, message: "username and password required"})
    } else {
        next();
    }
}

// Register Only
// Add un check here to see if it already exists
// Taken: "username taken".
const checkUnTaken = (req, res, next) => {
    const { username } = req.body;
    User.findBy({username})
        .then( ([userFromDb]) => {
            if (userFromDb) {
                next({ status: 422, message: "username taken"})
            } else {
                next();
            }
        })
        .catch( next );
}

// Login Only
// un does not exist in db
// Return: "invalid credentials"
const checkUnExistsInDb = (req, res, next) => {
    const { username } = req.body;
    User.findBy({username})
        .then( ([userFromDb]) => {
            if (!userFromDb) {
                next({ status: 401, message: "invalid credentials"})
            } else {
                next();
            }
        })
        .catch( next );
}


module.exports = {
    checkUnAndPwdProvided,
    checkUnTaken,
    checkUnExistsInDb,
}