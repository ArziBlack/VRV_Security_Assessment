import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 3000 as number;
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const JWT_EXPIRY = process.env.JWT_EXPIRY as string;
export const BCRYPT_ROUND = process.env.BCRYPT_ROUND;
export const DATABASE_URL = process.env.DATABASE_URL as string;