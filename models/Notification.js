const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        message: { type: String, required: true },
        type: {
            type: String,
            enum: ["resource", "announcement", "alert", "update", "maintenance", "event"],
            default: "announcement"
        },
        read: { type: Boolean, default: false },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        targetUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Empty means all users
        createdAt: { type: Date, default: Date.now },
        expiresAt: { type: Date, default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) }, // 30 days
    },
    { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
