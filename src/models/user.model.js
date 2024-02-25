import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    watchHistory: [
      //  using mongoDb aggration-paginate-v2 to paginate the watch history
      // This is an array of video ids
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],

    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true, // This is for indexing the username field for faster search
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      index: true,
    },
    avatar: {
      required: true,
      type: String, //we are going to use Clooudinary url for this
      default:
        "https://res.cloudinary.com/dxkufsejm/image/upload/v1626820003/avatars/avatar-1_ukzv3d.png",
    },
    coverImage: {
      type: String, //we are going to use Clooudinary url for this
      default:
        "https://res.cloudinary.com/dxkufsejm/image/upload/v1626820003/avatars/avatar-1_ukzv3d.png",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      min: [6, "Password must be at least 6 characters long"],
      max: 12,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// ---------------------password-start-----------------------------
// -------- password hashing using bcrypt and pre save hook
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// ----------------- custom method comparePassword
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
// ------------------password-end-----------------------

// ---------------------jwt-start-----------------------------
// ------------------ custom method generateAccessToken
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// ------------------ custom method generateRefreshToken
userSchema.methods.generateRefreshToken = function () {
  jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
