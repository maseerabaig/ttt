const User = require("../models/User");
const fs = require("fs");
const path = require("path");

//Register User
const registerUser = async (req, res) => {
    try {
        const { userId, username, email } = req.body;

        if (!userId || !username || !email || !req.file) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newUser = new User({
            userId,
            username,
            email,
            profileImage: req.file.path
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update User Profile
const updateUser = async (req, res) => {
    try {
        const { username, email } = req.body;
        const user = req.user;

        if (req.file) {
            if (user.profileImage) {
                fs.unlinkSync(user.profileImage); // Delete old profile picture
            }
            user.profileImage = req.file.path;
        }
        if (username) user.username = username;
        if (email) user.email = email;

        await user.save();
        res.json({ message: "Profile updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete User
const deleteUser = async (req, res) => {
    try {
        const user = req.user;

        // Delete profile image
        if (user.profileImage) {
            fs.unlinkSync(user.profileImage);
        }

        await User.deleteOne({ userId: user.userId });
        res.json({ message: "Profile deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { registerUser, getAllUsers, updateUser, deleteUser };

