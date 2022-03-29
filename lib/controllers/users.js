const { Router } = require('express');
const { request } = require('../app');
const User = require('../models/User');

module.exports = Router().post('/signup', async (req, res, next) => {
  try {
    const newUser = await User.createUser({
      username: req.body,
      username,
      password: req.body.password,
    });
    res.send(newUser);
  } catch (error) {
    return null;
  }
});
