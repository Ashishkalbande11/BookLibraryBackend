import { Router } from "express";
import authenticateToken from "../controller/authController.js"
import { addBook, updateBook, deleteBook, getAllBooks, getBookById, getRecentBook } from "../controller/bookController.js";

const router = Router();

router.post("/add-book", authenticateToken, addBook);

router.put("/update-book", authenticateToken, updateBook);

router.delete("/delete-book", authenticateToken, deleteBook)

router.get("/get-all", getAllBooks);

router.get("/get-recent-book", getRecentBook);

router.get("/get-book-by-id/:id", getBookById);

export default router;