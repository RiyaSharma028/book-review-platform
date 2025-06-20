import { Review } from "../models/review.model.js"

// GET /api/reviews?book=BOOK_ID
const getReviewsByBook = async (req, res) => {
  try {
    const { book } = req.query;

    if (!book) {
      return res.status(400).json({ message: "book ID is required in query" });
    }

    const reviews = await Review.find({ book });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export {getReviewsByBook};



const addReview = async (req, res) => {
  try {
    const { book, userName, rating, comment } = req.body;

    if (!book || !userName || !rating || !comment) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newReview = new Review({ book, userName, rating, comment });
    const saved = await newReview.save();

    res.status(201).json({ message: "Review added", review: saved });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export {addReview}