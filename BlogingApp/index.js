const exprees = require('express');
const db = require('./config/connection');
const app = exprees();

const port = 8000;

app.get('/', (req, res) => {
    res.send('Hello World');
}
);

app.listen(port, () => {
    console.log('Server is listening on port 8000');
}
);