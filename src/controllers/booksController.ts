import { Request, Response } from "express";

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
