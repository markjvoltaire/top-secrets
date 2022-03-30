const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = class UserService {
  static async hash({ username, password }) {
    console.log('username, password', username, password);
    const passwordHash = await bcrypt.hashSync(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    return await User.createUser({
      username,
      passwordHash,
    });
  }

  static async signIn({ username, password }) {
    const user = await User.getUserById(username);
    if (!user) throw new Error('no user found');

    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) throw new Error('no user found');
    return user;
  }
};
