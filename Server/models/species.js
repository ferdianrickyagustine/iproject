'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Species extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Species.hasMany(models.Pet, { foreignKey: "speciesId" })
    }
  }
  Species.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Species is required",
        },
        notEmpty: {
          msg: "Species cannot be empty",
        },
      },
    }
  }, {
    sequelize,
    modelName: 'Species',
  });
  return Species;
};