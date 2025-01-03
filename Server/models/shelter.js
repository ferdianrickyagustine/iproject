"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Shelter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Shelter.hasMany(models.Pet, { foreignKey: "shelterId" });
    }
  }
  Shelter.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {
          notNull: {
            msg: "Name is required",
          },
          notEmpty: {
            msg: "Name cannot be empty",
          },
        },
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {
          notNull: {
            msg: "Location is required",
          },
          notEmpty: {
            msg: "Location cannot be empty",
          },
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false, // Ensure the phone is not null
        validate: {
          notNull: {
            msg: "Phone number is required",
          },
          notEmpty: {
            msg: "Phone number cannot be empty",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Email must be unique',
        },
        validate: {
          notNull: {
            msg: "Email is required",
          },
          notEmpty: {
            msg: "Email cannot be empty",
          },
          isEmail: {
            msg: "Email must be a valid email address",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Shelter",
    }
  );

  return Shelter;
};
