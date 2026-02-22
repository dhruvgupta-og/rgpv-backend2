const express = require("express");
const router = express.Router();

// In-memory notification storage
let notificationsStore = [
    {
        _id: "mock1",
        title: "Welcome to RGPV Hub",
        message: "Your account has been created successfully. Start exploring resources!",
        type: "announcement",
        read: false,
        createdAt: new Date(Date.now() - 3600000)
    },
    {
        _id: "mock2",
        title: "New Study Materials Added",
        message: "Check out the latest notes and PYQs for Data Structures",
        type: "resource",
        read: false,
        createdAt: new Date(Date.now() - 7200000)
    },
    {
        _id: "mock3",
        title: "System Update",
        message: "App updated to v1.0.1 with bug fixes and performance improvements",
        type: "update",
        read: true,
        createdAt: new Date(Date.now() - 86400000)
    }
];

// Get all notifications
router.get("/", (req, res) => {
    try {
        const sortedNotifications = notificationsStore.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.json(sortedNotifications);
    } catch (error) {
        console.log("Error in GET /api/notifications:", error.message);
        res.status(500).json({ error: "Failed to fetch notifications" });
    }
});

// Create notification (for admin)
router.post("/", (req, res) => {
    try {
        const { title, message, type = "announcement", targetUsers = [] } = req.body;

        if (!title || !message) {
            return res.status(400).json({ error: "Title and message are required" });
        }

        const newNotification = {
            _id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            title,
            message,
            type,
            read: false,
            targetUsers: targetUsers.length > 0 ? targetUsers : [],
            createdAt: new Date(),
        };

        // Save to in-memory storage
        notificationsStore.unshift(newNotification);

        console.log(`✅ Notification sent: "${title}"`);
        res.status(201).json(newNotification);
    } catch (error) {
        console.log("Error creating notification:", error);
        res.status(500).json({ error: "Failed to create notification" });
    }
});

// Mark notification as read
router.put("/:id/read", (req, res) => {
    try {
        const notif = notificationsStore.find(n => n._id === req.params.id);
        if (notif) {
            notif.read = true;
            return res.json(notif);
        }

        res.status(404).json({ error: "Notification not found" });
    } catch (error) {
        console.log("Error marking notification as read:", error);
        res.status(500).json({ error: "Failed to mark notification as read" });
    }
});

// Delete notification
router.delete("/:id", (req, res) => {
    try {
        const index = notificationsStore.findIndex(n => n._id === req.params.id);
        if (index > -1) {
            notificationsStore.splice(index, 1);
            return res.json({ message: "Notification deleted successfully" });
        }

        res.status(404).json({ error: "Notification not found" });
    } catch (error) {
        console.log("Error deleting notification:", error);
        res.status(500).json({ error: "Failed to delete notification" });
    }
});

// Mark all notifications as read
router.put("/read/all", (req, res) => {
    try {
        notificationsStore.forEach(n => n.read = true);
        res.json({ message: "All notifications marked as read" });
    } catch (error) {
        console.log("Error marking all as read:", error);
        res.status(500).json({ error: "Failed to mark all as read" });
    }
});

module.exports = router;
