import express from 'express';
import { signupUser , loginUser, requestPasswordReset, resetPassword, updateFullName, updateEmail, 
    updateGender, updateAge, updateCity, updateAddress, updatePhoneNumber, updatePassword, logoutUser,
    uploadProfilePicture, deleteProfilePicture } from '../controllers/userController.js';
import { signupValidations } from '../errorHandling/signupValidation.js';
import { loginValidations } from '../errorHandling/loginValidation.js';
import {authenticateToken} from '../middlewares/authMiddleware.js';
import wrappedUploadProfile from '../middlewares/uploadMiddleware.js';


const userRouter = express.Router();


// Authentication Routes
userRouter.post('/signup', signupValidations, signupUser);// Signup route with validation middleware
userRouter.post('/login', loginValidations, loginUser);// Login route with validation
userRouter.post("/request-password-reset", requestPasswordReset); // Forgot Password Request
userRouter.post("/reset-password", resetPassword); // Reset Password
userRouter.post('/logout', authenticateToken, logoutUser);

// User Profile Update Routes
userRouter.put('/update-name', authenticateToken, updateFullName);
userRouter.put('/update-email', authenticateToken, updateEmail);
userRouter.put('/update-gender', authenticateToken, updateGender);
userRouter.put('/update-age', authenticateToken, updateAge);
userRouter.put('/update-city', authenticateToken, updateCity);
userRouter.put('/update-address', authenticateToken, updateAddress);
userRouter.put('/update-phone', authenticateToken, updatePhoneNumber);
userRouter.put('/update-password', authenticateToken, updatePassword);
userRouter.put('/update-profile-picture', authenticateToken, wrappedUploadProfile, uploadProfilePicture);

// Profile Picture Routes
userRouter.post('/upload-profile-picture', authenticateToken, wrappedUploadProfile, uploadProfilePicture);
userRouter.delete('/delete-profile-picture', authenticateToken, deleteProfilePicture);


export default userRouter