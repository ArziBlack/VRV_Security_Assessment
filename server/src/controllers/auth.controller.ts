import { TypedNextFn, TypedRequest, TypedResponse } from "typings/express";
import { AuthControllerInterface } from "../interfaces/auth";
import {
  APIErrorResponse,
  APIResponse,
  APISuccessResponse,
} from "typings/response";
import prisma from "../config/prisma";
import http_status from "http-status";
import { send_response } from "../helpers/send_response";
import bcrypt_service from "../services/bcrypt.service";
import { TokenPayload } from "../interfaces/params";
import { sign_token } from "../services/jwt.service";
import { signupValidationSchema } from "../validations/auth.validation";
import { IUser } from "typings/user";

/**
 *
 * @class
 * @classdesc Class representing the authentication controller
 * @name AuthController
 *
 */

export default class Authcontroller extends AuthControllerInterface {
  /**
   * Route: POST: /auth/signup
   * @async
   * @method signup
   * @description signup user
   * @param {TypedRequest} req - HTTP Request object
   * @param {TypedResponse} res - HTTP Response object
   * @param {TypedNextFn} next - HTTP NextFunction object
   * @memberof UserControllerInterface
   */

  public static async signup(
    req: TypedRequest,
    res: TypedResponse<
      APIResponse<
        | APISuccessResponse<{
            name: string;
            email: string;
            password: string | number;
            country: string;
            phone: number;
            state: string;
            homeAddress: string;
          }>
        | APIErrorResponse
        | void
      >
    >,
    next: TypedNextFn
  ) {
    try {
      const { error } = signupValidationSchema.validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        return res.status(400).json({
          success: false,
          message: "signup validation failed",
          errors: error.details.map((detail) => detail.message),
        });
      }

      const { name, email, password, country, state, phone, homeAddress } =
        req.body;

      const user_exists = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (user_exists) {
        return res.status(http_status.BAD_REQUEST).json(
          send_response({
            status: http_status.BAD_REQUEST,
            success: false,
            message: "Account already registered",
            errors: { email: "Email has already been used" },
          })
        );
      }

      const hashedPassword = await bcrypt_service.hashPassword(password);

      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          country,
          phone,
          state,
          homeAddress,
        },
      });

      res.status(http_status.CREATED).json(
        send_response({
          status: http_status.CREATED,
          success: true,
          message: "User created successfully",
          data: newUser,
        })
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Route: POST: /auth/signin
   * @async
   * @method signin
   * @description Sign in a user
   * @param {TypedRequest} req - HTTP Request object
   * @param {TypedResponse} res - HTTP Response object
   * @param {TypedNextFn} next - HTTP NextFunction object
   * @returns {Promise<APIResponse<T> | void>} {Promise<APIResponse<T> | void>}
   * @memberof AuthController
   */
  public static async signin<T>(
    req: TypedRequest,
    res: TypedResponse<T>,
    next: TypedNextFn
  ) {
    try {
      const { email, password } = req.body;

      const user = (await prisma.user.findUnique({
        where: { email },
      })) as IUser;

      if (!user) {
        return res.status(http_status.UNAUTHORIZED).json(
          send_response({
            status: http_status.UNAUTHORIZED,
            success: false,
            message: "Invalid email or password",
            errors: { email: "User not found with this email" },
          })
        );
      }

      const isPasswordValid = await bcrypt_service.comparePassword(
        password,
        user.password
      );

      if (!isPasswordValid) {
        return res.status(http_status.UNAUTHORIZED).json(
          send_response({
            status: http_status.UNAUTHORIZED,
            success: false,
            message: "Invalid email or password",
            errors: { password: "Incorrect password" },
          })
        );
      }

      const payload: TokenPayload = {
        email: user.email.toString(),
        role: user.role,
      };

      const token = await sign_token(payload);

      const { password: _, ...userWithoutPassword } = user;
      res.status(http_status.OK).json(
        send_response({
          status: http_status.OK,
          success: true,
          message: "Signed in successfully",
          data: { ...userWithoutPassword, token },
        })
      );
    } catch (error) {
      next(error);
    }
  }
}
