import express from 'express'
import {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
    deleteAllProjects
} from '../controllers/project.js'

const projectRoutes = express.Router()

// HTTP verbs Get, Post, Put, Delete
projectRoutes.get('/', getAllProjects)
projectRoutes.get('/:id', getProjectById)
projectRoutes.post('/', createProject)
projectRoutes.put('/:id', updateProject)
projectRoutes.delete('/:id', deleteProject)
projectRoutes.delete('/', deleteAllProjects)

export default projectRoutes