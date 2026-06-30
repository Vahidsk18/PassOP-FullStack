const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const register = async (req, res, next) => {

    const { username, email, password } = req.body;

    const existingUser =
        await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: "User already exists"
        });
    }

    const hashedPassword =
        await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });

    res.status(201).json({
        success: true,
        message: "Registration Successful"
    });
};


const login = async (req, res) => {

    const { email, password } = req.body;

    const user =
        await User.findOne({ email });

    if (!user) {
        return res.status(400).json({
            success: false,
            message: "Invalid Credentials"
        });
    }

    const isMatch =
        await bcrypt.compare(
            password,
            user.password
        );

    if (!isMatch) {
        return res.status(400).json({
            success: false,
            message: "Invalid Credentials"
        });
    }

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );

    res.status(200).json({
        success: true,
        token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
};

// controllers/authController.js

// const logout = (req, res) => {
//     res.status(200).json({
//         success: true,
//         message: "Logged out successfully"
//     });
// };



module.exports = {
    register,
    login,
};