// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticateJWT = require('../middlewares/authenicate');
const { users } = require('../models/user');

const router = express.Router();
const secretKey = 'your_secret_key';

// Render login form
router.get('/login', (req, res) => {
  res.sendFile('login.html', { root: 'views' });
});

// Handle login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
    return res.json({ token });
  }

  res.status(401).send('Invalid username or password');
});

// Protected route
router.get('/dashboard', authenticateJWT, (req, res) => {
  res.send(`Welcome to your dashboard, user ${req.user.userId}`);
});

module.exports = router;
