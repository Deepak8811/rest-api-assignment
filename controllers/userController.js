const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

/**
 * @desc    Get all users
 * @route   GET /users
 * @access  Private (Authenticated User)
 */
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get a user by ID
 * @route   GET /users/:id
 * @access  Private (Authenticated User)
 */
const getUserById = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Create a new user
 * @route   POST /users
 * @access  Public
 */
const createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields (name, email, password) are required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10); 

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        if (!newUser) {
            return res.status(500).json({ message: "User registration failed" });
        }
        const token = generateToken(newUser.id);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
            },
            token,
        });
    } catch (error) {
        console.error("Error creating user:", error);
        next(error);
    }
};


/**
 * @desc    Update a user by ID
 * @route   PUT /users/:id
 * @access  Private (Authenticated User)
 */
const updateUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });

        await user.update(req.body);
        res.json(user);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Delete a user by ID
 * @route   DELETE /users/:id
 * @access  Private (Authenticated User)
 */
const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });

        await user.destroy();
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
