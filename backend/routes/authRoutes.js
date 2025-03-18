const express = require("express");
const router = express.Router();
const User = require("../models/Team"); // Import User model

// POST route for user login
// POST route to register a new team
router.post("/register", async (req, res) => {
    try {
        const { teamname, memname1, memname2 } = req.body;

        if (!teamname || !memname1 || !memname2) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if team already exists
        const existingUser = await User.findOne({ teamname });
        if (existingUser) {
            return res.status(409).json({ message: "Team already registered" });
        }

        // Create a new team entry
        const newUser = new User({ teamname, memname1, memname2 });
        await newUser.save();

        res.status(201).json({ message: "Team registered successfully", user: newUser });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;
