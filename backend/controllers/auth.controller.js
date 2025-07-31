const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const registerUser = async (req, res) => {
    const { name, email, password, companyInfo } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'El usuario ya existe' });
    }
    const user = await User.create({ name, email, password, companyInfo });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        });
    } else {
        res.status(400).json({ message: 'Datos de usuario inválidos' });
    }
};

const authUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        });
    } else {
        res.status(401).json({ message: 'Email o contraseña inválidos' });
    }
};

module.exports = { registerUser, authUser };