import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar"; // Navbar Component 
import Footer from "./Footer"; // Footbar cOMPONENT
import BookCard from "./BookCard"; //bOOKcARD cOMPONENT

function HomePage() {
  const [featuredBooks, setFeaturedBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/V1/book/books")
      .then(res => {
        const featured = res.data.books.slice(0, 4); // pick first 4 books
        setFeaturedBooks(featured);
      })
      .catch(err => console.error("Error fetching books:", err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <div className="text-center" style={{backgroundColor : "#e6f3f4"}}>
        <h2 className="text-3xl font-bold mb-2" style={{color : "#145E7C" }}>Welcome to BookReview 📖</h2>
        <p className="text-lg text-gray-700">Discover, read and review your favorite books.</p>
      </div>

      {/* Featured Section */}
      <div className="p-6 flex-1" style={{backgroundColor : "#e6f3f4"}}>
        <h3 className="text-2xl font-semibold mb-4" style={{color : "#145E7C" }}> Featured Books</h3>
        {featuredBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBooks.map(book => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No featured books found.</p>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;
