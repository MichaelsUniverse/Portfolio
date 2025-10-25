import express from 'express'
import authMiddleware from '../middleware/auth.js'
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    deleteAllUsers,
    loginUser
} from '../controllers/user.js'

const userRoutes = express.Router()

// HTTP verbs Get, Post, Put, Delete
userRoutes.get('/', authMiddleware, getAllUsers)
userRoutes.get('/:id', authMiddleware, getUserById)
userRoutes.post('/', createUser)
userRoutes.put('/:id', authMiddleware, updateUser)
userRoutes.delete('/:id', authMiddleware, deleteUser)
userRoutes.delete('/', authMiddleware, deleteAllUsers)
userRoutes.post('/login', loginUser)

export default userRoutes