// models/user.js
const bcrypt = require('bcryptjs');

const users = [
  { id: 1, username: 'user1', password: bcrypt.hashSync('password1', 8) },
  { id: 2, username: 'user2', password: bcrypt.hashSync('password2', 8) }
];

module.exports = { users };
