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
router.route("/c/:channelId")
    .get(getSubscribedChannels)
    .post(toggleSubscription);

// Route to get subscribers of a user channel
router.route("/u/:subscriberId").get(getUserChannelSubscribers);

export default router;