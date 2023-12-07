"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("customers", [
      {
        name: "Kirti Singh",
        email: "kirti_singh@gmail.com",
        points: 100,
        password: "kirti@110",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Penny White",
        email: "penny_white@gmail.com",
        points: 100,
        password: "penny@110",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "John Doa",
        email: "john_doa@gmail.com",
        points: 100,
        password: "john@110",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("customers", null, {});
  },
};
