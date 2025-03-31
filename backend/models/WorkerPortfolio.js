import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const WorkerPortfolio = sequelize.define('WorkerPortfolio', {
  portfolio_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  worker_id: { type: DataTypes.INTEGER, allowNull: false },
  image_url: { type: DataTypes.STRING, allowNull: true },
  description: { type: DataTypes.TEXT, allowNull: false },
  upload_date: { type: DataTypes.DATE, allowNull: false },
  num_successful_works: { type: DataTypes.INTEGER, allowNull: false }
}, { tableName: 'Worker_Portfolio', timestamps: false });

export default WorkerPortfolio;
