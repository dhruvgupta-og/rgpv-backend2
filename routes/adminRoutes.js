const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || "supersecretkey_rgpv", {
        expiresIn: "30d",
    });
};

// @desc    Auth admin & get token
// @route   POST /api/admin/login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    // HARDCODED DEMO LOGIN
    if (username === "admin" && password === "admin123") {
        res.json({
            _id: "demo_admin_123",
            username: "admin",
            role: "admin",
            token: generateToken("demo_admin_123"),
        });
    } else {
        res.status(401).json({ message: "❌ Invalid username or password! Use: admin / admin123" });
    }
});

router.post("/register", async (req, res) => {
    res.status(400).json({ message: "Registration disabled in Demo Mode." });
});

module.exports = router;
