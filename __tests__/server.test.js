'use strict';

const supertest = require('supertest');
const {sequelizeDatabase, app} = require('../src/auth/server');

const request = supertest(app);

beforeAll(async () => {
  await sequelizeDatabase.sync();
});

afterAll(async () => {
  await sequelizeDatabase.drop();
});

describe('API Server', () => {

  it('handles invalid requests', async () => {
    const response = await request.get('/foo');

    expect(response.status).toEqual(404);
  });

  it('handles errors', async () => {
    const response = await request.get('/bad');

    expect(response.status).toEqual(500);
    expect(response.body.route).toEqual('/bad');
    expect(response.body.message).toEqual('this route is bad');
  });

  it('handles root path', async () => {
    const response = await request.get('/');

    expect(response.status).toBe(200);
    expect(response.text).toEqual('hello');
  });


});

describe('User CRUD', () => {

  it('Creates a User', async() => {
    let response = await request.post('/signup').send({
      username: 'test',
      password: 'pword',
    });

    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual('test');
  });

});
