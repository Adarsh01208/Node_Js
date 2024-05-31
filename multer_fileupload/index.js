const express = require('express')
const app = express()

const upload = require('./multer')
const path = require('path')
const port = 8000


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))





// uploadinf file using multer

app.get('/', (req, res) => {
    res.render('home.ejs')
})
app.post('/upload', upload.single('avatar'), (req, res) => {
   console.log(req.body)
    console.log(req.file)
    res.send('File uploaded successfully')
})


app.listen(port, (err) => {
    if (err) {
        console.log('Error in running the server', err)
    }
    console.log(`Server is running on port ${port}`)
})

