import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import  sequelize  from '../config/database.js';
import { Op } from 'sequelize';
import crypto from "crypto";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import db from "../models/Association.js"; // Import database

dotenv.config();

/////////////////////////// SIGNUP //////////////////////////////////////////

const signupUser = async (req, res) => {
  try {
    console.log("📩 Received Data:", req.body);

    const { email, password, age, gender, phone_number, full_name, city, address } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email." });
    }

    // Validate required fields
    if (!phone_number) {
      return res.status(400).json({ message: "Phone number is required." });
    }

    if (!full_name) {
      return res.status(400).json({ message: "Full name is required." });
    }

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    // 🔒 Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create new user in database with provided values
    const newUser = await User.create({
      email,
      password: hashedPassword,
      age,
      gender,
      full_name,
      phone_number,
      address: address || "Not Provided", // Accept dynamic or default value
      city: city || "Not Provided",       // Accept dynamic or default value
      requests_num: 0
    });

    // 🔑 Generate JWT Token
    const token = jwt.sign(
      { user_id: newUser.user_id, email: newUser.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User registered successfully!",
      token,
      user: {
        user_id: newUser.user_id,
        email: newUser.email,
        full_name: newUser.full_name,
        phone_number: newUser.phone_number,
        age: newUser.age,
        gender: newUser.gender,
        address: newUser.address,
        city: newUser.city
      }
    });

  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

////////////////////////// LOGIN ////////////////////////////////////////////////////

const loginUser = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    // 🔍 Find user by email OR phone number
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: emailOrPhone }, { phone_number: emailOrPhone }]
      }
    });

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    // 🔒 Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // 🔑 Generate JWT Token
    const token = jwt.sign({ user_id: user.user_id, email: user.email }, process.env.JWT_SECRET);

    res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        user_id: user.user_id,
        email: user.email,
        full_name: user.full_name,
        phone_number: user.phone_number,
        age: user.age,
        gender: user.gender,
        address: user.address,
        city: user.city

      }
    });

  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



/////////////////////////// requestPasswordReset //////////////generates token and send email

const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Generate a random 5-digit code
    const resetCode = Math.floor(10000 + Math.random() * 90000); // Generates a 5-digit code
    const resetCodeExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 mins expiration

    // Update user with the reset code and expiry
    await user.update({
      reset_token: resetCode.toString(),
      reset_token_expiry: sequelize.literal(`CONVERT(DATETIME, '${resetCodeExpiry.toISOString().slice(0, 19).replace('T', ' ')}', 120)`)
    });

    // Set up email transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      authMethod: 'LOGIN',
      tls: { rejectUnauthorized: false }
    });

    // Send the 5-digit code in the email body
    const mailOptions = {
      from: `"HustleX App" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Password Reset Request</h2>
          <p>You have requested to reset your password for your HustleX account.</p>
          <p>Your 5-digit reset code is: <strong>${resetCode}</strong></p>
          <p>Please use this code within 15 minutes to reset your password.</p>
          <p>If you did not request a password reset, please ignore this email.</p>
        </div>`
    };

    // Send the email with the reset code
    await transporter.sendMail(mailOptions);

    // Return the 5-digit code in the response (not recommended in production, just for this use case)
    res.json({
      message: "Password reset code sent to email.",
      resetCode: resetCode // Include the reset code in the response
    });

  } catch (error) {
    console.error("Error in requestPasswordReset:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/////////////////////////// resetPassword //////////////gets token and sets new password

const resetPassword = async (req, res) => { 
  try { 
    const { resetToken, newPassword } = req.body; 
 
    if (!resetToken || !newPassword) { 
      return res.status(400).json({ message: "Token and new password are required." }); 
    } 
 
    // Validate Password Complexity 
    const passwordComplexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; 
    if (!passwordComplexityRegex.test(newPassword)) { 
      return res.status(400).json({ 
        message: 
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.", 
      }); 
    } 
 
    // Find user with detailed logging
    const foundUser = await User.findOne({ 
      where: { 
        reset_token: resetToken
      },
      attributes: ['user_id', 'email', 'reset_token', 'reset_token_expiry'] // Specify exact fields to retrieve
    });

    // Extensive logging
    console.log('Reset Token Search Details:', {
      resetToken,
      foundUser: foundUser ? {
        userId: foundUser.user_id,
        email: foundUser.email,
        resetToken: foundUser.reset_token,
        resetTokenExpiry: foundUser.reset_token_expiry,
        isTokenMatch: foundUser.reset_token === resetToken,
        currentTime: new Date(),
        expiryTime: foundUser.reset_token_expiry,
        isExpired: foundUser.reset_token_expiry ? foundUser.reset_token_expiry < new Date() : true
      } : null
    });

    if (!foundUser) {
      return res.status(400).json({ message: "No user found with this reset token." });
    }

    // Explicit expiry check
    if (!foundUser.reset_token_expiry || foundUser.reset_token_expiry < new Date()) {
      return res.status(400).json({ 
        message: "Reset token has expired.",
        details: {
          tokenExpiry: foundUser.reset_token_expiry,
          currentTime: new Date()
        }
      });
    }
 
    // Hash new password 
    const hashedPassword = await bcrypt.hash(newPassword, 10); 
 
    // Update user password and clear reset fields 
    await foundUser.update({ 
      password: hashedPassword, 
      reset_token: null, 
      reset_token_expiry: null 
    });
 
    res.json({ message: "Password reset successful! You can now log in." }); 
  } catch (error) { 
    console.error("❌ Password Reset Error:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
      sql: error.sql
    }); 
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    }); 
  } 
};



/////////////////////////// updateFullName /////////////////////////////////////

const updateFullName = async (req, res) => {
  try {
    const { userId } = req.user;
    const { full_name } = req.body;

    // Validate input
    if (!full_name) {
      return res.status(400).json({ message: 'Full name is required' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.full_name = full_name;
    await user.save();

    res.status(200).json({ 
      message: 'Full name updated successfully', 
      user: { full_name: user.full_name } 
    });
  } catch (error) {
    console.error('Error updating full name:', error);
    res.status(500).json({ message: 'Error updating full name', error: error.message });
  }
};

/////////////////////////// updateEmail //////////////////////////////////////////

const updateEmail = async (req, res) => {
  try {
    const { userId } = req.user;
    const { email } = req.body;

    // Validate input
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser && existingUser.user_id !== userId) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.email = email;
    await user.save();

    res.status(200).json({ 
      message: 'Email updated successfully', 
      user: { email: user.email } 
    });
  } catch (error) {
    console.error('Error updating email:', error);
    res.status(500).json({ message: 'Error updating email', error: error.message });
  }
};

/////////////////////////// updateGender ////////////////////////////////////////////

const updateGender = async (req, res) => {
  try {
    const { userId } = req.user;
    const { gender } = req.body;

    // Validate input
    if (!gender) {
      return res.status(400).json({ message: 'Gender is required' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.gender = gender;
    await user.save();

    res.status(200).json({ 
      message: 'Gender updated successfully', 
      user: { gender: user.gender } 
    });
  } catch (error) {
    console.error('Error updating gender:', error);
    res.status(500).json({ message: 'Error updating gender', error: error.message });
  }
};


/////////////////////////// updateAge ///////////////////////////////////////////////////////
const updateAge = async (req, res) => {
  try {
    const { userId } = req.user;
    const { age } = req.body;

    // Validate input
    if (!age || age < 18 || age > 100) {
      return res.status(400).json({ message: 'Age should be greater than 18 and less than 100' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.age = age;
    await user.save();

    res.status(200).json({ 
      message: 'Age updated successfully', 
      user: { age: user.age } 
    });
  } catch (error) {
    console.error('Error updating age:', error);
    res.status(500).json({ message: 'Error updating age', error: error.message });
  }
};


/////////////////////////// updateCity ///////////////////////////////////////////////////

const updateCity = async (req, res) => {
  try {
    const { userId } = req.user;
    const { city } = req.body;

    // Validate input
    if (!city) {
      return res.status(400).json({ message: 'City is required' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.city = city;
    await user.save();

    res.status(200).json({ 
      message: 'City updated successfully', 
      user: { city: user.city } 
    });
  } catch (error) {
    console.error('Error updating city:', error);
    res.status(500).json({ message: 'Error updating city', error: error.message });
  }
};


/////////////////////////// updateAddress //////////////////////////////////////////////////////
const updateAddress = async (req, res) => {
  try {
    const { userId } = req.user;
    const { address } = req.body;

    // Validate input
    if (!address) {
      return res.status(400).json({ message: 'Address is required' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.address = address;
    await user.save();

    res.status(200).json({ 
      message: 'Address updated successfully', 
      user: { address: user.address } 
    });
  } catch (error) {
    console.error('Error updating address:', error);
    res.status(500).json({ message: 'Error updating address', error: error.message });
  }
};



/////////////////////////// updatePhoneNumber //////////////////////////////////////////

const updatePhoneNumber = async (req, res) => {
  try {
    const { userId } = req.user;
    const { phone_number } = req.body;

    // Validate input (strictly enforce 000-000-0000 format)
    if (!phone_number || !/^\d{3}-\d{3}-\d{4}$/.test(phone_number)) {
      return res.status(400).json({ 
        message: 'Phone number must be in 000-000-0000 format' 
      });
    }

    // Check if phone number already exists (for uniqueness)
    const existingUser = await User.findOne({ 
      where: { phone_number } 
    });
    
    if (existingUser && existingUser.user_id !== userId) {
      return res.status(400).json({ 
        message: 'Phone number already in use by another user' 
      });
    }

    // Update the phone number
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.phone_number = phone_number;
    await user.save();

    res.status(200).json({ 
      message: 'Phone number updated successfully', 
      user: { phone_number: user.phone_number } 
    });
  } catch (error) {
    console.error('Error updating phone number:', error);
    res.status(500).json({ 
      message: 'Error updating phone number', 
      error: error.message 
    });
  }
};

/////////////////////////// updatePassword /////////////////////////////////////////////////////////////

const updatePassword = async (req, res) => {
  try {
    const { userId } = req.user;
    const { currentPassword, newPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ 
        message: 'Current password and new password are required' 
      });
    }

    // Password length check
    if (newPassword.length < 8) {
      return res.status(400).json({ 
        message: 'Password must be at least 8 characters long'
      });
    }

    // Password complexity check
    const passwordComplexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordComplexityRegex.test(newPassword)) {
      return res.status(400).json({ 
        message: 'Password must include uppercase, lowercase, number, and special character'
      });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ 
      message: 'Password updated successfully'
    });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ 
      message: 'Error updating password', 
      error: error.message 
    });
  }
};


/////////////////////////// logoutUser /////////////////////////////////////////////////////////////

const logoutUser = async (req, res) => {
  try {
    // Simply return a success response
    // The actual token invalidation will happen client-side
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ message: 'Error during logout', error: error.message });
  }
};







//////////////////////////// Upload Profile Picture /////////////////////////////////////////

const uploadProfilePicture = async (req, res) => {
  try {
    const userId = req.user.userId; // Authenticated user ID
    const user = await db.User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    if (!req.file) {
      return res.status(400).json({ 
        message: "No file uploaded",
        help: "Make sure you're sending a file with field name 'picture' in your form-data"
      });
    }

    // Delete old profile picture if it exists
    if (user.profile_picture) {
      const oldImagePath = path.join("uploads/profile-pictures", user.profile_picture);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // Save new profile picture path (only filename is stored in DB)
    user.profile_picture = req.file.filename;
    await user.save();

    res.status(200).json({
      message: "Profile picture updated successfully",
      profile_picture: `/uploads/profile-pictures/${req.file.filename}` 
    });
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    res.status(500).json({ 
      message: "Error uploading profile picture", 
      error: error.message
    });
  }
};

///////////////////////////////// Delete Profile Picture////////////////////////////////////////

const deleteProfilePicture = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await db.User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.profile_picture) {
      const picturePath = path.join("uploads/profile-pictures", user.profile_picture); 
      if (fs.existsSync(picturePath)) {
        fs.unlinkSync(picturePath);
      }
      user.profile_picture = null;
      await user.save();
    }

    res.status(200).json({ message: "Profile picture deleted successfully" });
  } catch (error) {
    console.error("Error deleting profile picture:", error);
    res.status(500).json({ message: "Failed to delete profile picture", error: error.message });
  }
};






export { signupUser, loginUser, requestPasswordReset, resetPassword, updateFullName, updateEmail, updateGender, updateAge, 
  updateCity, updateAddress, updatePhoneNumber, updatePassword, logoutUser, uploadProfilePicture,  deleteProfilePicture };









