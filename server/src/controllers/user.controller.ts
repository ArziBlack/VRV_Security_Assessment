import { TypedNextFn, TypedRequest, TypedResponse } from "typings/express";
import http_status from "http-status";
import { send_response } from "../helpers/send_response";
import prisma from "../config/prisma";
import bcrypt_service from "../services/bcrypt.service";

export default class UserController {
  static async update_profile<T>(
    req: TypedRequest,
    res: TypedResponse<T>,
    next: TypedNextFn
  ) {
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {
      if (!id) {
        return res.status(http_status.BAD_REQUEST).json(
          send_response({
            status: http_status.BAD_REQUEST,
            success: false,
            message: "User ID is required!",
          })
        );
      }

      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
      });

      if (!user) {
        return res.status(http_status.NOT_FOUND).json(
          send_response({
            status: http_status.NOT_FOUND,
            success: false,
            message: "User not found",
          })
        );
      }

      const updatedData: Partial<typeof user> = {};

      if (name) updatedData.name = name;
      if (email) updatedData.email = email;
      if (password) {
        updatedData.password = await bcrypt_service.hashPassword(password);
      }

      const updatedUser = await prisma.user.update({
        where: { id: Number(id) },
        data: req.body || updatedData,
      });

      res.status(http_status.OK).json(
        send_response({
          status: http_status.OK,
          success: true,
          message: "User profile updated successfully",
          data: updatedUser as unknown as T,
        })
      );
    } catch (error) {
      next(error);
    }
  }

  static async check_network_security_and_verify_users<T>(
    req: TypedRequest,
    res: TypedResponse<T>,
    next: TypedNextFn
  ) {
    try {
      const user = req.user;
      const { id } = req.params;

      if (!id) {
        return res.status(http_status.BAD_REQUEST).json(
          send_response({
            status: http_status.BAD_REQUEST,
            success: false,
            message: "User ID is required!",
          })
        );
      }

      const found_user = await prisma.user.findUnique({
        where: { id: Number(id) },
      });

      if (!found_user) {
        return res.status(http_status.NOT_FOUND).json(
          send_response({
            status: http_status.NOT_FOUND,
            success: false,
            message: "User not found!",
          })
        );
      }

      const updated_user = await prisma.user.update({
        where: { id: Number(id) },
        data: { isVerified: true },
      });

      return res.status(http_status.OK).json(
        send_response({
          status: http_status.OK,
          success: true,
          message: "User verification updated successfully.",
          data: updated_user,
        })
      );
    } catch (error) {
      next(error);
    }
  }
}
