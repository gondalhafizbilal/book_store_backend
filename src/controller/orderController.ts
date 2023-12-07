import { Response, Request, NextFunction } from "express";
import {
  create,
  findOrder,
  update,
  getAllOrders,
  getOrdersByCustomerId,
} from "../repository/orderModel";
import { getCustomer } from "../repository/customerModel";
import { getBook } from "../repository/bookModel";

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    console.log("Body", body);
    const customer = await getCustomer(body.customer_id);
    if (!customer) {
      return res
        .status(404)
        .json({ message: "Customer is not present in the table." });
    }
    const book = await getBook(body.book_id);
    if (!book) {
      return res
        .status(404)
        .json({ message: "Book is not present in the table." });
    }
    if (customer.points < book.points) {
      return res.status(404).json({
        message:
          "Not enough funds available for the customer to purchase book.",
      });
    }

    const order = await create(body);

    return res.status(200).json({
      message: "Order created successfully",
      order: order.id,
    });
  } catch (err) {
    next(err);
  }
};

export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      params: { id },
      body: { status },
    } = req;

    const orderId = parseInt(id);
    const order = await findOrder(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ message: "Requested Order is not present in the table." });
    }
    if (order.status !== status) {
      await update(orderId, status);

      return res.status(200).json({
        message: "Order updated successfully",
      });
    } else {
      return res.status(200).json({
        message: "Order status same nothing to update",
      });
    }
  } catch (err) {
    next(err);
  }
};

export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { customer_id } = req.query;
    console.log(req.query);
    let order;
    if (customer_id) {
      order = await getOrdersByCustomerId(customer_id);
    } else {
      order = await getAllOrders();
    }

    return res.status(200).json({
      data: order,
    });
  } catch (err) {
    next(err);
  }
};
