"use strict";
import { Model } from "sequelize";
interface OrderAttributes {
  book_id: number;
  customer_id: number;
  status: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Order extends Model<OrderAttributes> implements OrderAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    book_id!: number;
    customer_id!: number;
    status!: string;
    static associate(models: any) {
      // define association here

      Order.belongsTo(models.Book, {
        foreignKey: "book_id",
        as: "books",
      });
      Order.belongsTo(models.Customer, {
        foreignKey: "customer_id",
        as: "customers",
      });
    }
  }
  Order.init(
    {
      book_id: DataTypes.INTEGER,
      customer_id: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "orders",
      modelName: "Order",
    }
  );
  return Order;
};
