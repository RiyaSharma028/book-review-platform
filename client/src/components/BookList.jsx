import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Home/Navbar.jsx";
import BookCard from "../components/Home/BookCard.jsx";

function BookList() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchBooks();
  }, [currentPage]);

  const fetchBooks = () => {
    axios
      .get(`http://localhost:3000/api/v1/book/books?page=${currentPage}`)
      .then((res) => {
        setBooks(res.data.books);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.error("Error fetching books:", err));
  };

  const filteredBooks = books.filter((book) => {
    const titleMatch =
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author?.toLowerCase().includes(query.toLowerCase());

    const genreMatch = genreFilter ? book.genre === genreFilter : true;

    return titleMatch && genreMatch;
  });

  const genres = [...new Set(books.map((b) => b.genre).filter(Boolean))];

  return (
    <div className="min-h-screen flex flex-col" style={{backgroundColor : "#e6f3f4"}}>
      <Navbar />

      <div className="p-6 flex-1">
        <h2 className="text-2xl font-bold mb-4"> All Books</h2>

        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="p-2 border rounded w-full md:w-1/2"
          />

          <select
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
            className="p-2 border rounded w-full md:w-1/4"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No books found.</p>
        )}

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            ⬅ Prev
          </button>

          <span className="px-4 py-2 font-semibold">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next ➡
          </button>
        </div>
      </div>

    </div>
  );
}


export default BookList;
