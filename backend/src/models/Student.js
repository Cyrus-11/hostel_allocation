const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Student = sequelize.define('Student', {
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  matric_no: { 
    type: DataTypes.STRING, 
    unique: true, 
    allowNull: false, 
    validate: {
      notEmpty: true, 
      len: [6, 20] // Ensures matric number is between 6 and 20 characters
    }
  },
  surname: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    validate: { 
      notEmpty: true 
    } 
  },
  firstname: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    validate: { 
      notEmpty: true 
    } 
  },
  othername: { 
    type: DataTypes.STRING, 
    allowNull: true 
  },
  gender: { 
    type: DataTypes.ENUM('Male', 'Female'), 
    allowNull: false 
  },
  college: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    validate: { 
      notEmpty: true 
    } 
  },
  department: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    validate: { 
      notEmpty: true 
    } 
  },
  level: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    validate: { 
      notEmpty: true 
    } 
  },
  session: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    validate: { 
      notEmpty: true 
    } 
  },
  phone: { 
    type: DataTypes.STRING, 
    unique: true, 
    allowNull: false, 
    validate: { 
      is: /^[0-9]{10,15}$/, // Ensures phone number is 10-15 digits
      notEmpty: true 
    } 
  },
  email: { 
    type: DataTypes.STRING, 
    unique: true, 
    allowNull: false, 
    validate: { 
      isEmail: true, 
      notEmpty: true 
    } 
  },
  password: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    validate: { 
      notEmpty: true, 
      len: [8, 100] // Ensures password has a minimum of 8 characters
    } 
  },
  status: { 
    type: DataTypes.ENUM('active', 'inactive'), 
    defaultValue: 'inactive' 
  },
  verification_code: {
    type: DataTypes.STRING,
    allowNull: true
  },
}, { 
  tableName: 'students',
  timestamps: true, // Adds createdAt and updatedAt columns
  hooks: {
    beforeCreate: async (student) => {
      // Add password hashing logic here if needed (e.g., using bcrypt)
    }
  }
});

module.exports = Student;
