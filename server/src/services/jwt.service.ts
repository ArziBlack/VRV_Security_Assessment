import { sign, SignOptions } from "jsonwebtoken";
import { JWT_EXPIRY, JWT_SECRET } from "../config";
import { TokenPayload } from "../interfaces/params";

export const sign_token = async (payload: TokenPayload): Promise<string> => {
    const options: SignOptions = {
      expiresIn: JWT_EXPIRY,
    };
  
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }
  
    return sign(payload, JWT_SECRET, options);
};