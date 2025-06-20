import { Link } from "react-router-dom";

function BookCard({ book }) {
  return (
    <div className="border rounded p-4 shadow hover:shadow-md transition" style={{backgroundColor : "white"}}>
      <img src={book.coverImage} alt={book.title} className="h-72 w-full object-cover mb-2 rounded" />
      <h3 className="font-semibold text-lg mb-1" style={{color : "#145E7C" }}>{book.title}</h3>
      <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
      <Link  to={`/books/${book._id}`} style={{color : "#145E7C" }} className="text-blue-600 underline">View Details</Link>
    </div>
  );
}

export default BookCard;
