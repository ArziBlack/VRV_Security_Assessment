import { Router } from "express";
import UserController from "../controllers/user.controller";
import { verify } from "../services/verify_jwt.service";

const router = Router();

router.route("/update/:id").put(verify, UserController.update_profile);

export default router;