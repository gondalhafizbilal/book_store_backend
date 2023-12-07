import db from "../entity";
import { Order } from "../types/orderTypes";
const { QueryTypes } = require("sequelize");

const { Order, Customer, Book, sequelize } = db;

export const create = async (body: Order) => {
  const order = await Order.create(body);
  const customer = await Customer.findOne({
    where: { id: body.customer_id },
  });
  const book = await Book.findOne({
    where: { id: body.book_id },
  });
  console.log(customer.points);
  console.log("Books", book);
  const totalPoints = parseInt(customer.points) - parseInt(book.points);
  console.log(totalPoints);
  customer.points = totalPoints;

  const up = await customer.save();
  return order;
};

export const findOrder = async (orderId: number) => {
  const order = await Order.findOne({
    where: { id: orderId },
  });
  return order;
};

export const update = async (orderId: number, status: string) => {
  const order = await findOrder(orderId);
  if (status) order.status = status;
  const customer = await Customer.findOne({
    where: { id: order.customer_id },
  });
  const book = await Book.findOne({
    where: { id: order.book_id },
  });
  if (status === "cancelled") {
    customer.points = customer.points + book.points;
  } else {
    customer.points = customer.points - book.points;
  }
  await customer.save();
  return await order.save();
};

export const getAllOrders = async () => {
  const orders = await Order.findAll();
  return orders;
};

export const getOrdersByCustomerId = async (customerId: any) => {
  const orders = await sequelize.query(
    `SELECT orders.id,orders.book_id,orders.customer_id,orders.status,books.title,books.writer,books.cover_image,books.tag,books.points FROM orders INNER JOIN books ON orders.book_id = books.id where orders.customer_id=${parseInt(
      customerId
    )};`,
    {
      type: QueryTypes.SELECT,
    }
  );
  return orders;
};
