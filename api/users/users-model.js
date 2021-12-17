const db = require('../../data/dbConfig');

// findBy; returns an array of objects
async function findBy (filter){
    return await db('users').where(filter)
}

// create; return a single user object
async function create (user){
    const id = await db('users').insert(user);
    return findBy( { id } );
}

module.exports = { findBy, create };