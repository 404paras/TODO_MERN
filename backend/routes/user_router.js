import { Router } from "express";
import { User } from '../models/user.js';
import bcrypt from 'bcrypt';

const router = new Router();

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw new Error('Could not hash password');
    }
};

router.post('/register', async (req, res) => {
    try {
        console.log(req.body);
        const { email, username, password } = req.body;
        const hashedPassword = await hashPassword(password); // Await the hashed password
        console.log(hashedPassword);
        const user = new User({ email, username, password: hashedPassword }); // Use the hashed password
        await user.save();
        res.status(200).json({ success: true, message: 'User saved successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message, message: 'User already exists' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });

    // Use a generic error message for better security
    const errorMessage = "Invalid username or password";

    // Check if the user exists and if the provided password is correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: errorMessage }); // Use status code 401 for unauthorized access
    }

    // If the user and password are correct, respond with success
    res.status(200).json({ message: "Login successful",id:user._id });
});

export default router;
