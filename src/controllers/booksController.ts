import { Request, Response } from "express";
import Book from "../models/booksModel";
import { MongoServerError } from "mongodb";

// @description show all books
// @routes api/v1/books
// @acess  public

export const getBooks = (_req: Request, res: Response) => {
  res.status(200).json({ success: true, msg: "show all books" });
};

// description show a single book
// routes api/v1/books
// @access public

export const getBook = (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(200).json({ success: true, msg: `show bootcamp ${id}` });
};

// @description create Bootcamp
// route api/v1/books
// @access public
export const createBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({
      success: true,
      data: book,
    });
  } catch (error) {
    if (error instanceof MongoServerError) {
      res.status(400).json({
        success: false,
        message: `Duplicate key error: ${JSON.stringify(error.keyValue)}`,
        details: error.errmsg,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Server Error ",
      });
    }
  }
};

// description update single book
// route api/v1/books
// @access public
export const updateBook = (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(200).json({ success: true, msg: "update bootcamp ${id}" });
};

// @description delete single book
// @route Delete api/v1/books
// @access public

export const deleteBook = (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(200).json({ success: true, msg: "delete bootcamp ${id}" });
};
