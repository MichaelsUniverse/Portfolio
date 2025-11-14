import User from '../models/user.js';
import { generateToken } from '../utils/jwt.js';

// Register a new user
export const registerUser = async (req, res) => {

  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing Information' })
  }

  try {

    const newUser = new User({ name, email, password })
    const savedUser = await newUser.save()

    if (!newUser || !savedUser) {
      return res.status(400).json({ message: 'Failed to create user' })
    }

    const token = generateToken(newUser)

    if (!token) {
      return res.status(201).json({ message: 'User registered successfully', user: newUser })
    }

    res.status(201).json({ message: 'User registered successfully', user: newUser, token })
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' })
  }
};

// Login user
export const loginUser = async (req, res) => {

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Missing Information' })
  }

  try {

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password 1' })
    }

    const verified = await user.comparePassword(password)

    if (!verified) {
      return res.status(400).json({ message: 'Invalid username or password 2' })
    }

    const token = generateToken(user)

    if (!token) {
      return res.status(400).json({ message: 'Error Logging in' })
    }

    res.status(200).json({ message: 'Login successful', user, token })
  } catch (error) {
    res.status(500).json({ error: 'Error logging in user' })
  }
};