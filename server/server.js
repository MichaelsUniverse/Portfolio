import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'
import dotenv from 'dotenv/config'

mongoose.connect(process.env.MONGODB_URI)

const allowedOrigins = [
  'https://www.justmichael.dev',
  'http://localhost:5173'
];

const corsOptions = {
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error('Not allowed by CORS'));
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS']
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
app.options('/*', cors(corsOptions));  // include before other routes -- https://expressjs.com/en/resources/middleware/cors.html


// Routes

app.get('/api', (req, res) => {
    res.status(200).json({ message: "Welcome to My Portfolio application." })
})


app.use('/api', Routes)


app.listen(3000)

console.log('Server running at http://localhost:3000/')