
import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/database.js"; // Ensure correct path

const User = sequelize.define(
  "User",
  {
    user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    full_name: { type: DataTypes.STRING, allowNull: false },
    // cnic: { type: DataTypes.STRING, allowNull: true, unique: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    phone_number: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    registration_date: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("GETDATE()"),},
    requests_num: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    age: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 18 },
    gender: { type: DataTypes.STRING, allowNull: false },
    reset_token: {type: DataTypes.STRING,allowNull: true,}, // Default is NULL for new users }
    reset_token_expiry: {type: DataTypes.DATE,allowNull: true,}, // Default is NULL for new users}
    profile_picture: {type: DataTypes.STRING, allowNull: true}// Stores file path
  },
  {
    tableName: "Users", // Ensure correct table name
    timestamps: false
  }
);

export default User;




/*
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js"; // Ensure correct path

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  age: { type: DataTypes.INTEGER, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  gender: { type: DataTypes.STRING, allowNull: false }
}, {
  
  timestamps: true
});

export default User;
*/