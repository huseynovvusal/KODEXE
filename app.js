import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { Database } from "./helpers/database/connection.js";
import pageRoute from "./routes/pageRoute.js";

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

// ROUTE
app.use("/", pageRoute);

// RUN
app.listen(PORT, () => console.log(`App is running on PORT : ${PORT}`));
