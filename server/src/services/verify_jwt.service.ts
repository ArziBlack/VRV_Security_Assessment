import { verify } from "jsonwebtoken";

import { JWT_SECRET } from "../config";
import { TypedNextFn, TypedRequest, TypedResponse } from "typings/express";
import { APIErrorResponse } from "typings/response";

export const verify_token = async (
  req: TypedRequest,
  res: TypedResponse<APIErrorResponse>,
  next: TypedNextFn,
) => {
  const auth_header = req.headers["authorization"];
  if (!auth_header) {
    res
      .status(401)
      .json({
        success: false,
        message: "You are not Authorized!!",
        errors: "Unauthorized",
      });
  }

  const token = auth_header?.split(" ")[1];

  if (!token) {
    res.status(403).json({
      success: false,
      message: "Token cannot be found!!!",
      errors: "cannot verify token",
    });
  }

  verify(token as string, JWT_SECRET, (err: any, user: any) => {
    if (err)
    res.status(403).json({
        success: false,
        message: "Token cannot be Verified!!!",
        errors: "cannot verify token",
      });
    next();
  });
};