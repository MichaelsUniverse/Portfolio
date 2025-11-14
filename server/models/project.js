import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    techStack: String,
    link: String,
    repo: String
})

export default mongoose.model('Project', projectSchema)