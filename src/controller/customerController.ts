import { Response, Request, NextFunction } from "express";
import { create, login } from "../repository/customerModel";

export const createCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    body.points = 100;
    const customer = await create(body);

    return res.status(200).json({
      message: "Customer created successfully",
      customer: customer.id,
    });
  } catch (err) {
    next(err);
  }
};

export const loginCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const data = await login(email, password);
    if (typeof data === "string") {
      return res.status(401).json({
        message: data,
      });
    }
    return res.status(200).json({
      data: data,
    });
  } catch (err) {
    next(err);
  }
};
