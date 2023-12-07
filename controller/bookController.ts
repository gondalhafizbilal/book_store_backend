import { Response, Request, NextFunction } from "express";
import { getAllBooks, getBook } from "../repository/bookModel";

export const getBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, page_size } = req.query;
    const books = await getAllBooks();
    let data = books;
    if (page && page_size) {
      data = books.slice((+page - 1) * +page_size, +page * +page_size);
    }
    return res.status(200).json({
      data: data,
    });
  } catch (err) {
    next(err);
  }
};

export const getBooksById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    const book = await getBook(id);

    if (!book) {
      return res
        .status(404)
        .json({ message: "Requested Book is not present in the table." });
    }
    return res.status(200).json({
      data: book,
    });
  } catch (err) {
    next(err);
  }
};
