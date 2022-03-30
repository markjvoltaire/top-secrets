const { Router } = require('express');
const req = require('express/lib/request');
const { request } = require('../app');
const User = require('../models/User');
const UserService = require('../services/UserService');
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const newUser = await User.createUser({
        username: req.body.username,
        password: req.body.password,
      });
      res.send(newUser);
    } catch (error) {
      next(error);
    }
  })

  .post('/sessions', async (req, res, next) => {
    console.log('req.body', req.body);
    try {
      const user = await UserService.signIn(req.body);
      res
        .cookie(process.env.COOKIE_NAME, user.authToken(), {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
        })

        .send({ message: 'you are logged in now' });
    } catch (error) {
      next(error);
    }
  });
