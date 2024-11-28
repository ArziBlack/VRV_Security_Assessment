import { Router } from "express";
import Membercontroller from "../controllers/members.controller";
import { verify_admin } from "../services/verify_admin.service";
import { verify_moderator } from "../services/verify_moderator.service";
import UserController from "../controllers/user.controller";

const router = Router();

router.route("/all").get(verify_admin, Membercontroller.get_users);

router
  .route("/mod_all")
  .get(verify_moderator, Membercontroller.get_unverified_users);

router
  .route("/:id/verify")
  .get(
    verify_moderator,
    UserController.check_network_security_and_verify_users
  );

export default router;
