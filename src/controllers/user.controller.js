import userModel from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import { uploadImageOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// @desc    Register a new user
const registerUserController = asyncHandler(async (req, res) => {
  try {
    // get user details from frontend (body)
    // validations
    // check if user exist (using username or email)
    // check for images
    //check for avatar
    //upload them to cloudinary, check avatar on clodinary
    // create user object or instance -> create entry in db
    //remove password and referesh token from response so that no one can see it
    // check for user createing if true then return response

    const { fullname, username, email, password } = req.body;
    console.table("User details", fullname, username, email, password);
    //validation
    if (
      [fullname, username, email, password].some(
        (feild) => feild?.trim() === ""
      )
    ) {
      throw new apiError(400, "All fields are required");
    }

    // check if user exist (using username or email)
    const userExist = await userModel.findOne({
      $or: [{ username }, { email }],
    });
    if (userExist) {
      throw new apiError(409, "User already exist");
    }

    // check for images using multer
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
      throw new apiError(400, "Avatar file is required");
    }

    //upload them to cloudinary, check avatar on clodinary
    const avatar = await uploadImageOnCloudinary(avatarLocalPath);
    const coverImage = await uploadImageOnCloudinary(coverImageLocalPath);
    if (!avatar) {
      throw new apiError(400, "Error while uploading avatar");
    }

    // create user object or instance -> create entry in db
    const user = await userModel.create({
      fullname,
      username,
      email,
      password,
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
    });

    const createdUser = await userModel
      .findById(user._id)
      .select("-password -refreshToken");
    if (!createdUser) {
      throw new apiError(500, "Server Error while creating user");
    }
    console.log("Created user", createdUser);

    return res
      .status(201)
      .json(new ApiResponse(201, createdUser, "User created"));
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({});
  }
});

export { registerUserController };
