const request = require('supertest');
const server = require('../api/server');
const User = require('../api/users/users-model');
const db = require('../data/dbConfig');
const JOKES = require('./jokes/jokes-data');


beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
})
afterAll(async () => {
  await db.destroy();
})

describe('General', () => {
  it('check correct environment', () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })
})

describe('registration endpoint', () => {
  const user = { username: 'sean', password: '1234'};
  const userNoPwd = { username: 'sean'}

  it('[GET] /auth/register - pass only un (no pwd), returns 401', async () => {
    let res = await request(server).post('/api/auth/register').send(userNoPwd);
    expect(res.status).toBe(401);
  })

  it('[GET] /auth/register - pass un & pwd, returns 201 for user created', async () => {
    let res = await request(server).post('/api/auth/register').send(user);
    expect(res.status).toBe(201);
  })

  it('[GET] /auth/register - after 201, confirms user is IN the db', async () => {
    const [userExists] = await db('users').where('username', user.username);
    expect(userExists).toMatchObject({ username: user.username });
  })

  it('[GET] /auth/register - attempts to register existing un, returns 422', async () => {
    let res = await request(server).post('/api/auth/register').send(user);
    expect(res.status).toBe(422);
  })

})

describe('login endpoint',  () => {
  const user = { username: 'sean', password: '1234'};
  const userNoUsername = { password: '1234'};
  const userNotExist = { username: 'johnDoe', password: '1234'};
  const userWrongPwd = { username: 'sean', password: '12345'};

  it('[GET] /auth/login pass only pwd (no un), returns 401', async () => {
    let res = await request(server).post('/api/auth/login').send(userNoUsername);
    expect(res.status).toBe(401);
    })
  it('[GET] /auth/login no such username, returns 401', async () => {
    let res = await request(server).post('/api/auth/login').send(userNotExist);
    expect(res.status).toBe(401);
    })
  it('[GET] /auth/login invalid pwd, returns 401', async () => {
    let res = await request(server).post('/api/auth/login').send(userWrongPwd);
    expect(res.status).toBe(401);
  })
  it('[GET] /auth/login user logs in, returns 200', async () => {
    let res = await request(server).post('/api/auth/login').send(user);
    expect(res.status).toBe(200);
  })
})

describe('jokes endpoint', () =>{
  const user = { username: 'sean', password: '1234'};

  it('[GET] /jokes WITHOUT a token returns 401', async () => {
    let res = await request(server).get('/api/jokes');
    expect(res.status).toBe(401);
  })
  
  it('[GET] /jokes WITH a token returns jokes array', async () => {

    let login = await request(server).post('/api/auth/login').send(user);   
    let token = login.body.token
    let res = await request(server).get('/api/jokes')
      .set('Authorization', token);
    expect(res.body).toHaveLength(3);
  })
})