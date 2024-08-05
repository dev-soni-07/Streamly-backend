import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// Middleware configurations
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    optionsSuccessStatus: 200,
}));

app.use(express.json({
    limit: '32mb'
}));

app.use(express.urlencoded({
    extended: true,
    limit: '32mb'
}));

app.use(express.static('public'));

app.use(cookieParser());

// Routes import
import userRouter from './routes/user.routes.js';
import tweetRouter from './routes/tweet.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import videoRouter from './routes/video.routes.js';
import commentRouter from './routes/comment.routes.js';
import likeRouter from './routes/like.routes.js';
import playlistRouter from './routes/playlist.routes.js';
import dashboardRouter from './routes/dashboard.routes.js';
import healthcheckRouter from './routes/healthcheck.routes.js';

// Routes declaration
app.use('/api/v1/users', userRouter); // Postman Testing Done
app.use('/api/v1/tweets', tweetRouter); // Postman Testing Done
app.use('/api/v1/subscriptions', subscriptionRouter); // Some API Postman Testing Remaining
app.use('/api/v1/videos', videoRouter); // Some API Postman Testing Remaining
app.use('/api/v1/comments', commentRouter); // 
app.use('/api/v1/likes', likeRouter); // 
app.use('/api/v1/playlists', playlistRouter); // 
app.use('/api/v1/dashboard', dashboardRouter); // 
app.use('/api/v1/healthcheck', healthcheckRouter); // Postman Testing Done

export { app };