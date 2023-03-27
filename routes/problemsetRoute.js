import express from "express";
import PageController from "../controllers/pageController.js";
import ProblemController from "../controllers/problemController.js";
import UserController from "../controllers/userController.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";
import problemsetRoute from "./problemsetRoute.js";

const router = express.Router();

router.get(
  "/",
  AuthMiddleware.blockNotLoggedInUser,
  PageController.getProblemsetPage
);

router.get(
  "/:id",
  AuthMiddleware.blockNotLoggedInUser,
  PageController.getProblemPage
);

// POST

router.post(
  "/:id/solution",
  AuthMiddleware.blockNotLoggedInUser,
  ProblemController.problemSolution
);

export default router;
