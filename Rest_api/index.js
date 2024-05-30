const express = require('express')
const data = require('./MOCK_DATA.json')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()
const port = 8000

// middleware for parsing json data
app.use(bodyParser.json())

app.use((req, res, next) => {
    fs.writeFile('./log.txt', `${req.method}  request for ${req.url} - ${JSON.stringify(req.body)} ${req.ip} \n`, { flag: 'a' }, (err) => { 
        if (err) {
            console.log(err)
        }
    }
    )
    next()
})



app.get('/api/users', (req, res) => {
    res.json(data)
})
// // html rendring api for all users
// app.get('/users', (req, res) => {
//     const html = `
//     <h1>Users</h1>
//     <ul>
//     ${data.map(user => `<li>${user.first_name} ${user.last_name}</li>`).join('')}
//      </ul>
//     `
//     res.send(html)
// })

app.get('/api/users/:id', (req, res) => {
    const id = req.params.id
    const user = data.find(user => user.id == id)
    if (!user) {
        res.status(404).send({
            "status" : "unsuccessful",
             "message": "User not found"})
    }
    console.log("success")
    res.json(user)
})

// post method for adding new user
app.post('/api/users', (req, res) => {
    const user = req.body
    const newUser = {
        id: data.length + 1,
        ...user
    }
    fs.writeFile('./MOCK_DATA.json', JSON.stringify([...data, newUser]), 'utf-8', (err) => {
        if (err) {
            console.log(err)
            res.send({
                "status": "unsuccessful",
                "message": "User not added"
            })
        } else {
            res.send({
                "status": "success",
                "message": "User added successfully", "id": newUser.id
            })
        }
    })
})

// edit the user with id
app.patch('/api/users/:id', (req, res) => {
    const id = req.params.id
    const user = data.find(user => user.id == id)
    if (!user) {
        res.status(404).send({
            "status" : "unsuccessful",
             "message": "User not found"})
    }
    const newUser = req.body
    data.forEach(user => {
        if (user.id == id) {
            user.first_name = newUser.first_name
            user.last_name = newUser.last_name
            user.email = newUser.email
            user.gender = newUser.gender
            user.job_title = newUser.job_title
        }
    })
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(data), 'utf-8', (err) => {
        if (err) {
            console.log(err)
        } else {
            res.send({
                "status": "Success",
                "message": "User updated successfully", "id": id
            })
        }
    })
})

// delete the user with id
app.delete('/api/users/:id', (req, res) => {
    const id = req.params.id
    const user = data.findIndex(user => user.id == id)
    if (user === -1) {
        res.status(404).send({
            "status" : "unsuccessful",
             "message": "User not found"} )
    }
    else {
        data.splice(user, 1)
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(data), 'utf-8', (err) => {
            if (err) {
                console.log(err)
            } else {
                res.send({
                    "status": "Success",
                    "message": "User deleted successfully with id " + id
                })
            }
        })
    }
})


// server listening on port 8000
app.listen(port, (err) => {
    if (err) {
        console.log(err)
    }
    console.log(`Server is running on port ${port}`)
})

