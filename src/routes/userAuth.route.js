import { Router } from "express";
import { registerUserController } from "../controllers/user.controller.js";

const router = Router();

// @desc register a new user route
router.route("/register").post(registerUserController);

export default router;
