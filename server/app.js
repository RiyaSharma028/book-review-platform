import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json()); // 🔁 Required for POST/JSON, good to have

import booksRoute from "./Routes/books.route.js"; // ✅ Correct import name and path
import reviewroute from "./Routes/review.route.js"
import useRouter from "./Routes/user.route.js"

// ✅ Corrected use of route middleware (missing `/` and typo in name)
app.use("/api/v1/book", booksRoute);
app.use("/api/v1/review" , reviewroute);
app.use("/api/v1/user" , useRouter );

export default app;