// Register + Login
// Add un & pwd 'missing; check here
// "username and password required"
const checkUnAndPwdProvided = (req, res, next) => {
    console.log('\n ### CHECK IF UN & PWD PROVIDED !!! ### ')
    next();
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

// Login only
// pwd is incorrect
// Return "invalid credentials".
const checkPwdIsValid = (req, res, next) => {
    console.log('\n ### CHECK IF PWD IS VALID !!! ### ')
    next();
}

module.exports = {
    checkUnAndPwdProvided,
    checkUnTaken,
    checkUnExistsInDb,
    checkPwdIsValid,
}