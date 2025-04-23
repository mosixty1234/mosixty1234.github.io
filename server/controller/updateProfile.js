const crypto = require('crypto');
const User = require('../models/user');
const mongoose = require('mongoose');



const hashPassword = (password, salt) => {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

};

const updateProfile = async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        console.log("Uploaded File:", req.file);

        const userId = req.user.id;
        const updateData = {};

        // Add fields to the update object only if they are provided
        if (req.body.name) updateData.name = req.body.name;
        if (req.body.email) updateData.email = req.body.email;
        


        if (req.body.old_pass && req.body.new_pass && req.body.c_pass) {
            const user = await User.findById(userId);
            if(!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            const hashedOldPassword = hashPassword(req.body.old_pass, user.salt);
            if (hashedOldPassword !== user.password) {
                return res.status(400).json({ error: 'Old password is incorrect' });
            }
            if (req.body.new_pass !== req.body.c_pass) {
                return res.status(401).json({ error: 'New password and confirmation do not match' });
            }
            const newSalt = crypto.randomBytes(16).toString('hex');
            const hashedNewPassword = hashPassword(req.body.new_pass, newSalt);
            updateData.password = hashedNewPassword;
            updateData.salt = newSalt;
        }
        if (req.file) updateData.profilePicture = req.file.id;

        // Update user profile
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({
            message: 'Profile updated successfully',
            user: {
                name: updatedUser.name,
                email: updatedUser.email,
                profilePicture: updatedUser.profilePicture,
            },
        });
    } catch (error) {
        console.error("Error in updateProfile:", error);
        res.status(500).json({ error: 'Server error' });
    }
};


const getUserDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // If user has a profilePicture (which is a GridFS file ID)
    let profilePictureUrl = null;
    if (user.profilePicture) {
      const fileId = new mongoose.Types.ObjectId(user.profilePicture);
      const file = await mongoose.connection.db.collection('uploads.files').findOne({ _id: fileId });

      if (file && file.filename) {
        profilePictureUrl = `http://localhost:3000/uploads/${file.filename}`;
      }
    }

    const userWithImage = {
      ...user.toObject(),
      profilePictureUrl: profilePictureUrl || null
    };

    res.status(200).json(userWithImage);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { updateProfile, getUserDetails };