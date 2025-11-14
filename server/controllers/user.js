import user from "../models/user.js"

// Create CRUD operations for User
// Get all users = db.users.find()
export const getAllUsers = async (req, res) => {
    try {
        const users = await user.find()

        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No Users Found" })
        }

        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

 // Get User by Id = db.users.findOne({id})
export const getUserById = async (req, res) => {

    const ID = req.params.id

    try {
        const foundUser = await user.findById(ID)

        if (!foundUser) {
            return res.status(404).json({ message: "User Not Found" })
        }

        res.status(200).json(foundUser)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// REPLACED BY REGISTER IN AUTH.JS
// Create a new user = db.users.insertOne({})
// export const createUser = async (req, res) => {

//     const { name, email, password } = req.body

//     const newUser = new user({
//         name,
//         email,
//         password
//     })

//     try {
//         const savedUser = await newUser.save()

//         if (!savedUser) {
//             return res.status(400).json({ message: "Failed to create User" })
//         }

//         const token = generateToken(savedUser);

//         if (!token && savedUser) {
//             return res.status(201).json({ user: savedUser });
//         }

//         res.status(201).json({ user: savedUser, token })
//     } catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// }

// Update a user by ID = db.users.updateOne({id}, {$set: {}})
export const updateUser = async (req, res) => {

    const ID = req.params.id

    try {
        const updatedUser = await user.findByIdAndUpdate(
            ID,
            {$set: req.body},
            {new: true}
        )

        if (!updatedUser) {
            return res.status(404).json({ message: "User Not Found" })
        }

        res.status(200).json({ user: updatedUser })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Delete a user by ID = db.users.deleteOne({id})
export const deleteUser = async (req, res) => {

    const ID = req.params.id

    try {
        const deletedUser = await user.findByIdAndDelete(ID)

        if (!deletedUser) {
            return res.status(404).json({message: "User Not Found"})
        }

        res.status(200).json({message: "User Deleted"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// Delete all users = db.users.deleteMany({})
export const deleteAllUsers = async (req, res) => {
    try {
        const result = await user.deleteMany({})

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No Users Found to Delete" })
        }

        res.status(200).json({ message: "All Users Deleted" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// REPLACED BY LOGIN IN AUTH.JS
// Login User
// export const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body

//         const loginUser = await user.findOne({ email })

//         if (!loginUser) {
//             return res.status(404).json({ message: "User Not Found" })
//         }

//         const isPasswordValid = await loginUser.comparePassword(password)

//         console.log(isPasswordValid)

//         if (!isPasswordValid) {
//             return res.status(401).json({ message: "Invalid Password" })
//         }

//         const token = generateToken(loginUser)

//         res.status(200).json({ message: "Login Successful", user: loginUser, token })
//     } catch (error) {
//         res.status(500).json({message: error.message})
//     }
// }
