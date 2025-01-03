'use strict';
const { Model, DataTypes } = require('sequelize');
const { hash } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Pet, { foreignKey: "userId" })
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,  // Ensure the username is not null
        validate: {
          notNull: {
            msg: 'Username is required',
          },
          notEmpty: {
            msg: 'Username cannot be empty',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,  // Ensure the email is not null
        unique: {
          msg: 'Email must be unique',
        },
        validate: {
          notNull: {
            msg: 'Email is required',
          },
          notEmpty: {
            msg: 'Email cannot be empty',
          },
          isEmail: {
            msg: 'Email must be a valid email address',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,  
        validate: {
          notNull: {
            msg: 'Password is required',
          },
          notEmpty: {
            msg: 'Password cannot be empty',
          },
          len: {
            args: [4],  
            msg: 'Password must be at least 4 characters long',
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      shelterId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'User', 
        validate: {
          notNull: {
            msg: 'Role is required',
          },
          notEmpty: {
            msg: 'Role cannot be empty',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  User.beforeCreate((user) => {
    user.password = hash(user.password)
  })
  return User;
};
