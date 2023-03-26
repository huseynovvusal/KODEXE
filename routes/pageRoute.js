import express from "express";
import PageController from "../controllers/pageController.js";
import UserController from "../controllers/userController.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET
router.get("/", PageController.getIndexPage);
router.get("/signup", PageController.getSignupPage);
router.get("/login", PageController.getLoginPage);

// POST
const userController = new UserController();

router.post("/signup", userController.createUser);
router.post("/login", userController.loginUser);

export default router;
