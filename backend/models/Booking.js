import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Booking = sequelize.define('Booking', {
  booking_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  worker_id: { type: DataTypes.INTEGER, allowNull: false },
  service_id: { type: DataTypes.INTEGER, allowNull: false },
  booking_date: { type: DataTypes.DATE, allowNull: false },
  time_slot: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false },
  total_price: { type: DataTypes.FLOAT, allowNull: false }
}, { tableName: 'Bookings', timestamps: false });

export default Booking;