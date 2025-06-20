import {Router} from "express";
import {getReviewsByBook , addReview} from "../Controllers/review.controller.js"

const router = Router();

router.route("/reviews").get(getReviewsByBook).post(addReview)



export default router;