import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json()); 

import booksRoute from "./Routes/books.route.js"; 
import reviewroute from "./Routes/review.route.js"
import useRouter from "./Routes/user.route.js"

app.use("/api/v1/book", booksRoute);
app.use("/api/v1/review" , reviewroute);
app.use("/api/v1/user" , useRouter );

export default app;