import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// Route for user registration
// URL: http://localhost:8000/api/v1/users/register
router.route("/register").post(

    // File Handling: Uploading the Files/Images on Cloudinary and using multer as a middleware
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
);

// Route for user login
// URL: http://localhost:8000/api/v1/users/login
// router.route("/login").post(login);

export default router;