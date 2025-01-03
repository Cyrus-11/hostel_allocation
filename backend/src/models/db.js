const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false // Disable logging if you don't need it
});

// Import the models (No need to call them as functions)
const Student = require('./Student');
const Payment = require('./Payments');
const RoomAllocation = require('./roomAllocations');

// Export models
module.exports = {
  Student,
  Payment,
  RoomAllocation,
  sequelize
};
