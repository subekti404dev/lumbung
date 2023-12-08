import { NextFunction, Request, Response } from "express";
import { decodeJwt } from "../utils/jwt.util";

const jwtAuth = (req: Request, res: Response, next: NextFunction) => {
  const handleUnauthorized = () => {
    res.status(401).json({
      success: false,
      message: "Unautorized",
    });
  };

  const authorization = req.headers.authorization;
  const token = (authorization || "").split(" ")?.[1];
  if (!token) {
    return handleUnauthorized();
  }

  try {
    const user = decodeJwt(token);
    res.locals.user = user;
    return next();
  } catch (error) {
    return handleUnauthorized();
  }
};

export default jwtAuth;
