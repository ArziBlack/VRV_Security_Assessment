import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config";
import { NextFunction, Request, Response } from "express";

export async function verify(req: Request, res: Response, next: NextFunction) {
  const authHeader = await req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(
      token,
      JWT_SECRET,
      (err: any, user: any) => {
        if (err) 
          return res.status(403).json({
            success: false,
            message: "Token Cannot be Verified!!!",
          });
        next();
      },
    );
  } else {
    return res.status(401).json({
      success: false,
      message: "You are not Authenticated",
    });
  }
}
