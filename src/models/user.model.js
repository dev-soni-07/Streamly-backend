import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true, // This is for database searching optimization
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        avatar: {
            type: String, // Cloudinary URL to store the image and get URL from there
            required: true,
        },
        coverImage: {
            type: String, // Cloudinary URL to store the image and get URL from there
        },
        watchHistory: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Video",
            }
        ],
        password: {
            type: String,
            required: [true, "Password is required"], // Custom error message
        },
        refreshToken: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
)

// Don't use Arrow function in below because it won't be suitable for "this" keyword
userSchema.pre("save", async function (err, req, res, next) {
    // Middleware to hash the password before saving
    if (!this.isModified("password")) return next()
    this.password = bcrypt.hash(this.password, 10)
    next()
})

// Designing a custom method
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password) // Return true or false
}


// JWT is a bearer token, those who bear or have these tokens can access the resources or data
userSchema.methods.generateAccessToken = async function () {
    return await jwt.sign(
        {
            _id: this._id, // From MongoDB
            email: this.email,
            username: this.username,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}
userSchema.methods.generateRefreshToken = async function () {
    return await jwt.sign(
        {
            _id: this._id, // From MongoDB
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}

export const User = mongoose.model("User", userSchema)