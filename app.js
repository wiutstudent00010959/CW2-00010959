const express = require('express');
const app = express()
const PORT = 3000

app.set('view engine', 'pug')
app.use('/static', express.static('assets')) //assets
app.use(express.urlencoded({extended: false}))

//localhost:8000
app.get('/', (req, res) => {
    res.render('home')
})

app.post('/add', (req, res) => {
    const formData = req.body

    if formData.todo.trim() =='') {
        res.render('home', { error: true})
        //if there is no input, send error
    } else {
        
    }
}) 

//app.listen(PORT, (err) => {
//    if (err) throw err
//    console.log(`This app is running on port ${PORT}`)
//})
