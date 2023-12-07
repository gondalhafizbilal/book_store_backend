"use strict";
import { Model } from "sequelize";
interface CustomerAttributes {
  name: string;
  password: string;
  email: string;
  points: number;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Customer
    extends Model<CustomerAttributes>
    implements CustomerAttributes
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    name!: string;
    password!: string;
    email!: string;
    points!: number;
    static associate(models: any) {
      // define association here
      Customer.hasOne(models.Order, {
        foreignKey: "customer_id",
        as: "customers",
      });
    }
  }
  Customer.init(
    {
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      points: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: "customers",
      modelName: "Customer",
    }
  );
  return Customer;
};
