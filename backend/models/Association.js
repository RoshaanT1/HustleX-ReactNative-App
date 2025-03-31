import sequelize from '../config/database.js';
import User from './User.js';
import ServiceProvider from './ServiceProvider.js';
import Service from './Service.js';
import Booking from './Booking.js';
import ReviewRating from './ReviewRating.js';
import Payment from './Payment.js';
import WorkerPortfolio from './WorkerPortfolio.js';

// Define models object
const db = { sequelize, User, ServiceProvider, Service, Booking, ReviewRating, Payment, WorkerPortfolio };

// User - Bookings (One-to-Many)
User.hasMany(Booking, { foreignKey: 'user_id' });
Booking.belongsTo(User, { foreignKey: 'user_id' });

// ServiceProvider - Bookings (One-to-Many)
ServiceProvider.hasMany(Booking, { foreignKey: 'worker_id' });
Booking.belongsTo(ServiceProvider, { foreignKey: 'worker_id' });

// Service - Bookings (One-to-Many)
Service.hasMany(Booking, { foreignKey: 'service_id' });
Booking.belongsTo(Service, { foreignKey: 'service_id' });

// User - ReviewRating (One-to-Many)
User.hasMany(ReviewRating, { foreignKey: 'user_id' });
ReviewRating.belongsTo(User, { foreignKey: 'user_id' });

// ServiceProvider - ReviewRating (One-to-Many)
ServiceProvider.hasMany(ReviewRating, { foreignKey: 'worker_id' });
ReviewRating.belongsTo(ServiceProvider, { foreignKey: 'worker_id' });

// Booking - Payment (One-to-One)
Booking.hasOne(Payment, { foreignKey: 'booking_id' });
Payment.belongsTo(Booking, { foreignKey: 'booking_id' });

// User - Payments (One-to-Many)
User.hasMany(Payment, { foreignKey: 'user_id' });
Payment.belongsTo(User, { foreignKey: 'user_id' });

// ServiceProvider - Payments (One-to-Many)
ServiceProvider.hasMany(Payment, { foreignKey: 'worker_id' });
Payment.belongsTo(ServiceProvider, { foreignKey: 'worker_id' });

// ServiceProvider - Service (Many-to-One)
ServiceProvider.belongsTo(Service, { foreignKey: 'service_type_id' });
Service.hasMany(ServiceProvider, { foreignKey: 'service_type_id' });

// ServiceProvider - WorkerPortfolio (One-to-One)
ServiceProvider.hasOne(WorkerPortfolio, { foreignKey: 'worker_id' });
WorkerPortfolio.belongsTo(ServiceProvider, { foreignKey: 'worker_id' });

// Export the database object with associations
export default db;
