'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const species = require("../data/species.json")
    species.forEach((e) => {
      delete e.id
      e.updatedAt = e.createdAt = new Date()
    })
    await queryInterface.bulkInsert("Species", species, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Species", null, {})
  }
};
