const request = require('supertest');
const server = require('../api/server');
const User = require('../api/users/users-model');
const db = require('../data/dbConfig');

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
})
afterAll(async () => {
  await db.destroy();
})

describe('jokes endpoint', () =>{
  // Test jokes end points is restricted wo. token
  // Test jokes end pt is NOT restricted w. token



})


describe('registration endpoint', () => {
  // Test registration checks for un & pwd
  // Test registration check for un existing in db

})


describe('login endpoint', () => {
  // Test login checks for un & pwd
  // Test login for no such un
  // Test pwd for invalid pwd

})

