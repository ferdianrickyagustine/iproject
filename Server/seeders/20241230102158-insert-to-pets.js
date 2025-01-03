'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const pets = require("../data/pets.json")
    pets.forEach((e) => {
      delete e.id
      e.updatedAt = e.createdAt = new Date()
    })
    await queryInterface.bulkInsert("Pets", pets, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Pets", null, {})
  }
};
