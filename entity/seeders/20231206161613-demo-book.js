"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("books", [
      {
        title: "Hollow World",
        writer: "Don Lee",
        cover_image:
          "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
        points: 10,
        tag: "fiction",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Hello World",
        writer: "Dan Lee",
        cover_image:
          "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
        points: 10,
        tag: "science",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "How to torture you higher management",
        writer: "Dick Lee",
        cover_image:
          "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
        points: 10,
        tag: "essay",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("books", null, {});
  },
};
