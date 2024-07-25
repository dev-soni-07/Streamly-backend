import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
    {
        subscriber: {
            type: mongoose.Schema.Types.ObjectId, // one who is subscribing the channel
            ref: "User",
        },
        channel: {
            type: mongoose.Schema.Types.ObjectId, // one who ie being subscribed
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
)

export const Subscription = mongoose.model("Subscription", subscriptionSchema)