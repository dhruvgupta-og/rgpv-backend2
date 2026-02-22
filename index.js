require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Import Routes
const adminRoutes = require("./routes/adminRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const userRoutes = require("./routes/userRoutes");
const videoRoutes = require("./routes/videoRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

// Health check
app.get("/", (req, res) => {
  res.json({ message: "✅ RGPV Resources API is running!", routes: ["/api/admin", "/api/resources", "/api/users", "/api/videos", "/api/notifications"] });
});

// API Routes
app.use("/api/admin", adminRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/notifications", notificationRoutes);

// Start the Server
app.listen(PORT, () => {
  console.log(`🚀 RGPV Backend running on http://localhost:${PORT}`);
});
