import { Router } from "express";
import Membercontroller from "../controllers/members.controller";

const router = Router();

router.route("/all").get(Membercontroller.get_users);

export default router;