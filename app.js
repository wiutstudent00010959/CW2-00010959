//third party libraries
const express = require('express');
const app = express()

//node libraries
const fs = require('fs')
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
//if there is no input, send error
    if (formData.todo.trim() =='') {
        res.render('home', { error: true})
        
    } else { //else try reead dtatabse file, if not possible, throw error
        FileSystem.readFile('./data/todos.json', (err, data)) => {
            if (err) throw err
            const todo = {
                id: id(),
                description: formData.todo,
                done: false //this will serve as property namewhen CRUD is implemented
            }
            todos.push(todo)

            fs.writeFile('./data/todos.json', JSON.stringify(todos), (err) => {
                if (err) throw err
                
                res.render('home', { success: true} )
            }
            
            )
        }
   

    }
}) 

//app.listen(PORT, (err) => {
//    if (err) throw err
//    console.log(`This app is running on port ${PORT}`)
//})


function id() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  }