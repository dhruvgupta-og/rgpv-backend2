const express = require("express");
const router = express.Router();

// In-memory store (persists while server is alive)
let mockUsers = [];

// OTP store: { phone: { otp, expiresAt } }
let otpStore = {};

// Helper: generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// ─────────────────────────────────────────────
// POST /api/users/register
// ─────────────────────────────────────────────
router.post("/register", (req, res) => {
    const { name, phone, password, program, branch, semester } = req.body;

    if (!name || !phone || !password) {
        return res.status(400).json({ message: "Name, phone, and password are required." });
    }
    if (phone.length < 10) {
        return res.status(400).json({ message: "Enter a valid 10-digit phone number." });
    }

    // Strict duplicate check
    if (mockUsers.some(u => u.phone === phone)) {
        return res.status(409).json({ message: "This phone number is already registered. Please log in instead." });
    }

    const newUser = {
        _id: Math.random().toString(36).substr(2, 9),
        name: name.trim(),
        phone,
        password,          // plain for admin visibility (demo)
        program: program || "B.Tech",
        branch: branch || "CS",
        semester: semester || 1,
        joinedAt: new Date().toISOString(),
    };

    mockUsers.push(newUser);
    // Return user without password to the app
    const { password: _, ...safeUser } = newUser;
    res.status(201).json({ message: "Account created successfully!", user: safeUser });
});

// ─────────────────────────────────────────────
// POST /api/users/login
// ─────────────────────────────────────────────
router.post("/login", (req, res) => {
    const { phone, password } = req.body;

    const user = mockUsers.find(u => u.phone === phone);
    if (!user) {
        return res.status(404).json({ message: "No account found with this phone number. Please sign up first." });
    }
    if (user.password !== password) {
        return res.status(401).json({ message: "Incorrect password. Please try again." });
    }

    const { password: _, ...safeUser } = user;
    res.json({ message: "Login successful!", user: safeUser });
});

// ─────────────────────────────────────────────
// POST /api/users/forgot-password  →  generate OTP
// ─────────────────────────────────────────────
router.post("/forgot-password", (req, res) => {
    const { phone } = req.body;

    const user = mockUsers.find(u => u.phone === phone);
    if (!user) {
        return res.status(404).json({ message: "No account registered with this phone number." });
    }

    const otp = generateOTP();
    otpStore[phone] = {
        otp,
        expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
    };

    console.log(`📱 OTP for ${phone}: ${otp}`); // In prod → send via SMS

    // For demo, return OTP in response (in prod you'd only send via SMS)
    res.json({ message: `OTP sent! (Demo mode — your OTP is: ${otp})`, otp });
});

// ─────────────────────────────────────────────
// POST /api/users/verify-otp  →  reset password
// ─────────────────────────────────────────────
router.post("/verify-otp", (req, res) => {
    const { phone, otp, newPassword } = req.body;

    const record = otpStore[phone];
    if (!record) {
        return res.status(400).json({ message: "No OTP was requested for this number. Try again." });
    }
    if (Date.now() > record.expiresAt) {
        delete otpStore[phone];
        return res.status(400).json({ message: "OTP has expired. Please request a new one." });
    }
    if (record.otp !== otp) {
        return res.status(400).json({ message: "Incorrect OTP. Please try again." });
    }
    if (!newPassword || newPassword.length < 6) {
        return res.status(400).json({ message: "New password must be at least 6 characters." });
    }

    const userIdx = mockUsers.findIndex(u => u.phone === phone);
    if (userIdx === -1) return res.status(404).json({ message: "User not found." });

    mockUsers[userIdx].password = newPassword;
    delete otpStore[phone];

    res.json({ message: "Password reset successfully! You can now log in." });
});

// ─────────────────────────────────────────────
// POST /api/users/update-phone  →  change phone number with OTP
// ─────────────────────────────────────────────
router.post("/update-phone", (req, res) => {
    const { oldPhone, newPhone, otp } = req.body;

    if (!oldPhone || !newPhone || !otp) {
        return res.status(400).json({ message: "Old phone, new phone, and OTP are required." });
    }

    if (newPhone.length < 10) {
        return res.status(400).json({ message: "New phone number must be 10 digits." });
    }

    // Check if new phone is already in use
    if (mockUsers.some(u => u.phone === newPhone)) {
        return res.status(409).json({ message: "Phone number already in use." });
    }

    const record = otpStore[newPhone];
    if (!record) {
        return res.status(400).json({ message: "No OTP was requested for this number. Try again." });
    }
    if (Date.now() > record.expiresAt) {
        delete otpStore[newPhone];
        return res.status(400).json({ message: "OTP has expired. Please request a new one." });
    }
    if (record.otp !== otp) {
        return res.status(400).json({ message: "Incorrect OTP. Please try again." });
    }

    const userIdx = mockUsers.findIndex(u => u.phone === oldPhone);
    if (userIdx === -1) {
        return res.status(404).json({ message: "User not found." });
    }

    // Update phone number
    mockUsers[userIdx].phone = newPhone;
    delete otpStore[newPhone];

    const { password: _, ...safeUser } = mockUsers[userIdx];
    res.json({ message: "Phone number updated successfully!", user: safeUser });
});

// ─────────────────────────────────────────────
// GET /api/users   (Admin only — returns all with passwords for export)
// ─────────────────────────────────────────────
router.get("/", (req, res) => {
    res.json(mockUsers);
});

// ─────────────────────────────────────────────
// DELETE /api/users/:id  (Admin)
// ─────────────────────────────────────────────
router.delete("/:id", (req, res) => {
    mockUsers = mockUsers.filter(u => u._id !== req.params.id);
    res.json({ message: "User deleted." });
});

module.exports = router;
