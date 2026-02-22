const express = require("express");
const router = express.Router();

// In-memory YouTube video store
// Each entry: { _id, subjectCode, subjectName, title, youtubeUrl, description, createdAt }
let mockVideos = [
    { _id: "v1", subjectCode: "CS-302", subjectName: "Data Structures", title: "Data Structures Full Course", youtubeUrl: "https://www.youtube.com/watch?v=RBSGKlAvoiM", description: "Complete Data Structures course", createdAt: new Date().toISOString() },
    { _id: "v2", subjectCode: "CS-302", subjectName: "Data Structures", title: "Linked Lists Explained", youtubeUrl: "https://www.youtube.com/watch?v=Hj_rA0dhr2I", description: "Linked lists in depth", createdAt: new Date().toISOString() },
    { _id: "v3", subjectCode: "BT-102", subjectName: "Mathematics I", title: "Mathematics I Full Playlist", youtubeUrl: "https://www.youtube.com/watch?v=fNk_zzaMoSs", description: "Engineering Maths 1 full course", createdAt: new Date().toISOString() },
    { _id: "v4", subjectCode: "CS-405", subjectName: "Operating Systems", title: "OS Complete Course", youtubeUrl: "https://www.youtube.com/watch?v=vBURTt97EkA", description: "Operating Systems by Neso Academy", createdAt: new Date().toISOString() },
];

// GET /api/videos?subjectCode=CS-302
router.get("/", (req, res) => {
    const { subjectCode } = req.query;
    if (subjectCode) {
        return res.json(mockVideos.filter(v => v.subjectCode === subjectCode));
    }
    res.json(mockVideos);
});

// POST /api/videos  (Admin)
router.post("/", (req, res) => {
    const { subjectCode, subjectName, title, youtubeUrl, description } = req.body;
    if (!subjectCode || !title || !youtubeUrl) {
        return res.status(400).json({ message: "subjectCode, title, and youtubeUrl are required." });
    }
    const video = {
        _id: Math.random().toString(36).substr(2, 9),
        subjectCode, subjectName: subjectName || subjectCode, title,
        youtubeUrl, description: description || "",
        createdAt: new Date().toISOString(),
    };
    mockVideos.push(video);
    res.status(201).json(video);
});

// PUT /api/videos/:id  (Admin)
router.put("/:id", (req, res) => {
    const idx = mockVideos.findIndex(v => v._id === req.params.id);
    if (idx === -1) return res.status(404).json({ message: "Video not found." });
    mockVideos[idx] = { ...mockVideos[idx], ...req.body };
    res.json(mockVideos[idx]);
});

// DELETE /api/videos/:id  (Admin)
router.delete("/:id", (req, res) => {
    mockVideos = mockVideos.filter(v => v._id !== req.params.id);
    res.json({ message: "Video deleted." });
});

module.exports = router;
