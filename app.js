//third party libraries
const express = require('express');
const app = express()

//node libraries
const fs = require('fs')
const PORT = 3000

app.set('view engine', 'pug')
app.use('/static', express.static('/public')) //assets
app.use(express.urlencoded({extended: false}))

//localhost:8000
app.get('/', (req, res) => {
    fs.readFile('./data/todos.json', (err, data) => {
        if (err) throw err

        const todos = JSON.parse(data)   

        res.render('home', { todos: todos }) 
    })
})
app.post('/add', (req, res) => {
    const formData = req.body

    if(formData.todo.trim() == ''){

        
        fs.readFile('./data/todos.json', (err, data) => {
            if (err) throw err

            const todos = JSON.parse(data)

            res.render('home', { error: true, todos: todos })
        })
    }   else{
        fs.readFile('./data/todos.json', (err, data) => {
            if (err) throw err

            const todos = JSON.parse(data)

            const todo = {
                id: id(),
                description: formData.todo,
                done: false
            }

            todos.push(todo)

            fs.writeFile('./data/todos.json', JSON.stringify(todos), (err) => {
                if (err) throw err

                fs.readFile('./data/todos.json', (err, data) => {
                    if (err) throw err

                    const todos = JSON.parse(data)

                    res.render('home', { success: true, todos: todos })
                })
            })
        })
    }
})


app.get('/:id/delete', (req, res) =>{
    const id = req.params.id

    fs.readFile('./data/todos.json', (err, data) =>{
        if (err) throw err

        const todos = JSON.parse(data)

        const filteredTodos = todos.filter(todo => todo.id != id)

        fs.writeFile('./data/todos.json', JSON.stringify(filteredTodos), (err) =>{
            if (err) throw err
            res.render('home', {todos: filteredTodos, deleted: true})
        })
    })
})

app.listen(PORT, (err) => {
    if (err) throw err
    console.log(`This app is running on port ${PORT}`)
})


function id() {
    return '_' + Math.random().toString(36).substr(2, 9);
}