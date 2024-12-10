const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const RoomAllocation = sequelize.define('RoomAllocation', {
  allocation_id: { 
    type: DataTypes.STRING, 
    unique: true 
  },
  student_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  hostel_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  room_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  allocation_status: { 
    type: DataTypes.ENUM('pending', 'confirmed', 'rejected'), 
    defaultValue: 'pending' 
  },
  allocation_date: { 
    type: DataTypes.DATE, 
    defaultValue: DataTypes.NOW 
  }
}, { 
  tableName: 'room_allocations' 
});

module.exports = RoomAllocation;
