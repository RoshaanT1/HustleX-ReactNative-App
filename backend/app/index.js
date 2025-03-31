
import { Sequelize } from "sequelize";
import dotenv from "dotenv";  // Load environment variables
dotenv.config();

import express from "express";
import cors from "cors"; // Enable CORS for API requests
import multer from "multer"; // ✅ Import multer for form-data support
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "../config/dbconnect.js"; // Database connection
import db from "../models/Association.js"; // Import models with associations
import userRouter from "../routes/userRoutes.js"; // Import your routes

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Enable cross-origin requests

// ✅ Multer setup (for parsing form-data)
//const upload = multer();
//app.use(upload.none()); // This makes `req.body` work for form-data


// ✅ Serve static files (profile pictures)
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));
// Use Routes
app.use('/api', userRouter);

// Connect to database and sync models properly
async function startServer() {
  try {
    await connectDB(); // Ensure DB connection before syncing
    console.log("✅ Connected to Database");

    await db.sequelize.sync({ alter: false }); // Set alter:true only in dev
    console.log("✅ Database synchronized successfully.");

    // Start the server after successful DB sync
    app.listen(port, () => {
      console.log(`🚀 Server is running on port: ${port}`);
    });
  } catch (err) {
    console.error("❌ Error during initialization:", err);
  }
}

startServer();

