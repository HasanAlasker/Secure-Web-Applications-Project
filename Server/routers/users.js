import express from "express";
import mongoose from "mongoose";
import _ from "lodash";
import bcrypt from "bcrypt";
import admin from "../middleware/admin.js";
import UserModel from "../models/users.js";
import auth from "../middleware/auth.js";
import validate from "../middleware/joiValidation.js";
import {
  userLoginSchema,
  userRegistrationSchema,
} from "../validation/users.js";
import winstonLogger from "../middleware/winston.js";
import { limiterLogin, limiterRegister } from "../middleware/limiter.js";
import { logger } from "../utils/winston.js";

const router = express.Router();

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 24 * 60 * 60 * 1000, // 1 day
};

// get all users (admin)
router.get("/", [auth, admin, winstonLogger], async (req, res) => {
  try {
    const users = await UserModel.find({isDeleted : false})
      .select("-password -__v")
      .sort("-createdAt");
    if (users.length === 0) return res.status(404).send("No users found");

    return res.status(200).send(users);
  } catch (err) {
    logger.error("Error:", err);
    return res.status(500).send("Server Error");
  }
});

// get deleted users (admin)
router.get("/deleted", [auth, admin, winstonLogger], async (req, res) => {
  try {
    const users = await UserModel.find({isDeleted : true})
      .select("-password -__v")
      .sort("-createdAt");
    if (users.length === 0) return res.status(404).send("No users found");

    return res.status(200).send(users);
  } catch (err) {
    logger.error("Error:", err);
    return res.status(500).send("Server Error");
  }
});

// get me (auth users)
router.get("/me", [auth, winstonLogger], async (req, res) => {
  try {
    const id = req.user._id;

    const user = await UserModel.findById(id).select("-password -__v");
    if (!user) res.status(404).send("User not found");

    return res.status(201).send(user);
  } catch (err) {
    logger.error("Error:", err);
    return res.status(500).send("Server Error");
  }
});

// check if server is up
router.get("/awake", async (req, res) => {
  try {
    return res.status(201).send("Awake");
  } catch (err) {
    logger.error("Error:", err);
    return res.status(500).send("Server Error");
  }
});

// user registration
router.post(
  "/register",
  [validate(userRegistrationSchema), limiterRegister],
  async (req, res) => {
    try {
      const data = req.body;
      const checkExistingUser = await UserModel.findOne({ email: data.email });
      if (checkExistingUser) {
        return res.status(400).json({ message: "User already registered" });
      }
      const newUser = new UserModel(data);
      newUser.password = await newUser.hashPassword(data.password);

      await newUser.save();

      const token = await newUser.generateAuthToken();

      const response = _.pick(newUser, [
        "_id",
        "name",
        "email",
        "role",
        "isVerified",
        "isDeleted",
        "createdAt",
        "updatedAt",
      ]);

      return res
        .status(201)
        .cookie("token", token, cookieOptions)
        .json(response);
    } catch (err) {
      logger.error("Error:", err);
      return res.status(500).send("Server Error");
    }
  }
);

// user login
router.post(
  "/login",
  [validate(userLoginSchema), limiterLogin],
  async (req, res) => {
    try {
      const data = req.body;

      const user = await UserModel.findOne({ email: data.email });
      if (!user) return res.status(400).send("Wrong email or password");

      const validPassword = await bcrypt.compare(data.password, user.password);
      if (!validPassword)
        return res.status(400).send("Wrong email or password");

      const token = user.generateAuthToken();

      const response = _.pick(user, [
        "_id",
        "name",
        "email",
        "role",
        "isVerified",
        "isDeleted",
        "createdAt",
        "updatedAt",
      ]);

      return res
        .status(200)
        .cookie("token", token, cookieOptions)
        .send(response);
    } catch (err) {
      console.log(err);
      return res.status(500).send("Server Error");
    }
  }
);

router.post("/logout", async (req, res) => {
  try {
    res
      .clearCookie("token")
      .status(200)
      .send({ message: "Logged out successfully" });
  } catch (err) {
    logger.error("Error:", err);
    return res.status(500).send("Server Error");
  }
});

//soft delete user (admin)
router.put("/delete/:id", [auth, admin], async (req, res) => {
  try {
    const id = req.params.id;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid ad ID");
    }

    const user = await UserModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { runValidators: true, new: true }
    );

    return res.status(202).send(user);
  } catch (err) {
    logger.error("Error:", err);
    console.log(err);
    return res.status(500).send("Server Error");
  }
});

//soft delete user (admin)
router.put("/un-delete/:id", [auth, admin], async (req, res) => {
  try {
    const id = req.params.id;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid ad ID");
    }

    const user = await UserModel.findByIdAndUpdate(
      id,
      { isDeleted: false },
      { runValidators: true, new: true }
    );

    return res.status(202).send(user);
  } catch (err) {
    logger.error("Error:", err);
    console.log(err);
    return res.status(500).send("Server Error");
  }
});

export default router;
