import { Router } from "express";
import UserController from "../controllers/user.controller";
import { verify_token } from "../services/verify_jwt.service";

const router = Router();

router.route("/update/:id").put(verify_token, UserController.update_profile);

export default router;