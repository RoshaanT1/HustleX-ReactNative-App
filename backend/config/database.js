import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables



// Initialize Sequelize connection using environment variables
const sequelize = new Sequelize("semester_project", "sa", "MySecure@123", {
  host: "localhost", // Uses DB_HOST from .env
  dialect: "mssql", // Using SQL Server
  logging: false, // Disable logging for cleaner output
  port:4001,
  dialectOptions: {
    options: {
       trustedConnection: true, // Use Windows Auth
      encrypt: true, // Enable encryption
      trustServerCertificate: true, // Required for self-signed certificates
    },
  },
});

// Test database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
};

testConnection();

export default sequelize;




/*
import { Sequelize } from 'sequelize';

// Define database connection parameters
const sequelize = new Sequelize('semester_project', 'sa', 'MySecure@123', {
    host: 'localhost', // or 'DESKTOP-69H2STN\\SQLEXPRESS'
    dialect: 'mssql',
    logging: false,
    dialectOptions: {
      options: {
        encrypt: true, 
        trustServerCertificate: true 
      }
    }
  });  

// Test database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

testConnection();

export default sequelize;*/