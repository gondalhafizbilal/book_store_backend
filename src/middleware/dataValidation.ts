import { body, param, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

// create Book
export const ValidateCreateCustomer = [
  body("name")
    .isString()
    .withMessage("The name is must and should be a string."),
  body("email")
    .isString()
    .isEmail()
    .withMessage(
      "The email is must and should be a string with proper email format."
    ),
  body("password")
    .isString()
    .withMessage("The password is must and should be a decimal."),

  function (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Invalid Input Data", error: errors.array() });
    }
    next();
  },
];

export const ValidateLogin = [
  body("email")
    .isString()
    .isEmail()
    .withMessage(
      "The email is must and should be a string with proper email format."
    ),
  body("password")
    .isString()
    .withMessage("The password is must and should be a string."),

  function (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Invalid Input Data", error: errors.array() });
    }
    next();
  },
];

export const ValidateCreateOrder = [
  body("customer_id")
    .isInt()
    .withMessage("The customer_id is must and should be an integer."),
  body("book_id")
    .isInt()
    .withMessage("The book_id is must and should be an integer."),
  body("status")
    .isString()
    .withMessage("The status is must and should be a string."),

  function (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Invalid Input Data", error: errors.array() });
    }
    next();
  },
];

export const ValidateUpdateOrder = [
  body("status")
    .isString()
    .withMessage("The status is must and should be a string."),

  function (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Invalid Input Data", error: errors.array() });
    }
    next();
  },
];

export const ValidateIdInt = [
  param("id").isInt().withMessage("The id should be a number."),

  function (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Invalid Input Data", error: errors.array() });
    }
    next();
  },
];
