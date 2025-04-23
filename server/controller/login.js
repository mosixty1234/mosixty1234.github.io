const User = require('../models/user');
const crypto = require('crypto');
const { console } = require('inspector');
const jwt = require('jsonwebtoken');


function verifyPassword(password, salt, hash) {
    const hashToVerify = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return hash === hashToVerify;
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login details:', { email, password });

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'User does not exist' });
        }

        // Verify the password
        const isValid = verifyPassword(password, user.salt, user.password);
        if (!isValid) {
            console.log('Invalid password attempt for user:', email);
            return res.status(402).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
           
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        console.log('token decode', token);
        // Successful login
        res.status(200).json({
            message: 'Login successful',
            token,
            user: { name: user.name, email: user.email }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { loginUser };