const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Payment = sequelize.define('Payment', {
  payment_id: { 
    type: DataTypes.STRING, 
    unique: true 
  },
  student_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  amount: { 
    type: DataTypes.DECIMAL(10, 2), 
    allowNull: false 
  },
  payment_method: { 
    type: DataTypes.ENUM('Card', 'Bank Transfer', 'USSD'), 
    allowNull: false 
  },
  payment_status: { 
    type: DataTypes.ENUM('pending', 'successful', 'failed'), 
    defaultValue: 'pending' 
  },
  payment_date: { 
    type: DataTypes.DATE, 
    defaultValue: DataTypes.NOW 
  }
}, { 
  tableName: 'payments' 
});

module.exports = Payment;

