const express = require("express");
const multer = require("multer");
const path = require("path");
const { registerUser, getAllUsers, updateUser, deleteUser } = require("../controllers/userController");
const userCheck = require("../middlewares/userCheck");

const router = express.Router();

// Multer storage for profile images
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, req.body.username + ext);
    }
});
const upload = multer({ storage, fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(new Error("Only JPG and PNG files are allowed"), false);
    }
}});

// Register user
router.post("/register", upload.single("profileImage"), registerUser);

// Get all users
router.get("/users", getAllUsers);

// Update user profile
router.put("/update", userCheck, upload.single("profileImage"), updateUser);

// Delete user
router.delete("/delete", userCheck, deleteUser);

module.exports = router;
