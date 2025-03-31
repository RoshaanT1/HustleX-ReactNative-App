import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure the directory exists
const uploadDir = "uploads/profile-pictures/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = "profile-" + uniqueSuffix + path.extname(file.originalname);
    cb(null, filename);
  },
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// Multer instance
const uploadProfile = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max 5MB
}).single("picture"); // Field name must be 'picture' in the form-data

// Create an error-handling middleware wrapper
const wrappedUploadProfile = (req, res, next) => {
  uploadProfile(req, res, (err) => {
    if (err) {
      return res.status(400).json({ 
        message: "Error uploading file", 
        error: err.message,
        solution: err.code === 'LIMIT_UNEXPECTED_FILE' 
          ? "Make sure you're using 'picture' as the form field name in your request" 
          : undefined
      });
    }
    next();
  });
};

export default wrappedUploadProfile;