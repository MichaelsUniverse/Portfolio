import express from 'express'
import {
    createContact,
    getAllContacts,
    getContactById,
    updateContact,
    deleteContact,
    deleteAllContacts
} from '../controllers/contact.js'

const contactRoutes = express.Router()

// HTTP verbs Get, Post, Put, Delete
contactRoutes.get('/', getAllContacts)
contactRoutes.get('/:id', getContactById)
contactRoutes.post('/', createContact)
contactRoutes.put('/:id', updateContact)
contactRoutes.delete('/:id', deleteContact)
contactRoutes.delete('/', deleteAllContacts)

export default contactRoutes