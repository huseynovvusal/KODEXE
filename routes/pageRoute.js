import express from "express";
import PageController from "../controllers/pageController.js";
import UserController from "../controllers/userController.js";

const router = express.Router();

// GET
router.get("/", PageController.getIndexPage);
router.get("/signup", PageController.getSignupPage);
router.get("/login", PageController.getLoginPage);

// POST
router.post("/signup", UserController.createUser);

export default router;
