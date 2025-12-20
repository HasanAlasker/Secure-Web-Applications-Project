import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: [2, "Name must be at least 2 characters long"],
      maxLength: [25, "Name can't be longer than 25 characters"],
      match: [/^[a-zA-Z\s'-]+$/, "Please enter a valid name"],
      required: true,
      trim: true,
    },
    email: {
      type: String,
      minLength: [5, "Email must be at least 5 characters long"],
      maxLength: [255, "Email can't be longer than 255 characters"],
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    otp: {
      type: String,
    },
    otpExpiry: {
      type: Date,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      role: this.role,
      name: this.name,
      email: this.email,
      isVerified: this.isVerified,
    },
    process.env.JWT_SECRET,
    { expiresIn: "3d" } // i might do token regeneration, but i will need an access token
  );

  return token;
};

userSchema.methods.hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const UserModel = mongoose.model("User", userSchema);
export default UserModel;