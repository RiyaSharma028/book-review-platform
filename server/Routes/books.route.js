import {Router} from "express";
import {getAllBooks,  getBookById , addBook} from "../Controllers/books.controoler.js"

const router = Router();

router.route("/books").get(getAllBooks).post(addBook);
router.route("/books/:id").get(getBookById);


export default router;