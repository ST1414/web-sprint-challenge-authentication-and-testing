// Add tokenBuilder here
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../secrets');

function tokenBuilder (user) {
    const token = JWT_SECRET;
    return token;
}

module.exports = { tokenBuilder }