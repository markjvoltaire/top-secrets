const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const users = require('../lib/controllers/users');
const UserService = require('../lib/services/UserService');
const Secrets = require('../lib/models/Secrets');
const { agent } = require('supertest');

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
    });
  });

  it('should get all secrets', async () => {
    const secrets = await Secrets.getAll();
    const agent = request.agent(app);

    const user = await UserService.hash({
      username: 'mark',
      password: 'helloworld',
    });

    await agent
      .post('/api/v1/users/sessions')
      .send({ username: 'mark', password: 'helloworld' });

    const res = await agent.get('/api/v1/secrets');
    expect(res.body).toEqual([
      {
        createdAt: expect.any(String),
        description: 'a message from cpu',
        id: '1',
        title: 'hello world',
      },
    ]);
  });

  it('should delete session', async () => {
    const agent = request.agent(app);

    const user = await UserService.hash({
      username: 'mark',
      password: 'helloworld',
    });

    await agent
      .post('/api/v1/users/sessions')
      .send({ username: 'mark', password: 'helloworld' });

    const res = await agent.get('/api/v1/secrets');
    expect(res.body).toEqual([
      {
        createdAt: expect.any(String),
        description: 'a message from cpu',
        id: '1',
        title: 'hello world',
      },
    ]);

    const deleteAgent = await agent.delete('/api/v1/users/sessions');
    console.log('deleteAgent', deleteAgent.body);
    expect(deleteAgent.body).toEqual({
      success: true,
      message: 'you signed out',
    });
  });
});
