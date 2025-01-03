"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pet.belongsTo(models.Species, { foreignKey: "speciesId" });
      Pet.belongsTo(models.Shelter, { foreignKey: "shelterId" })
      Pet.belongsTo(models.User, { foreignKey: "userId" })
    }
  }
  Pet.init(
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
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Age is required",
          },
          min: {
            args: [0],
            msg: "Age cannot be negative",
          },
        },
      },
      breed: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {
          notNull: {
            msg: "Breed is required",
          },
          notEmpty: {
            msg: "Breed cannot be empty",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false, 
        validate: {
          notNull: {
            msg: "Description is required",
          },
          notEmpty: {
            msg: "Description cannot be empty",
          },
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Image Url is required",
          },
          notEmpty: {
            msg: "Image Url cannot be empty",
          },
        },
      },
      speciesId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Species ID is required",
          },
        },
      },
      shelterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Shelter ID is required",
          },
        },
        status: {
          type: DataTypes.STRING,
          allowNull:false,
          defaultValue: "Available",
          validate: {
            isIn: [['Available', 'adopted']],
          },
        }
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Pet",
    }
  );
  return Pet;
};
