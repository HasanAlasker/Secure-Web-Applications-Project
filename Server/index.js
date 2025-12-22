import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

import users from "./routers/users.js";
import cookieParser from "cookie-parser";
import { globalLimit } from "./middleware/limiter.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", //change this when deployed ot netlify
    credentials: true,
  })
);
app.use(globalLimit)

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to mongoDB... ✅"))
  .catch((err) =>
    console.error("Error connecting to mongoDB... ❌", err.message)
  );

app.use("/api/users", users);

app.listen(port, () => {
  console.log(`Server running on port ${port} 🌍`);
});
