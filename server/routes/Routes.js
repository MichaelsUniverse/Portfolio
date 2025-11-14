import express from 'express';
import authMiddleware from '../middleware/auth.js';
import authRoutes from './auth.js';
import contactRoutes from './contact.js';
import educationRoutes from './education.js';
import projectRoutes from './project.js';
import userRoutes from './user.js';

const Routes = express.Router();

Routes.use('/projects', authMiddleware, projectRoutes)
Routes.use('/users', authMiddleware, userRoutes)
Routes.use('/contacts', authMiddleware, contactRoutes)
Routes.use('/education', authMiddleware, educationRoutes)
Routes.use('/auth', authRoutes)

export default Routes;

