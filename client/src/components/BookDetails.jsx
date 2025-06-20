import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Home/Navbar.jsx";
import Footer from "../components/Home/Footer.jsx";

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchBook();
    fetchReviews();
  }, [id]);

  const fetchBook = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/v1/book/books/${id}`);
      setBook(res.data);
    } catch (error) {
      console.error("Error fetching book:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/v1/review/reviews?book=${id}`);
      setReviews(res.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3000/api/v1/review/reviews`, {
        book: id,
        userName,
        rating,
        comment,
      });
      setUserName("");
      setRating(5);
      setComment("");
      fetchReviews(); // refresh reviews after submit
    } catch (error) {
      console.error("Failed to submit review:", error);
      alert("Error submitting review");
    }
  };

  if (!book) return <div className="p-6">Loading book...</div>;

  return (
    <div className="min-h-screen flex flex-col"  style={{backgroundColor : "#e6f3f4"}}>
      <Navbar />
      <div className="p-6 flex-1 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          <img src={book.coverImage} alt={book.title}
            className="w-full md:w-64 h-auto object-cover rounded shadow" />
          <div>
            <h1 className="text-3xl font-bold mb-2" style={{color : "#145E7C" }}>{book.title}</h1>
            <p className="text-gray-700 mb-1">by <strong>{book.author}</strong></p>
            <p className="text-sm text-gray-600 mb-4" style={{color : "#145E7C" }}>Genre: {book.genre}</p>
            <p className="text-gray-800">{book.description}</p>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4" style={{color : "#145E7C" }}> Reviews</h2>
          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet.</p>
          ) : (
            reviews.map((review) => (
              <div key={review._id} className="border-t pt-4 mb-4">
                <p className="font-semibold">{review.userName || "Anonymous"}</p>
                <p className="text-yellow-600">Rating: {review.rating} ⭐</p>
                <p>{review.comment}</p>
              </div>
            ))
          )}
        </div>

        {/* Review Form */}
        <form onSubmit={handleSubmitReview} className="border-t pt-6 mt-6">
          <h3 className="text-xl font-semibold mb-2" style={{color : "#145E7C" }}>Add Your Review</h3>
          <input
            type="text"
            placeholder="Your Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            className="w-full mb-2 p-2 border rounded"
          />
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            required
            className="w-full mb-2 p-2 border rounded"
          >
            {[1,2,3,4,5].map(val => (
              <option key={val} value={val}>{val} Star{val>1?'':''}</option>
            ))}
          </select>
          <textarea
            placeholder="Write your comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            className="w-full mb-2 p-2 border rounded"
          />
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white " style={{backgroundColor : "#145E7C"}}>
            Submit Review
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default BookDetails;