import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{backgroundColor : "#e6f3f4"}} className=" p-4 flex justify-between items-center">
      <h1 style={{color : "#145E7C"}}className="text-lg">BookReview</h1>
      <div className="space-x-3">
        <Link to="/" style={{color : "#145E7C" }}>Home</Link>
        <Link to="/books" className="hover:underline"  style={{color : "#145E7C" }}>Books</Link>
        <Link to="/profile/123" className="hover:underline"  style={{color : "#145E7C" }}>Profile</Link>
      </div>
    </nav>
  );
}

export default Navbar;
