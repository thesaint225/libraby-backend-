import { Router } from "express";
import {
  getBooks,
  getBook,
  updateBook,
  deleteBook,
} from "../controllers/booksController";

const router: Router = Router();

// Fetch all books
router.route("/").get(getBooks);
router.route("/:id").get(getBook).put(updateBook).delete(deleteBook);
export default router;
