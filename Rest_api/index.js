const express = require('express')
const data = require('./MOCK_DATA.json')
const bodyParser = require('body-parser')
const app = express()
const port = 8000
app.use(bodyParser.json())


// hybride api for all users
app.get('/api/users', (req, res) => {
    res.json(data)
})
// html rendring api for all users
app.get('/users', (req, res) => {
    const html = `
    <h1>Users</h1>
    <ul>
    ${data.map(user => `<li>${user.first_name} ${user.last_name}</li>`).join('')}
     </ul>
    `
    res.send(html)
})

// get method for single user || or dynamic path parameter
app.get('/api/users/:id', (req, res) => {
    const id = req.params.id
    const user = data.find(user => user.id == id)
    if (!user) {
        res.status(404).send('User not found')
    }
    res.json(user)
})

// post method for adding new user
app.post('/api/users', (req, res) => {
    const user = req.body
    data.push(user)
    res.send(data)
    console.log("User added successfully")
})

// edit the user with id
app.patch('/api/users/:id', (req, res) => {
    const id = req.params.id
    const user = data.find(user => user.id == id)
    if (!user) {
        res.status(404).send('User not found')
    }
    const newUser = req.body
    data.forEach(user => {
        if (user.id == id) {
            user.first_name = newUser.first_name
            user.last_name = newUser.last_name
            user.email = newUser.email
        }
    })
    console.log("User updated successfully")
    res.json(data)
})

// delete the user with id
app.delete('/api/users/:id', (req, res) => {
    const id = req.params.id
    const user = data.find(user => user.id == id)
    if (!user) {
        res.status(404).send('User not found')
    }
    data.splice(data.indexOf(user), 1)
    console.log("User deleted successfully")
    res.send(`User with id ${id} has been deleted`)
})



app.listen(port, (err) => {
    if (err) {
        console.log(err)
    }
    console.log(`Server is running on port ${port}`)
})

