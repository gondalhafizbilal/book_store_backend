import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import {
  ValidateIdInt,
  ValidateCreateCustomer,
  ValidateLogin,
  ValidateCreateOrder,
  ValidateUpdateOrder,
} from "./middleware/dataValidation";
import { getBooks, getBooksById } from "./controller/bookController";
import { createCustomer, loginCustomer } from "./controller/customerController";
import {
  getOrders,
  createOrder,
  updateOrder,
} from "./controller/orderController";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());

app.get("/api/books/:id", ValidateIdInt, getBooksById);
app.get("/api/books", getBooks);

app.post("/api/customers", ValidateCreateCustomer, createCustomer);
app.post("/api/login", ValidateLogin, loginCustomer);

app.get("/api/orders", getOrders);
app.post("/api/orders", ValidateCreateOrder, createOrder);
app.put("/api/orders/:id", ValidateIdInt, ValidateUpdateOrder, updateOrder);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
