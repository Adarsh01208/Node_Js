// server.js
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

const secretKey = 'your_secret_key';

// Dummy user data for demonstration purposes
const users = [
  { id: 1, username: 'user1', password: bcrypt.hashSync('password1', 8) },
  { id: 2, username: 'user2', password: bcrypt.hashSync('password2', 8) }
];

// Render login form
app.get('/login', (req, res) => {
  res.send(`
    <form method="POST" action="/login">
      <input type="text" name="username" placeholder="Username" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  `);
});

// Handle login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
    return res.json({ token });
  }

  res.send('Invalid username or password');
});

// Middleware to protect routes
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.userId = decoded.userId;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Protected route
app.get('/dashboard', authenticateJWT, (req, res) => {
  res.send(`Welcome to your dashboard, user ${req.userId}`);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
