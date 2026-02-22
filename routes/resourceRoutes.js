const express = require("express");
const router = express.Router();

let mockResources = [
    // SEM 1 & 2 (Common)
    { _id: "1", title: "Engineering Chemistry 2023 PYQ", type: "PYQ", semester: 1, subjectName: "Engineering Chemistry", subjectCode: "BT-101", fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", views: 320, createdAt: new Date().toISOString() },
    { _id: "2", title: "Engineering Chemistry 2022 PYQ", type: "PYQ", semester: 1, subjectName: "Engineering Chemistry", subjectCode: "BT-101", fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", views: 210, createdAt: new Date().toISOString() },
    { _id: "3", title: "Mathematics I Full Notes", type: "NOTE", semester: 1, subjectName: "Mathematics I", subjectCode: "BT-102", fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", views: 485, createdAt: new Date().toISOString() },
    { _id: "4", title: "English for Communication Syllabus", type: "SYLLABUS", semester: 1, subjectName: "English for Communication", subjectCode: "BT-103", fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", views: 140, createdAt: new Date().toISOString() },
    { _id: "5", title: "Basic Electrical Engg Notes Unit 1-5", type: "NOTE", semester: 1, subjectName: "Basic Electrical Engineering", subjectCode: "BT-104", fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", views: 360, createdAt: new Date().toISOString() },
    { _id: "6", title: "Engineering Graphics PYQ 2021", type: "PYQ", semester: 1, subjectName: "Engineering Graphics", subjectCode: "BT-105", fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", views: 190, createdAt: new Date().toISOString() },
    { _id: "7", title: "Mathematics II PYQ 2023", type: "PYQ", semester: 2, subjectName: "Mathematics II", subjectCode: "BT-201", fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", views: 240, createdAt: new Date().toISOString() },
    { _id: "8", title: "Physics Notes Unit 1 & 2", type: "NOTE", semester: 2, subjectName: "Engineering Physics", subjectCode: "BT-202", fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", views: 410, createdAt: new Date().toISOString() },

    // COMPUTER SCIENCE - SEM 3
    { _id: "101", title: "Data Structures Complete Notes", type: "NOTE", semester: 3, subjectName: "Data Structures", subjectCode: "CS-302", fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", views: 980, createdAt: new Date().toISOString() },
    { _id: "102", title: "Data Structures 2023 PYQ", type: "PYQ", semester: 3, subjectName: "Data Structures", subjectCode: "CS-302", fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", views: 640, createdAt: new Date().toISOString() },
    { _id: "103", title: "OOP Methodology C++ Notes", type: "NOTE", semester: 3, subjectName: "Object Oriented Programming", subjectCode: "CS-303", fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", views: 520, createdAt: new Date().toISOString() },
    { _id: "104", title: "Discrete Structures Syllabus", type: "SYLLABUS", semester: 3, subjectName: "Discrete Structures", subjectCode: "CS-305", fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", views: 110, createdAt: new Date().toISOString() },
    { _id: "105", title: "Digital Systems Design Notes", type: "NOTE", semester: 3, subjectName: "Digital Systems", subjectCode: "CS-304", fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", views: 400, createdAt: new Date().toISOString() },

    // COMPUTER SCIENCE - SEM 4
    { _id: "201", title: "Operating Systems Galvin Notes", type: "NOTE", semester: 4, subjectName: "Operating Systems", subjectCode: "CS-402", fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", views: 870, createdAt: new Date().toISOString() },
    { _id: "202", title: "Software Engineering 2022 PYQ", type: "PYQ", semester: 4, subjectName: "Software Engineering", subjectCode: "CS-403", fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", views: 430, createdAt: new Date().toISOString() },
    { _id: "203", title: "Computer Architecture Notes", type: "NOTE", semester: 4, subjectName: "Computer Architecture", subjectCode: "CS-404", fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", views: 320, createdAt: new Date().toISOString() },
    { _id: "204", title: "Theory of Computation (TOC) PYQ 2023", type: "PYQ", semester: 4, subjectName: "Theory of Computation", subjectCode: "CS-405", fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", views: 760, createdAt: new Date().toISOString() },

    // COMPUTER SCIENCE - SEM 5
    { _id: "205", title: "DBMS 2023 PYQ", type: "PYQ", semester: 5, subjectName: "Database Management", subjectCode: "CS-501", fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", views: 1100, createdAt: new Date().toISOString() },
    { _id: "206", title: "Computer Networks Notes Unit 1-4", type: "NOTE", semester: 5, subjectName: "Computer Networks", subjectCode: "CS-502", fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", views: 780, createdAt: new Date().toISOString() },
    { _id: "207", title: "Cloud Computing Syllabus", type: "SYLLABUS", semester: 5, subjectName: "Cloud Computing", subjectCode: "CS-503", fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", views: 150, createdAt: new Date().toISOString() },

    // CIVIL & MECH & IT RANDOM
    { _id: "301", title: "Fluid Mechanics Notes", type: "NOTE", semester: 3, subjectName: "Fluid Mechanics", subjectCode: "CE-303", fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", views: 120, createdAt: new Date().toISOString() },
    { _id: "302", title: "Thermodynamics 2022 PYQ", type: "PYQ", semester: 3, subjectName: "Thermodynamics", subjectCode: "ME-303", fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", views: 95, createdAt: new Date().toISOString() },
    { _id: "303", title: "Web Technologies Notes", type: "NOTE", semester: 4, subjectName: "Web Technologies", subjectCode: "IT-402", fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", views: 1050, createdAt: new Date().toISOString() },

    // VIDEOS
    { _id: "401", title: "Data Structures Complete Tutorial", type: "VIDEO", semester: 3, subjectName: "Data Structures", subjectCode: "CS-302", videoUrl: "https://www.youtube.com/embed/RBSUZEBXbx8", views: 450, createdAt: new Date().toISOString() },
    { _id: "402", title: "Operating Systems Basics", type: "VIDEO", semester: 4, subjectName: "Operating Systems", subjectCode: "CS-402", videoUrl: "https://www.youtube.com/embed/vBURTt97EHs", views: 320, createdAt: new Date().toISOString() }
];

router.get("/", (req, res) => {
    const { search, semester, type } = req.query;
    let filtered = [...mockResources];

    if (semester) filtered = filtered.filter(r => r.semester == semester);
    if (type) filtered = filtered.filter(r => r.type === type);

    if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(r =>
            r.title.toLowerCase().includes(s) ||
            r.subjectCode.toLowerCase().includes(s) ||
            r.subjectName.toLowerCase().includes(s)
        );
    }

    res.json(filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
});

router.get("/trending", (req, res) => {
    const newest = [...mockResources].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10);
    const popular = [...mockResources].sort((a, b) => b.views - a.views).slice(0, 10);
    res.json({ newest, popular });
});

router.get("/:id", (req, res) => {
    const resource = mockResources.find(r => r._id === req.params.id);
    if (!resource) return res.status(404).json({ message: "Resource not found" });

    resource.views += 1;
    res.json(resource);
});

router.post("/", (req, res) => {
    const resource = {
        ...req.body,
        _id: Math.random().toString(36).substr(2, 9),
        views: 0,
        createdAt: new Date().toISOString()
    };
    mockResources.push(resource);
    res.status(201).json(resource);
});

router.put("/:id", (req, res) => {
    const idx = mockResources.findIndex(r => r._id === req.params.id);
    if (idx !== -1) {
        mockResources[idx] = { ...mockResources[idx], ...req.body };
        res.json(mockResources[idx]);
    } else {
        res.status(404).json({ message: "Not found" });
    }
});

router.delete("/:id", (req, res) => {
    mockResources = mockResources.filter(r => r._id !== req.params.id);
    res.json({ message: "Deleted" });
});

module.exports = router;
