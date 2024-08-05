import { Router } from 'express';
import {
    getSubscribedChannels,
    getUserChannelSubscribers,
    toggleSubscription,
} from "../controllers/subscription.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

// Routes to get subscribed channels and toggle subscription
router.route("/channel/:channelId")
    .get(getSubscribedChannels) // Postman Testing Remaining
    .post(toggleSubscription);

// Route to get subscribers of a user channel
router.route("/user/:subscriberId").get(getUserChannelSubscribers); // Postman Testing Remaining

export default router;