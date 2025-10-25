import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import dotenv from 'dotenv/config'
import authMiddleware from './middleware/auth.js'

mongoose.connect(process.env.MONGODB_URI)

const connection = mongoose.connection
connection.on('error', console.error.bind(console, "MongoDB connection error..."))
connection.once('open', () => { console.log("Connected to MongoDB")})

// IMPORT ROUTES

import projectRoutes from './routes/project.js'
import userRoutes from './routes/user.js'
import contactRoutes from './routes/contact.js'
import educationRoutes from './routes/education.js'

// SETUP APP

const app = express()

app.use(express.json())

app.use(morgan('dev'))

// Routes

app.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome to My Portfolio application." })
})

app.use('/projects', authMiddleware, projectRoutes)
app.use('/users', userRoutes)
app.use('/contacts', authMiddleware, contactRoutes)
app.use('/education', authMiddleware, educationRoutes)

app.listen(3000)

console.log('Server running at http://localhost:3000/')