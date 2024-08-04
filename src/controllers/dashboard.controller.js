import mongoose from "mongoose";
import { Video } from "../models/video.model.js";
import { Subscription } from "../models/subscription.model.js";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getChannelStats = asyncHandler(async (req, res) => {
    const { userId } = req.user;

    const totalVideos = await Video.countDocuments({ owner: userId });
    const totalViews = await Video.aggregate([
        { $match: { owner: mongoose.Types.ObjectId(userId) } },
        { $group: { _id: null, totalViews: { $sum: "$views" } } }
    ]);
    const totalSubscribers = await Subscription.countDocuments({ channel: userId });
    const totalLikes = await Like.countDocuments({ video: { $in: await Video.find({ owner: userId }).select("_id") } });

    return res.status(200).json(
        new ApiResponse(200, {
            totalVideos,
            totalViews: totalViews[0]?.totalViews || 0,
            totalSubscribers,
            totalLikes
        }, "Channel stats fetched successfully")
    );
});

const getChannelVideos = asyncHandler(async (req, res) => {
    const { userId } = req.user;
    const { page = 1, limit = 10 } = req.query;

    const videos = await Video.find({ owner: userId })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .sort({ createdAt: -1 });

    const totalVideos = await Video.countDocuments({ owner: userId });

    return res.status(200).json(
        new ApiResponse(200, { videos, totalVideos }, "Videos fetched successfully")
    );
});

export {
    getChannelStats,
    getChannelVideos
};