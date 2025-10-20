import UserModel from "../models/user.js"
import { generateToken } from "../utils/jwt.js"

// Create CRUD operations for User
// Get all users = db.users.find()
export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

 // Get User by Id = db.users.findOne({id})
export const getUserById = async (req, res) => {
    try {
        const foundUser = await UserModel.findById(req.params.id)

        if (!foundUser) {
            return res.status(404).json({message: "User Not Found"})
        }

        res.status(200).json(foundUser)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// Create a new user = db.users.insertOne({})
export const createUser = async (req, res) => {
    const newUser = new UserModel(req.body)
    try {

        const savedUser = await newUser.save()

        const token = generateToken(savedUser);

        res.status(201).json({message: "User Created Successfully", user: savedUser, token})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

// Update a user by ID = db.users.updateOne({id}, {$set: {}})
export const updateUser = async (req, res) => {
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
        )

        if (!updatedUser) {
            return res.status(404).json({message: "User Not Found"})
        }

        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

// Delete a user by ID = db.users.deleteOne({id})
export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await UserModel.findByIdAndDelete(req.params.id)

        if (!deletedUser) {
            return res.status(404).json({message: "User Not Found"})
        }

        res.status(200).json({message: "User Deleted"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const loginUser = await UserModel.findOne({ email });

        if (!loginUser) {
            return res.status(404).json({ message: "User Not Found" });
        }

        const isPasswordValid = await loginUser.comparePassword(password);

        console.log(isPasswordValid)

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid Password" });
        }

        const token = generateToken(loginUser);

        res.status(200).json({ message: "Login Successful", user: loginUser, token });
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
