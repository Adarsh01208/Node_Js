const express = require('express')
const data = require('./MOCK_DATA.json')
const app = express()
const port = 8000


// hybride api for all users
app.get('/api/users', (req,res)=>{
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
    res.json(user)
})

// post method for adding new user
app.post('/api/users', (req, res) => {
    const user = req.body
    data.push(user)
    res.send('User has been added')
})

// edit the user with id
app.patch('/api/users/:id', (req, res) => {
    const  id = req.params.id
    const user = data.find(user => user.id == id)
    if (!user) {
        res.status(404).send('User not found')
    }
    res.send(`User with id ${id} has been updated`)
})

// delete the user with id
app.delete('/api/users/:id', (req, res) => {
    const id = req.params.id
    const user = data.find(user => user.id == id)
    if (!user) {
        res.status(404).send('User not found')
    }
    newdata = data.filter(user => user.id != id)
    //res.json(newdata)
    res.send(`User with id ${id} has been deleted successfully`);
})



app.listen(port, (err)=> {
    if(err){
        console.log(err)
    }
    console.log(`Server is running on port ${port}`)
})

