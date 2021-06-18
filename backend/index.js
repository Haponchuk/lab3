require('dotenv').config()

const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use(bodyParser.json())

const todoRoutes = require('./routes/todos')
app.use('/todos', todoRoutes)

// підключення бази
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Successfully connected to database!')
    })
    .catch((error) => {
        console.log('Cannot connect to database!', error)
        process.exit(1)
    })

// запуск сервера
app.listen(process.env.PORT || 3000, () => {
    console.log('Server has been started...')
})