import express from 'express'
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    loginUser
} from '../controllers/user.js'

const userRoutes = express.Router()

// HTTP verbs Get, Post, Put, Delete
userRoutes.get('/', getAllUsers)
userRoutes.get('/:id', getUserById)
userRoutes.post('/', createUser)
userRoutes.put('/:id', updateUser)
userRoutes.delete('/:id', deleteUser)
userRoutes.post('/login', loginUser)

export default userRoutes