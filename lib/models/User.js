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

  static async createUser({ username, password }) {
    const { rows } = await pool.query(
      'INSERT INTO user (username, password) VALUES ($1, $2) RETURNING *;',
      [username, password]
    );
    return new User(rows[0]);
  }
};
