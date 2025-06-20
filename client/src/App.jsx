import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/Home/HomePage.jsx';
import BookList from './components/BookList.jsx';
import BookDetails from './components/BookDetails.jsx';
import UserProfile from './components/UserProfile.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/profile/:id" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

