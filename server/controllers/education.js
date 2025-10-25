import education from '../models/education.js'

// Get all education
export const getAllEducation = async (req, res) => {
    try {
        const educations = await education.find()

        if (!educations || educations.length === 0) {
            return res.status(404).json({ message: "No Education Found" })
        }

        res.status(200).json(educations)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Get education by Id
export const getEducationById = async (req, res) => {

    const ID = req.params.id

    try {
        const foundEducation = await education.findById(ID)

        if (!foundEducation) {
            return res.status(404).json({ message: "Education Not Found" })
        }

        res.status(200).json(foundEducation)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Create a new education
export const createEducation = async (req, res) => {

    const { title, firstname, lastname, email, completion, description } = req.body

    const newEducation = new education({
        title,
        firstname,
        lastname,
        email,
        completion,
        description
    })

    try {
        const savedEducation = await newEducation.save()

        if (!savedEducation) {
            return res.status(400).json({ message: "Failed to create Education" })
        }

        res.status(201).json({ education: savedEducation })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Update an education by ID
export const updateEducation = async (req, res) => {
    try {
        const updatedEducation = await education.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
        )

        if (!updatedEducation) {
            return res.status(404).json({ message: "Education Not Found" })
        }

        res.status(200).json({ education: updatedEducation})
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Delete an education by ID
export const deleteEducation = async (req, res) => {

    const ID = req.params.id

    try {
        const deletedEducation = await education.findByIdAndDelete(ID)

        if (!deletedEducation) {
            return res.status(404).json({ message: "Education Not Found" })
        }

        res.status(200).json({ message: "Education Deleted" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Delete all education records
export const deleteAllEducation = async (req, res) => {
    try {
        const result = await education.deleteMany({})

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No Education Found to Delete" })
        }

        res.status(200).json({ message: "All Education Deleted" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}