import express from "express";
import PageController from "../controllers/pageController.js";
import UserController from "../controllers/userController.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";
import problemsetRoute from "./problemsetRoute.js";

const router = express.Router();

// GET
router.get("/", PageController.getIndexPage);
router.get(
  "/signup",
  AuthMiddleware.blockLoggedInUser,
  PageController.getSignupPage
);
router.get(
  "/login",
  AuthMiddleware.blockLoggedInUser,
  PageController.getLoginPage
);

// POST
const userController = new UserController();

router.post(
  "/signup",
  AuthMiddleware.blockLoggedInUser,
  userController.signUpUser
);
router.post(
  "/login",
  AuthMiddleware.blockLoggedInUser,
  userController.loginUser
);

// Verificate
router.get(
  "/verification/:token",
  AuthMiddleware.blockLoggedInUser,
  userController.verificate
);

// POST USER
router.post(
  "/:username/update/score",
  AuthMiddleware.checkUser,
  PageController.updateUserScore
);

router.use("/problemset", problemsetRoute);

// PROFILE
router.get("/:username", PageController.getProfilePage);

export default router;
