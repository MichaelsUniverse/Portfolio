import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import dotenv from 'dotenv/config'

mongoose.connect(process.env.MONGODB_URI)

const connection = mongoose.connection
connection.on('error', console.error.bind(console, "MongoDB connection error..."))
connection.once('open', () => { console.log("Connected to MongoDB")})

import projectRoutes from './routes/project.js'
import userRoutes from './routes/user.js'

const app = express()

app.use(express.json())

app.use(morgan('dev'))

// Routes

app.get('/', (req, res) => {
    res.send.json({ message: "Welcome to My Portfolio application." })
})

app.use('/projects', projectRoutes)
app.use('/users', userRoutes)

app.listen(3000)

console.log('Server running at http://localhost:3000/')