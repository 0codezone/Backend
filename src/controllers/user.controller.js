// import userModel from "../models/user.model.js"
import asyncHandler from "../utils/asyncHandler.js";

// @desc    Register a new user
const registerUserController = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "User registered successfully  OK",
  });
});

export { registerUserController };
