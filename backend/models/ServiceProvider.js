import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ServiceProvider = sequelize.define('ServiceProvider', {
  worker_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  full_name: { type: DataTypes.STRING, allowNull: false },
  cnic: { type: DataTypes.STRING, allowNull: false, unique: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  phone_number: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
  city: { type: DataTypes.STRING, allowNull: false },
  service_type_id: { type: DataTypes.INTEGER, allowNull: false },
  experience_years: { type: DataTypes.INTEGER, allowNull: false },
  availability_status: { type: DataTypes.STRING, allowNull: false },
  rating: { type: DataTypes.FLOAT, allowNull: false },
  registration_date: { type: DataTypes.DATE, allowNull: false },
  num_successful_works: { type: DataTypes.INTEGER, allowNull: false }
}, { tableName: 'Service_Provider', timestamps: false });

export default ServiceProvider;