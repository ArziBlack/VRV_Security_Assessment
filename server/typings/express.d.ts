import { NextFunction, Request, Response } from "express";
import { TokenPayload } from "../src/interfaces/params";

type TypedRequest<P = Record<string, string>> = Request<P>;
type TypedResponse<T> = Response<APIResponse<T>>;
type TypedNextFn = NextFunction;

type Params<P extends string> = Record<P, string>;

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}
