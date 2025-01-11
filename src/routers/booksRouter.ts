import { Router } from "express";
import {
  getBooks,
  getBook,
  updateBook,
  deleteBook,
  createBook,
} from "../controllers/booksController";

const router: Router = Router();

// Fetch all books
router.route("/").get(getBooks).post(createBook);
router.route("/:id").get(getBook).put(updateBook).delete(deleteBook);
export default router;
