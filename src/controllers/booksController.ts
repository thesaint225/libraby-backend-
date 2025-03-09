import { Request, Response, NextFunction } from "express";
import Book from "../models/booksModel";
import { asyncHandler } from "../helpers/asyncHandler";

// @description show all books
// @routes api/v1/books
// @acess  public

export const getBooks = asyncHandler(async (req: Request, res: Response) => {
  const books = await Book.find({});
  return res.status(200).json({
    success: true,
    msg: "show all books",
    data: books,
  });
});

// description show a single book
// routes api/v1/books
// @access public

export const getBook = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  if (!book) {
    return res.status(404).json({
      success: false,
      msg: "book not found",
    });
  }
  res.status(200).json({ success: true, msg: `show book ${id}`, data: book });
});

// @description create Bootcamp
// route api/v1/books
// @access public
export const createBook = asyncHandler(async (req: Request, res: Response) => {
  const book = await Book.create(req.body);
  return res.status(201).json({
    success: true,
    msg: "book created ",
    data: book,
  });
});

// description update single book
// route api/v1/books
// @access public
export const updateBook = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateBook = await Book.findByIdAndUpdate(id, req.body, {
    // return the updated book
    new: true,
    // Ensure update folow  schemaValidation
    runValidators: true,
  });
  if (!updateBook) {
    return res.status(404).json({
      success: false,
      msg: "book not found ",
    });
  }
  res
    .status(200)
    .json({ success: true, msg: `update book ${id}`, data: updateBook });
});

// @description delete single book
// @route Delete api/v1/books
// @access public

export const deleteBook = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleteBook = await Book.findByIdAndDelete(id);
  if (!deleteBook) {
    res.status(404).json({
      success: false,
      msg: "book not found",
    });
    return;
  }

  res
    .status(200)
    .json({ success: true, msg: `delete book ${id}`, data: deleteBook });
});
