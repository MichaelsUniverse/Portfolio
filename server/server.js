import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'
import dotenv from 'dotenv/config'

mongoose.connect(process.env.MONGODB_URI)

const corsOptions = {
        origin: 'https://www.justmichael.dev',
        credentials: true
    };

const connection = mongoose.connection
connection.on('error', console.error.bind(console, "MongoDB connection error..."))
connection.once('open', () => { console.log("Connected to MongoDB")})

// IMPORT ROUTES

import Routes from './routes/Routes.js'

// SETUP APP

const app = express()

app.use(express.json())

app.use(morgan('dev'))

// CORS

app.use(cors(corsOptions));

// Routes

app.get('/api', (req, res) => {
    res.status(200).json({ message: "Welcome to My Portfolio application." })
})


app.use('/api', Routes)


app.listen(3000)

console.log('Server running at http://localhost:3000/')