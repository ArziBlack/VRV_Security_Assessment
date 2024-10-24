import { Router } from "express";
import Authcontroller from "../controllers/auth.controller";

const router = Router();

router.route("/signup").post(Authcontroller.signup);

router.route("/signin").post(Authcontroller.signin);

export default router;