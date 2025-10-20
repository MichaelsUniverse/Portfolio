import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
})

export default mongoose.model('Contact', contactSchema)