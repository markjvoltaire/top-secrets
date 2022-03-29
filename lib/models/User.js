const pool = require('../utils/pool');
const hats = require('../controllers/users');

module.exports = class User {
  id;
  password;

  constructor(row) {
    this.id = row.id;
    this.username = row.username;
    this.color = row.password;
  }
};
