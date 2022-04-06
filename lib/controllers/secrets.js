const { Router } = require('express');
const req = require('express/lib/request');
const { request } = require('../app');
const authenticate = require('../middleware/authenticate');
const Secrets = require('../models/Secrets');
const secrets = require('../models/Secrets');

module.exports = Router().get('/', authenticate, async (req, res, next) => {
  try {
    const allSecrets = await Secrets.getAll();
    res.send(allSecrets);
  } catch (error) {
    next(error);
  }
});
