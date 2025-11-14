import mongoose from 'mongoose'

const educationSchema = new mongoose.Schema({
    title: String,
    degree: String,
    school: String,
    gpa: String,
    startDate: Date,
    endDate: Date,
    estend: Date,
    color: String
})

export default mongoose.model('Education', educationSchema)