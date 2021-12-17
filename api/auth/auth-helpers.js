// Add tokenBuilder here
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../secrets');

function tokenBuilder (userFromDb) {
    const payload = {
        subject: userFromDb.id,
        username: userFromDb.username,
    }
    const options = {
        expiresIn: '1d'
    }
    const token = jwt.sign(payload, JWT_SECRET, options);
    return token;
}

module.exports = { tokenBuilder }