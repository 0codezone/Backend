import { Router } from "express";
import { registerUserController } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// @desc register a new user route
router.route("/register").post(
  upload.fields([
    //upload.fields() is used to upload multiple files
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),

  registerUserController
);

export default router;
