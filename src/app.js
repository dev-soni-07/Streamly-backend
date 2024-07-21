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


// Cookie Parser - Store, Retrieve and CRUD Operations on cookies in the browser
app.use(cookieParser())

// Routes import
import userRouter from "./routes/user.routes.js";

// Routes declaration
app.use("/api/v1/users", userRouter);
// http://localhost:8000/api/v1/users/<route>

app.get("/", (req, res) => {
    res.send("<h1>Streamly: HOME PAGE</h1>");
});

export { app };