import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Book from "../models/booksModel";
import { BookSchema, BookType } from "../validators/bookValidator";
import { asyncHandler } from "../helpers/asyncHandler";
import ErrorResponse from "../helpers/errorResponse";

// @description show all books
// @routes api/v1/books
// @acess  public

export const getBooks = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const books = await Book.find({});
    return res.status(200).json({
      success: true,
      msg: "show all books",
      data: books,
    });
  }
);

// description show a single book
// routes api/v1/books
// @access public

export const getBook = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    // check if the Id is valid before querying  the database
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(
        new ErrorResponse(`Resource not found with id of ${id}`, 404)
      );
    }

    const book = await Book.findById(id);

    if (!book) {
      return next(new ErrorResponse(`Book with id ${id} not found`, 404));
    }

    res.status(200).json({ success: true, msg: `show book ${id}`, data: book });
  }
);

// @description create Bootcamp
// route api/v1/books
// @access public
export const createBook = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    // validate request body using zod
    const validationResult = BookSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        error: validationResult.error.format(),
      });
    }
    // if validation passes,proceed with creating the book the book
    const book = await Book.create(validationResult.data);
    return res.status(201).json({
      success: true,
      msg: "book created ",
      data: book,
    });
  }
);

// description update single book
// route api/v1/books
// @access public
export const updateBook = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    // check if the Id is a valid  before querying the db
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(
        new ErrorResponse(`Resource not found with id of ${id}`, 404)
      );
    }
    const updateBook = await Book.findByIdAndUpdate(id, req.body, {
      // return the updated book
      new: true,
      // Ensure update folow  schemaValidation
      runValidators: true,
    });
    if (!updateBook) {
      return next(new ErrorResponse(`Book not found with ${id}`, 404));
    }
    res.status(200).json({
      success: true,
      msg: `Book ${id} updated successfully`,
      data: updateBook,
    });
  }
);

// @description delete single book
// @route Delete api/v1/books
// @access public

export const deleteBook = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    // check if the id exist before querying the data
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorResponse("Resource not available", 400));
    }

    // Attempt to find and delete  the book
    const deleteBook = await Book.findByIdAndDelete(id);

    // Handle case where book is not found
    if (!deleteBook) {
      return next(new ErrorResponse(`book ${id} not found`, 404));
    }

    res
      .status(200)
      .json({ success: true, msg: `delete book ${id}`, data: deleteBook });
  }
);
