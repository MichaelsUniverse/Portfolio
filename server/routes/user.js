import express from 'express'
import authMiddleware from '../middleware/auth.js'
import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    deleteAllUsers
    // createUser REPLACED IN AUTH.JS
    // loginUser REPLACED IN AUTH.JS
} from '../controllers/user.js'

const userRoutes = express.Router()

// HTTP verbs Get, Post, Put, Delete
userRoutes.get('/', getAllUsers)
userRoutes.get('/:id', getUserById)
// userRoutes.post('/', createUser) REPLACED IN AUTH.JS
userRoutes.put('/:id', updateUser)
userRoutes.delete('/:id', deleteUser)
userRoutes.delete('/', deleteAllUsers)
// userRoutes.post('/login', loginUser) REPLACED IN AUTH.JS

export default userRoutes