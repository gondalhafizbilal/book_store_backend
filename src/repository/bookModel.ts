import db from "../entity";

const { Book } = db;

export const getAllBooks = async () => {
  const books = await Book.findAll();
  return books;
};

export const getBook = async (id: number) => {
  const book = await Book.findOne({
    where: { id },
  });
  return book;
};
