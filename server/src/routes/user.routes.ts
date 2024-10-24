import { Router } from "express";
import UserController from "../controllers/user.controller";

const router = Router();

router.route("/update").put(UserController.update_profile);

export default router;