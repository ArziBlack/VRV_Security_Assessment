import { Router } from "express";
import Membercontroller from "../controllers/members.controller";
import { verify_token } from "../services/verify_jwt.service";

const router = Router();

router.route("/all").get(verify_token, Membercontroller.get_users);

export default router;