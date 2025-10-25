import express from 'express'
import {
    createEducation,
    getAllEducation,
    getEducationById,
    updateEducation,
    deleteEducation,
    deleteAllEducation
} from '../controllers/education.js'

const educationRoutes = express.Router()

// HTTP verbs Get, Post, Put, Delete
educationRoutes.get('/', getAllEducation)
educationRoutes.get('/:id', getEducationById)
educationRoutes.post('/', createEducation)
educationRoutes.put('/:id', updateEducation)
educationRoutes.delete('/:id', deleteEducation)
educationRoutes.delete('/', deleteAllEducation)

export default educationRoutes