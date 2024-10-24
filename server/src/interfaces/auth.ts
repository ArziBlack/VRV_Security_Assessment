import { TypedNextFn, TypedRequest, TypedResponse } from "typings/express";
import { APIResponse } from "typings/response";

export abstract class AuthControllerInterface {
  /**
   * @async
   * @method signup
   * @param {object} req
   * @param {object} res
   * @returns {any}
   * @memberof AuthControllerInterface
   */
  public static signup: <T>(
    req: TypedRequest,
    res: TypedResponse<T>,
    next: TypedNextFn
  ) => any;

      /**
   * @async
   * @method signin
   * @param {object} req
   * @param {object} res
   * @returns {APISuccessResponse}
   * @memberof AuthControllerInterface
   */
  public static signin: <T>(
    req: TypedRequest,
    res: TypedResponse<T>,
    next: TypedNextFn
  ) => any;
  
}