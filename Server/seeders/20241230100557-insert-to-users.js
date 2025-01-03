'use strict';

const { hash } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = require("../data/users.json")
    users.forEach((e) => {
      delete e.id
      e.password = hash(e.password)
      e.updatedAt = e.createdAt = new Date()
    })
    await queryInterface.bulkInsert("Users", users, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {})
  }
};
