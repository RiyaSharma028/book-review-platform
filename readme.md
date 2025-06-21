# Book Review Platform

This is a full-stack Book Review Platform built using **React.js**, **Node.js**, **Express**, and **MongoDB**. Users can browse books, read detailed descriptions, submit reviews, and view other users' profiles.

---

##  Features

### Frontend (React + Vite)
- Home page with featured books
- Book listing page with **search** and **genre filter**
- Individual book page with:
  - Description
  - Cover image
  - Reviews
  - Add Review form
- User profile page with editable name and email

###  Backend (Node.js + Express + MongoDB)
- RESTful API endpoints:
  - `GET /books` – Retrieve all books with pagination
  - `GET /books/:id` – Retrieve a specific book
  - `POST /books` – Add a new book (admin only)
  - `GET /reviews?book=bookId` – Retrieve reviews for a book
  - `POST /reviews` – Submit a review
  - `GET /users/:id` – Get user profile
  - `PUT /users/:id` – Update user profile
- MongoDB Atlas used for database
- Mongoose models for Book, Review, and User

---

##  Technologies Used

- **Frontend**: React, React Router, Axios, Tailwind CSS
- **Backend**: Express, Node.js, Mongoose
- **Database**: MongoDB Atlas
- **Image Hosting**: OpenLibrary cover images (via public API)

---

##  How to Run Locally

###  Backend Setup
```bash
cd server
npm install
npm start

Frontend Setup
cd client
npm install
npm run dev

![Homepage Screenshot](https://github.com/RiyaSharma028/book-review-platform/blob/master/client/public/Homepage.png)

