import contact from '../models/contact.js'

// Get All Contacts
export const getAllContacts = async (req, res) => {
    try {
        const contacts = await contact.find()
        res.status(200).json(contacts)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// Get Contact by Id
export const getContactById = async (req, res) => {
    try {
        const foundContact = await contact.findById(req.params.id)

        if (!foundContact) {
            return res.status(404).json({message: "Contact Not Found"})
        }

        res.status(200).json(foundContact)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// Create a new Contact

export const createContact = async (req, res) => {

    const { firstname, lastname, email } = req.body;

    const newContact = new contact({
        firstname,
        lastname,
        email
    })

    try {
        const savedContact = await newContact.save()

        if (!savedContact) {
            return res.status(400).json({message: "Failed to create Contact"})
        }

        res.status(201).json({message: "Contact Created Successfully", contact: savedContact})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

// Update a Contact by ID
export const updateContact = async (req, res) => {

    try {
        const updatedContact = await contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        )

        if (!updatedContact) {
            return res.status(404).json({message: "Contact Not Found"})
        }

        res.status(200).json(updatedContact)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

// Delete a Contact by ID
export const deleteContact = async (req, res) => {
    try {
        const deletedContact = await contact.findByIdAndDelete(req.params.id)

        if (!deletedContact) {
            return res.status(404).json({message: "Contact Not Found"})
        }

        res.status(200).json({message: "Contact Deleted"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// Delete all contacts
export const deleteAllContacts = async (req, res) => {
    try {
        const result = await contact.deleteMany({})

        if (result.deletedCount === 0) {
            return res.status(404).json({message: "No Contacts Found to Delete"})
        }

        res.status(200).json({message: `${result.deletedCount} Contacts Deleted`})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}