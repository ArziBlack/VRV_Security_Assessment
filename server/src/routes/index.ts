import { Request, Response, Router } from "express";
import http_status from "http-status";
import auth_route from "./auth.routes";
import admin_route from "./admin.routes";
import user_route from "./user.routes";

const router = Router();

/** GET /health-check - Check service health */
router.get("/cdab", (_, res) => {
    res.status(http_status.OK).json({
      message: "CDAB server started successfully",
      success: true,
    });
});

router.use("/auth", auth_route);

router.use("/user", user_route);

router.use("/admin", admin_route);

export default router;