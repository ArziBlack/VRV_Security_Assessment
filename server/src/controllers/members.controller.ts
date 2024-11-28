import { TypedNextFn, TypedRequest, TypedResponse } from "typings/express";
import { send_response } from "../helpers/send_response";
import prisma from "../config/prisma";
import http_status from "http-status";

export default class Membercontroller {
  static async get_users<T>(
    req: TypedRequest,
    res: TypedResponse<T>,
    next: TypedNextFn
  ) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const users = await prisma.user.findMany({
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      res.status(http_status.OK).json(
        send_response({
          status: http_status.OK,
          success: true,
          message: "Users retrieved successfully",
          data: users as unknown as T,
        })
      );
    } catch (error) {
      next(error);
    }
  }

  static async get_unverified_users<T>(
    req: TypedRequest,
    res: TypedResponse<T>,
    next: TypedNextFn
  ) {
    try {
      const { page = 1, limit = 10 } = req.query;

      const unverified_users = await prisma.user.findMany({
        where: { isVerified: false },
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
        select: {
          id: true,
          name: true,
          email: true,
          isVerified: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      res.status(http_status.OK).json(
        send_response({
          status: http_status.OK,
          success: true,
          message: "Unverified users retrieved successfully",
          data: unverified_users as unknown as T,
        })
      );
    } catch (error) {
      next(error);
    }
  }
}
