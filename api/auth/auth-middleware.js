const User = require('../users/users-model');

// Register + Login
// Add un & pwd 'missing; check here
// "username and password required"
const checkUnAndPwdProvided = (req, res, next) => {
    console.log('\n ### CHECK IF UN & PWD PROVIDED !!! ### ')
    if (req.body.username === undefined || req.body.password === undefined){
        next({ status: 422, message: "username and password required"})
    } else {
        next();
    }
}

// Register Only
// Add un check here to see if it already exists
// Taken: "username taken".
const checkUnTaken = (req, res, next) => {
    console.log('\n ### CHECK IF UN IS TAKEN !!! ### ')
    next();
}

// Login Only
// un does not exist in db
// Return: "invalid credentials"
const checkUnExistsInDb = (req, res, next) => {
    console.log('\n ### CHECK IF UN EXISTS IN DB !!! ### ')
    next();
}


module.exports = {
    checkUnAndPwdProvided,
    checkUnTaken,
    checkUnExistsInDb,
}