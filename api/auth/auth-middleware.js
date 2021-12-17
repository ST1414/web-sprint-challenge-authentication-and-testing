// Register + Login
// Add un & pwd 'missing; check here
// "username and password required"
const checkUnAndPwdExist = (req, res, next) => {
    next();
}

// Register Only
// Add un check here to see if it already exists
// Taken: "username taken".
const checkUnTaken = (req, res, next) => {
    next();
}

// Login Only
// un does not exist in db
// Return: "invalid credentials"
const checkUnExists = (req, res, next) => {
    next();
}

// Login only
// pwd is incorrect
// Return "invalid credentials".
const checkPwdIsValid = (req, res, next) => {
    next();
}

module.exports = {
    checkUnAndPwdExist,
    checkUnTaken,
    checkUnExists,
    checkPwdIsValid,
}