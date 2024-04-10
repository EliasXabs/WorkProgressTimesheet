const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); // Adjust the path as necessary

const user = sequelize.define('USER', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(255),
    unique: true
  },
  password: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  firstname: DataTypes.STRING(255),
  lastname: DataTypes.STRING(255),
  dateofbirth: DataTypes.DATEONLY,
  joined_in: DataTypes.DATE,
  email: DataTypes.STRING(255),
  contactnumber: DataTypes.STRING(20),
  role: DataTypes.STRING(255),
  availability: DataTypes.STRING(255)
}, {
  timestamps: false,
  tableName: 'USER',
  hooks: {
    beforeCreate: async (user) => {
      const salt = await bcrypt.genSalt(10);
      user.Password = await bcrypt.hash(user.Password, salt);
    },
    beforeUpdate: async (user) => {
      if (user.changed('Password')) {
        const salt = await bcrypt.genSalt(10);
        user.Password = await bcrypt.hash(user.Password, salt);
      }
    }
  }  
});

module.exports = user;
