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
    allowNull: false,
    validate: {
      len: [3, 100]
    }
  },
  email: { 
    type: DataTypes.STRING, 
    unique: true, 
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  phone: { 
    type: DataTypes.STRING, 
    unique: true, 
    allowNull: false,
    validate: {
      len: [10, 15]
    }
  },
  role: { 
    type: DataTypes.ENUM('super_admin', 'admin', 'support'), 
    defaultValue: 'admin',
    allowNull: false
  },
  password: { 
    type: DataTypes.STRING, 
    allowNull: false
  },
  status: { 
    type: DataTypes.ENUM('active', 'inactive'), 
    defaultValue: 'active',
    allowNull: false
  }
}, { 
  tableName: 'admins',
  timestamps: true, // Add timestamps
  paranoid: true, // Soft deletes
  deletedAt: 'deleted_at' // Customize deletedAt column name
});

// Password hashing hook
Admin.beforeCreate(async (admin) => {
  const bcrypt = require('bcrypt');
  const salt = await bcrypt.genSalt(10);
  admin.password = await bcrypt.hash(admin.password, salt);
});

module.exports = Admin;
