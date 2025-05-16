import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ReviewRating = sequelize.define('ReviewRating', {
  review_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  worker_id: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.INTEGER, allowNull: false },
  review_text: { type: DataTypes.TEXT, allowNull: true },
  review_date: { type: DataTypes.DATE, allowNull: false }
}, { tableName: 'Reviews_Ratings', timestamps: false });

export default ReviewRating;