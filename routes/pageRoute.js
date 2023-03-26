import express from "express";
import PageController from "../controllers/pageController.js";
import UserController from "../controllers/userController.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";

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
  userController.createUser
);
router.post(
  "/login",
  AuthMiddleware.blockLoggedInUser,
  userController.loginUser
);

router.get("/problemset", PageController.getProblemsetPage);

export default router;
