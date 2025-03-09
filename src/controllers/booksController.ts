import { Request, Response, NextFunction } from "express";
import Book from "../models/booksModel";
import { MongoServerError } from "mongodb";

// @description show all books
// @routes api/v1/books
// @acess  public

export const getBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const books = await Book.find({});
    res.status(200).json({
      success: true,
      msg: "show all books",
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

// description show a single book
// routes api/v1/books
// @access public

export const getBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      res.status(404).json({
        success: false,
        msg: "book not found",
      });
    }
    res.status(200).json({ success: true, msg: `show book ${id}` });
  } catch (error) {
    next(error);
  }
};

// @description create Bootcamp
// route api/v1/books
// @access public
export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({
      success: true,
      msg: "book created ",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

// description update single book
// route api/v1/books
// @access public
export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updateBook = await Book.findByIdAndUpdate(id, req.body, {
      // return the updated book
      new: true,
      // Ensure update folow  schemaValidation
      runValidators: true,
    });
    if (!updateBook) {
      res.status(404).json({
        success: false,
        msg: "book not found ",
      });
    }
    res
      .status(200)
      .json({ success: true, msg: `update book ${id}`, data: updateBook });
  } catch (error) {
    next(error);
  }
};

// @description delete single book
// @route Delete api/v1/books
// @access public

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deleteBook = await Book.findByIdAndDelete(id);
    if (!deleteBook) {
      res.status(404).json({
        success: false,
        msg: "book not found",
      });
    }

    res
      .status(200)
      .json({ success: true, msg: `delete book ${id}`, data: deleteBook });
  } catch (error) {
    next(error);
  }
};
