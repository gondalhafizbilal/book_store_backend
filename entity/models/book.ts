"use strict";
import { Model } from "sequelize";
interface BookAttributes {
  title: string;
  writer: string;
  cover_image: string;
  points: number;
  tag: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Book extends Model<BookAttributes> implements BookAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    title!: string;
    writer!: string;
    cover_image!: string;
    points!: number;
    tag!: string;
    static associate(models: any) {
      // define association here
      Book.hasOne(models.Order, {
        foreignKey: "customer_id",
        as: "books",
      });
    }
  }
  Book.init(
    {
      title: DataTypes.STRING,
      writer: DataTypes.STRING,
      cover_image: DataTypes.STRING,
      points: DataTypes.INTEGER,
      tag: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "books",
      modelName: "Book",
    }
  );
  return Book;
};
