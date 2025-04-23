const User = require('../models/user');
const crypto = require('crypto');


function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    
    return { salt, hash };
}
// Register Controller
const registerUser = async (req, res) => {
    try {

        console.log("Registering user...", req.body);
        console.log("Uploading file...", req.file);

        const { name, email, password, confirmPassword } = req.body;


        if (!req.file) {
            return res.status(400).json({ error: 'Profile picture is required' });

        }
        console.log("Uploaded file metadata:", req.file);

        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Profile Picture:", req.file);

        // Validate required fields
        if (!name || !email || !password || !confirmPassword || !req.file) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Validate password match
        if (password !== confirmPassword) {
            return res.status(401).json({ error: 'Passwords do not match' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(402).json({ error: 'Email is already registered' });
        }

        // Hash the password
        const { salt, hash } = hashPassword(password);
        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hash,
            salt,
            profilePicture: req.file.id,
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { registerUser };