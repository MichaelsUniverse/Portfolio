import project from "../models/project.js"

// Create CRUD operations for Project

// Get all projects = db.projects.find()
export const getAllProjects = async (req, res) => {
    try {
        const projects = await project.find()

        if (!projects || projects.length === 0) {
            return res.status(404).json({ message: "No Projects Found" })
        }

        res.status(200).json(projects)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Get Project by Id = db.projects.findOne({id})
export const getProjectById = async (req, res) => {

    const ID = req.params.id

    console.log("Requested Project ID:", ID)

    try {
        const foundProject = await project.findById(ID)

        console.log(foundProject)

        if (!foundProject) {
            return res.status(404).json({ message: "Project Not Found" })
        }

        res.status(200).json({ project: foundProject })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Create a new project = db.projects.insertOne({})
export const createProject = async (req, res) => {

    const { title, description, techStack, link, repo } = req.body

    const newProject = new project({
        title,
        description,
        techStack,
        link,
        repo
    })

    try {
        const savedProject = await newProject.save()

        if (!savedProject) {
            return res.status(400).json({ message: "Failed to create Project" })
        }

        res.status(201).json({ project: savedProject })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Update a project by ID = db.projects.updateOne({id}, {$set: {}})
export const updateProject = async (req, res) => {

    const ID = req.params.id

    try {
        const updatedProject = await project.findByIdAndUpdate(
            ID,
            {$set: req.body},
            {new: true}
        )

        if (!updatedProject) {
            return res.status(404).json({ message: "Project Not Found" })
        }

        res.status(200).json({ project: updatedProject})
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Delete a project by ID = db.projects.deleteOne({id})
export const deleteProject = async (req, res) => {
    try {
        const deletedProject = await project.findByIdAndDelete(req.params.id)

        if (!deletedProject) {
            return res.status(404).json({ message: "Project Not Found" })
        }

        res.status(200).json({ message: "Project Deleted" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Delete all projects = db.projects.deleteMany({})
export const deleteAllProjects = async (req, res) => {
    try {
        const result = await project.deleteMany({})

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No Projects Found to Delete" })
        }

        res.status(200).json({ message: "All Projects Deleted" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}