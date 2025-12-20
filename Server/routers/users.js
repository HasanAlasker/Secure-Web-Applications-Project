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

const router = express.Router();

// get all users (admin)
router.get("/", [auth, admin], async (req, res) => {
  try {
    const users = await UserModel.find()
      .select("-password -__v")
      .sort("-createdAt");
    if (users.length === 0) return res.status(404).send("No users found");

    return res.status(200).send(users);
  } catch (err) {
    return res.status(500).send(err);
  }
});

// get me (auth users)
router.get("/me", auth, async (req, res) => {
  try {
    const id = req.user._id;

    const user = await UserModel.findById(id).select("-password -__v");
    if (!user) res.status(404).send("User not found");

    return res.status(201).send(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

// user registration
router.post("/register", validate(userRegistrationSchema), async (req, res) => {
  try {
    const data = req.body;
    const checkExistingUser = await UserModel.findOne({ email: data.email });
    if (checkExistingUser)
      return res.status(400).send("User already registered");

    const newUser = new UserModel(data);
    newUser.password = await newUser.hashPassword(data.password);

    await newUser.save();

    const response = _.pick(newUser, [
      "_id",
      "name",
      "email",
      "role",
      "isVerified",
      "createdAt",
      "updatedAt",
    ]);

    return res.status(201).send(response);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

// user login
router.post("/login", validate(userLoginSchema), async (req, res) => {
  try {
    const data = req.body;

    const user = await UserModel.findOne({ email: data.email });
    if (!user) return res.status(400).send("Wrong email or password");

    const validPassword = await bcrypt.compare(data.password, user.password);
    if (!validPassword) return res.status(400).send("Wrong email or password");

    const token = user.generateAuthToken();

    const response = _.pick(user, [
      "_id",
      "name",
      "email",
      "role",
      "isVerified",
      "createdAt",
      "updatedAt",
    ]);

    return res.status(200).header("x-auth-token", token).send(response);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

export default router;
