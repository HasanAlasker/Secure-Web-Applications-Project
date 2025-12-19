import express from "express";
import mongoose from "mongoose";
import admin from "../middleware/admin.js";
import UserModel from "../models/users.js";
import auth from "../middleware/auth.js";
import validate from "../middleware/joiValidation.js";
import { userLoginSchema, userRegistrationSchema } from "../validation/users.js";

const router = express.Router();

// get all users (admin)
router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    if (users.length === 0) return res.status(404).send("No users found");

    return res.status(200).send(users);
  } catch (err) {
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

    return res.status(201).send(newUser);
  } catch (err) {
    console.log(err)
    return res.status(500).send(err);
  }
});

// user login



// get me (auth users)

export default router;
