import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Payment = sequelize.define('Payment', {
  payment_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  booking_id: { type: DataTypes.INTEGER, allowNull: false },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  worker_id: { type: DataTypes.INTEGER, allowNull: false },
  amount_paid: { type: DataTypes.FLOAT, allowNull: false },
  payment_method: { type: DataTypes.STRING, allowNull: false },
  payment_status: { type: DataTypes.STRING, allowNull: false },
  payment_date: { type: DataTypes.DATE, allowNull: false }
}, { tableName: 'Payments', timestamps: false });

export default Payment;