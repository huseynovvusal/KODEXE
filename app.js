import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { Database } from "./helpers/database/connection.js";
import pageRoute from "./routes/pageRoute.js";
import cookieParser from "cookie-parser";
import AuthMiddleware from "./middlewares/authMiddleware.js";

const app = express();

dotenv.config({
  path: "./config/.env",
});

// PORT
const PORT = process.env.PORT;

// DATABASE CONNECTION
Database.conntect();

// EJS
app.set("view engine", "ejs");

// STATIC
app.use(express.static("public"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ROUTE
app.get("*", AuthMiddleware.checkUser);
app.use("/", pageRoute);

// 404
app.use(function (req, res) {
  res.status(404).render("404");
});

// RUN
app.listen(PORT, () => console.log(`App is running on PORT : ${PORT}`));
