const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const users = require('../lib/controllers/users');

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

    console.log('res', res.body);

    expect(res.body).toEqual({
      id: expect.any(String),
      username: 'mark',
      password: 'helloworld',
    });
  });
});
