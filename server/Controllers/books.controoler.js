import {Book} from "../models/books.model.js"

const getAllBooks = async (req, res) => {
  try {
    // Extract page and limit from query, with defaults
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * limit;

    // Get total number of books
    const totalBooks = await Book.countDocuments();

    // Fetch paginated books
    const books = await Book.find().skip(skip).limit(limit);

    res.json({
      currentPage: page,
      totalPages: Math.ceil(totalBooks / limit),
      totalBooks,
      books,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export {getAllBooks};


const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export {getBookById};

// POST /books
const addBook = async (req, res) => {
  try {
    // 🛡️ Simulated admin check
    const isAdmin = true; // set to false to test rejection
    if (!isAdmin) {
      return res.status(403).json({ message: "Only admins can add books." });
    }

    const { title, author, genre, description, coverImage } = req.body;

    // Basic validation
    if (!title || !author || !genre || !description || !coverImage) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newBook = new Book({
      title,
      author,
      genre,
      description,
      coverImage,
    });

    const savedBook = await newBook.save();

    res.status(201).json({
      message: "Book added successfully.",
      book: savedBook,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

export {addBook};