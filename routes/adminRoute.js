import express from "express";
import PageController from "../controllers/pageController.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";
import AdminController from "../controllers/adminController.js";

const router = express.Router();

router.get("*", AuthMiddleware.checkAdmin);
router.post("*", AuthMiddleware.checkAdmin);

router.get("/", PageController.getAdminPage);

router.post("/add_problem", AdminController.add_problem);

export default router;
