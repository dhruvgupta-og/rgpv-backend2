const express = require("express");
const router = express.Router();

// Mock Users Database for Demo
let mockUsers = [];

// @route   POST /api/users/register
router.post("/register", (req, res) => {
    const { name, year, phone, password } = req.body;

    // Check if phone already exists
    if (mockUsers.some(u => u.phone === phone)) {
        return res.status(400).json({ message: "User with this phone already exists." });
    }

    const newUser = {
        _id: Math.random().toString(36).substr(2, 9),
        name,
        year,
        phone,
        password, // In a real app, hash this! Showing plain for admin excel as requested.
        createdAt: new Date().toISOString()
    };

    mockUsers.push(newUser);
    res.status(201).json({ message: "Signup successful", user: newUser });
});

// @route   POST /api/users/login
router.post("/login", (req, res) => {
    const { phone, password } = req.body;

    const user = mockUsers.find(u => u.phone === phone && u.password === password);
    if (!user) {
        return res.status(401).json({ message: "Invalid phone number or password." });
    }

    res.json({ message: "Login successful", user });
});

// @route   GET /api/users (Admin ONLY)
router.get("/", (req, res) => {
    res.json(mockUsers);
});

module.exports = router;
