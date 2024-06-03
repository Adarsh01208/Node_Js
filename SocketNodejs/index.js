const expreess = require('express');
const http = require('http');
const app = expreess();
const path = require('path');
const server = http.createServer(app);
const { Server } = require('socket.io');
const PORT = 8000;
const io = new Server(server);

io.on('connection', (socket) => {
    socket.on('user-message', (msg) => {
      io.emit('user-message', msg);
    //  console.log('A New user Message: ' + msg);
    });
  });

// it is used to serve static files like images, css, js files, etc.
app.use(expreess.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


server.listen(PORT, () => {
    console.log(`server is listening on *:${PORT}`);
});


