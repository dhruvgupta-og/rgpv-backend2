const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required (e.g., 'Chem 2021 PYQ')"],
            trim: true,
        },
        type: {
            type: String,
            enum: ["NOTE", "PYQ", "SYLLABUS"],
            required: true,
        },
        semester: {
            type: Number,
            required: [true, "Semester (1-8) is required"],
            min: 1,
            max: 8,
        },
        subjectName: {
            type: String,
            required: [true, "Subject name is required"],
        },
        subjectCode: {
            type: String,
            required: [true, "Subject code is required (e.g., BT-101)"],
        },
        fileUrl: {
            type: String, // This will be the Cloudinary or Firebase Storage URL
            required: [true, "Link to the uploaded PDF file is required"],
        },
        thumbnailUrl: {
            type: String, // Optional cover image
            default: "",
        },
        views: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

// We can add indexing to make searching extremely fast from the Android App
resourceSchema.index({ title: "text", subjectName: "text" });

module.exports = mongoose.model("Resource", resourceSchema);
