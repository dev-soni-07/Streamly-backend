import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// app.use() - This is used to configure middlewares.
// app.use(cors())
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    optionsSuccessStatus: 200,
}));

// Security practices
app.use(express.json({
    limit: "32mb"
}));

// URL Encoder
app.use(express.urlencoded({
    extended: true,
    limit: "32mb"
}))

// Give access to Static Assets/Files
app.use(express.static("public"))


// Cookie Parser Middleware - Store, Retrieve and CRUD Operations on cookies in the browser
app.use(cookieParser())

// Routes import
import userRouter from "./routes/user.routes.js";
import tweetRouter from "./routes/tweet.routes.js"
import subscriptionRouter from "./routes/subscription.routes.js"
import videoRouter from "./routes/video.routes.js"
import commentRouter from "./routes/comment.routes.js"
import likeRouter from "./routes/like.routes.js"
import playlistRouter from "./routes/playlist.routes.js"
import dashboardRouter from "./routes/dashboard.routes.js"
import healthcheckRouter from "./routes/healthcheck.routes.js"

// Routes declaration
app.use("/api/v1/users", userRouter);
// http://localhost:8000/api/v1/users/<route>

app.use("/api/v1/tweets", tweetRouter)
app.use("/api/v1/subscriptions", subscriptionRouter)
app.use("/api/v1/videos", videoRouter)
app.use("/api/v1/comments", commentRouter)
app.use("/api/v1/likes", likeRouter)
app.use("/api/v1/playlist", playlistRouter)
app.use("/api/v1/dashboard", dashboardRouter)
app.use("/api/v1/healthcheck", healthcheckRouter)

// app.get("/", (req, res) => {
//     res.send("<h1>Streamly: HOME PAGE</h1>");
// });

export { app };