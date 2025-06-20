import { Router } from "express";
import {getUserById, updateUserProfile, createUser,} from "../Controllers/user.controller.js";

const router = Router();

router.get("/users/:id", getUserById);
router.put("/users/:id", updateUserProfile);
router.post("/users", createUser); // ✅ POST /api/users

export default router;
