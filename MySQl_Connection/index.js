const express = require('express');
const connection = require('./Connection/db');
const app = express();
const port = 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to fetch and display all users
app.get('/', (req, res) => {
  const query = 'SELECT * FROM users';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err.stack);
      res.status(500).send('Database error');
      return;
    }
    res.render('index', { users: results });
  });
});

// Route to handle form submission and add a new user
app.post('/add-user', (req, res) => {
  const { name, email } = req.body;
  const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
  connection.query(query, [name, email], (err, results) => {
    if (err) {
      console.error('Error inserting user:', err.stack);
      res.status(500).send('Database error');
      return;
    }
    res.redirect('/');
  });
});

// Route to delete a user
app.post('/delete-user/:id', (req, res) => {
  const userId = req.params.id; 
  const sql = 'DELETE FROM users WHERE id = ?';
  connection.query(sql, [userId], (err, result) => {
    if (err) throw err;
    res.redirect('/'); // Redirect to the homepage or user list page
  });
});

// Route to edit a user
app.post('/edit-user/:id', (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;
  const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
  connection.query(sql, [name, email, userId], (err, result) => {
    if (err) throw err;
    res.redirect('/'); // Redirect to the homepage or user list page
  });
});


// Start the server
app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
