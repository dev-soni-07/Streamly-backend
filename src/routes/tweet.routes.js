import { Router } from 'express';
import {
    createTweet,
    deleteTweet,
    getUserTweets,
    updateTweet,
} from "../controllers/tweet.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

// Route to create a tweet
router.route("/").post(createTweet);

// Route to get user tweets
router.route("/user/:userId").get(getUserTweets);

// Routes to update and delete a tweet
router.route("/:tweetId")
    .patch(updateTweet)
    .delete(deleteTweet);

export default router;