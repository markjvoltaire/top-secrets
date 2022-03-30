const pool = require('../utils/pool');
const users = require('../controllers/users');
const jwt = require('jsonwebtoken');

module.exports = class User {
  id;
  username;
  #password;

  constructor(row) {
    this.id = row.id;
    this.username = row.username;
    this.#password = row.password;
  }

  static async createUser({ username, passwordHash }) {
    const { rows } = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *;',
      [username, passwordHash]
    );
    return new User(rows[0]);
  }

  static async getUserById(username) {
    const { rows } = await pool.query(
      `
      SELECT
      *
      FROM
      users
      WHERE
      username=$1
      `,
      [username]
    );
    if (!rows[0]) return null;
    return new User(rows[0]);
  }

  get password() {
    return this.#password;
  }

  set password(newHash) {
    this.#password = newHash;
  }

  authToken() {
    return jwt.sign({ ...this }, process.env.JWT_SECRET, {
      expiresIn: '1 day',
    });
  }
};
