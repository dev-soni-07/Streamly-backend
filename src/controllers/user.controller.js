import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Controller to handle user registration
const registerUser = asyncHandler(async (req, res, next) => {
    // Get User Details (according to user.model) from Frontend
    // Validation on User Details: Not empty and others
    // Check if already exists: Check with username and email
    // Check for Images/Files, Check for Avatar
    // If Images, Files available then upload on Cloudinary, Check Avatar is successfully uploaded
    // Create a user object for MONGODB), create entry in DB, Also encrypt the password
    // Check for user creation in response, if not then send error as the response to the frontend
    // Remove "Password" and "Refresh Token" fields from the response
    // Send the response to the frontend

    // Get User Details (according to user.model) from Frontend
    const { username, email, fullName, password } = req.body;
    console.log(req.body)

    // Validation on User Details: Not empty and others
    if (
        [username, email, fullName, password].some(field => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    // Other Validations

    // Check if already exists
    const existedUser = User.findOne({
        $or: [
            { username },
            { email }
        ]
    })
    console.log(existedUser)

    if (existedUser) {
        throw new ApiError(409, "User with username or email already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path
    console.log(req.files)

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    // Upload on Cloudinary, Check Avatar is successfully uploaded
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(500, "Error in uploading avatar")
    }

    // Create a user object, create entry in DB, Also encrypt the password
    const user = await User.create({
        username: username.toLowerCase(),
        email,
        password,
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    // Send the response to the frontend
    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    )
});

export { registerUser };