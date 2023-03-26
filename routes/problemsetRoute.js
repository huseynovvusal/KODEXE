import express from "express";
import PageController from "../controllers/pageController.js";
import UserController from "../controllers/userController.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";
import problemsetRoute from "./problemsetRoute.js";

const router = express.Router();

router.get(
  "/",
  AuthMiddleware.blockNotLoggedInUser,
  PageController.getProblemsetPage
);

export default router;
