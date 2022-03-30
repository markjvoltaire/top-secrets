const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const users = require('../lib/controllers/users');
const UserService = require('../lib/services/UserService');

describe('top-secrects routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('signs a user up by sending a post route', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({ username: 'mark', password: 'helloworld' });

    expect(res.body).toEqual({
      id: expect.any(String),
      username: 'mark',
    });
  });

  it('should sign a user in ', async () => {
    const user = await UserService.hash({
      username: 'mark',
      password: 'helloworld',
    });

    const res = await request(app)
      .post('/api/v1/users/sessions')
      .send({ username: 'mark', password: 'helloworld' });

    expect(res.body).toEqual({
      message: 'you are logged in now',
      user,
    });
  });
});
