import 'dotenv/config';
import users from "../models/users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const {username, password} = req.body;

        const existingUser = await users.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const newUser = new users({username, password})
        await newUser.save()

        res.status(201).json({ message: "User registered successfully" });
    }

    catch(err) {
        res.status(500).json({ message: err.message });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await users.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "Invalid username or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ token, message: "Login successful" });
    } 

    catch (error) {
        res.status(500).json({ message: error.message });
    }
};