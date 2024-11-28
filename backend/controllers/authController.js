const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const { name, email, password, role } = req.body;

    // Ensure the role is capitalized correctly to match the database
    const formattedRole = role.charAt(0).toUpperCase() + role.slice(1);

    try {
        const user = new User({ name, email, password, role: formattedRole });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.status(200).json({ token, role: user.role });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); 
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};