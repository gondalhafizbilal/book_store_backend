import db from "../entity";
import { Customer } from "../types/customerTypes";

const { Customer } = db;

export const create = async (body: Customer) => {
  const customer = await Customer.create(body);
  return customer;
};

export const login = async (email: string, password: string) => {
  const customer = await Customer.findOne({
    where: { email: email },
  });
  if (customer.password === password) {
    return {
      id: customer.id,
      email: customer.email,
      name: customer.name,
      points: customer.points,
    };
  } else {
    return "Email and Password are not correct";
  }
};

export const getCustomer = async (id: number) => {
  const customer = await Customer.findOne({
    where: { id },
  });
  return customer;
};
