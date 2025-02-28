const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register user
const registerUser = async (req, res) => {
    const {userId , name, email, password, confirmPassword,role } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = await User.create({
        userId,
        name,
        email,
        password,
       role: role || "user",
    });
    // console.log(user,"user");

    if (user) {
        return res.status(201).json({
            message: 'User registered successfully',
            userId: user._id,
        });
    } else {
        return res.status(400).json({ message: 'Invalid user data' });
    }
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    return res.status(200).json({
        message: 'Login successful',
        token,
    });
};

module.exports = { registerUser, loginUser, };