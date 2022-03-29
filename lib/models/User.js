const pool = require('../utils/pool');
const users = require('../controllers/users');

module.exports = class User {
  id;
  username;
  password;

  constructor(row) {
    this.id = row.id;
    this.username = row.username;
    this.password = row.password;
  }

  static async createUser({ username, password }) {
    const { rows } = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *;',
      [username, password]
    );
    return new User(rows[0]);
  }
};
