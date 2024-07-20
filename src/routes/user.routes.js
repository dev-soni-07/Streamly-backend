import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router();

// Route for user registration
// URL: http://localhost:8000/api/v1/users/register
router.route("/register").post(registerUser);

// Route for user login
// URL: http://localhost:8000/api/v1/users/login
// router.route("/login").post(login);

export default router;