import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Service = sequelize.define('Service', {
  service_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  service_name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false }
}, { tableName: 'Services', timestamps: false });

export default Service;