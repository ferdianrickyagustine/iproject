'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const shelters = require("../data/shelters.json")
    shelters.forEach((e) => {
      delete e.id
      e.updatedAt = e.createdAt = new Date()
    })
    await queryInterface.bulkInsert("Shelters", shelters, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Shelters", null, {})
  }
};
