require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Allow cross-origin requests from the React admin panel and Android app

// Import Routes
const adminRoutes = require("./routes/adminRoutes");
const resourceRoutes = require("./routes/resourceRoutes");

// Setup basic route to test server
app.get("/", (req, res) => {
    res.json({ message: "Welcome to RGPV Resources API! 🚀" });
});

// API Routes
app.use("/api/admin", adminRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/users", require("./routes/userRoutes"));

// Database connection placeholder
// In-Memory Mode Enabled: Bypassing MongoDB for Demo.
/*
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/rgpv-resources", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));
*/


// Start the Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
