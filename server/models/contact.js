import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
})

export default mongoose.model('Contact', contactSchema)