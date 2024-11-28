import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config";
import { NextFunction, Request, Response } from "express";
import { TokenPayload } from "../interfaces/params";
import { Role } from "../interfaces/role";

export async function verify_moderator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = await req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
      if (err)
        return res.status(403).json({
          success: false,
          message: "Token Cannot be Verified!!!",
        });

      const user = decoded as TokenPayload;

      if (user.role !== Role.SECURITY_ANALYST) {
        return res.status(403).json({
          success: false,
          message: "You do not have permission to access this resource",
        });
      }

      req.user = user;

      next();
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "You are not Authenticated",
    });
  }
}
