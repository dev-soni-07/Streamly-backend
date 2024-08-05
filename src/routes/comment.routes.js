import { Router } from 'express';
import {
    addComment,
    deleteComment,
    getVideoComments,
    updateComment,
} from "../controllers/comment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

// Route to get comments for a video and add a new comment
router.route("/:videoId")
    .get(getVideoComments)
    .post(addComment);

// Route to delete and update a comment
router.route("/comment/:commentId")
    .delete(deleteComment)
    .patch(updateComment);

export default router;