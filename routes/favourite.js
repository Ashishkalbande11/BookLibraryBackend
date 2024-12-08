import { Router } from "express"
import User from "../models/user.js"
import authenticateToken from "../controller/authController.js";
import { addBookToFav, removeBookFromFav,  getAllFavBook } from "../controller/favController.js";

const router = Router();

router.put("/add-book-to-favourite", authenticateToken, addBookToFav);

router.put("/remove-book", authenticateToken, removeBookFromFav);

router.get("/get-favourite-books", authenticateToken, getAllFavBook);

export default router;