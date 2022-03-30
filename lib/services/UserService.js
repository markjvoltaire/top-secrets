const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = class UserService {
  static async hash({ username, password }) {
    const passwordHash = bcrypt.hashSync(
      password,
      Number(process.env.SALT_ROUNDS)
    );
    return User.createUser({
      username,
      passwordHash,
    });
  }
};
