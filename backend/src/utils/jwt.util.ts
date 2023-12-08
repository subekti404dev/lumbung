import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const jwtSecret = process.env.JWT_SECRET || "__th1s_is_secr3t";

export const generateJwt = (payload: any) => {
  return jwt.sign(payload, jwtSecret);
};

export const decodeJwt = (token: any) => {
  return jwt.verify(token, jwtSecret) as any;
};
