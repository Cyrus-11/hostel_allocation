const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Admin = sequelize.define('Admin', {
  admin_id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  fullname: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  email: { 
    type: DataTypes.STRING, 
    unique: true, 
    allowNull: false 
  },
  phone: { 
    type: DataTypes.STRING, 
    unique: true, 
    allowNull: false 
  },
  role: { 
    type: DataTypes.ENUM('super_admin', 'admin', 'support'), 
    defaultValue: 'admin' 
  },
  password: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  status: { 
    type: DataTypes.ENUM('active', 'inactive'), 
    defaultValue: 'active' 
  }
}, { 
  tableName: 'admins' 
});

module.exports = Admin;
