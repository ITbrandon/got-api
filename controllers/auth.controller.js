import 'dotenv/config';
import users from "../models/users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer'

export const registerUser = async (req, res) => {
    try {
        const {email, username, password} = req.body;

        const existingUsername = await users.findOne({ username });
        const existingUserEmail = await users.findOne({ email });

        if (existingUsername || existingUserEmail) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new users({email, username, password})
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

export const forgetUsername = async (req, res) => {
    try {
        const { email } = req.body

        const user = await users.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS, 
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Here is Your Username",
            text: `Hello, your username is: ${user.username}`,
        };

        await transporter.sendMail(mailOptions)

        res.json({ message: "Username sent to your email" });
    }

    catch(error) {
        res.status(500).json({ message: error.message });
    }
}

export const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body

        const user = await users.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS, 
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset Request",
            text: `Click the link to reset your password: ${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`,
        };

        await transporter.sendMail(mailOptions)

        res.json({ message: "Password reset link sent to your email" });
    }

    catch(error) {
        res.status(500).json({ message: error.message });
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await users.findById(decoded.id);

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        user.password = newPassword;
        await user.save();

        res.json({ message: "Password reset successful" });

    } 
    
    catch (error) {
        res.status(400).json({ message: "Invalid or expired token" });
    }
}