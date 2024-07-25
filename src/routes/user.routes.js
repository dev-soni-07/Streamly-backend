import { Router } from "express";
import {
    loginUser,
    logoutUser,
    registerUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
    getUserChannelProfile,
    getWatchHistory
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

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

// Route for user login
router.route("/login").post(loginUser);

// Secured Routes
// Route for user logout
router.route("/logout").post(verifyJWT, logoutUser)

// Route for refreshing the access token
router.route("/refresh-access-token").post(refreshAccessToken)

// Route for changing the user's current password
router.route("/change-current-password").post(verifyJWT, changeCurrentPassword)

// Route for getting current user details
router.route("/current-user").get(verifyJWT, getCurrentUser)

// Route for updating the user's account details
router.route("/update-account-details").patch(verifyJWT, updateAccountDetails)

// Route for updating the user's avatar
router.route("/update-avatar").patch(
    verifyJWT,
    upload.single("avatar"),
    updateUserAvatar
)

// Route for updating the user's cover image
router.route("/update-cover-image").patch(
    verifyJWT,
    upload.single("coverImage"),
    updateUserCoverImage
)

// Route for getting the user's channel profile
router.route("/channel/:username").get(verifyJWT, getUserChannelProfile)

// Route for getting the user's watch history
router.route("/watch-history").get(verifyJWT, getWatchHistory)

export default router;