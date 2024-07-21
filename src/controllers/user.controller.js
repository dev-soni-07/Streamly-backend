import { asyncHandler } from "../utils/asyncHandler.js";

// Controller to handle user registration
const registerUser = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        message: "User registered successfully"
    });
});

export { registerUser };