import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/userAuth.route.js";

export const app = express();

//middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// route
app.use("/api/v1/auth", authRoute);
