import { NextFunction, Request, Response } from "express";
import { database } from "../db/db";

const apiToken = (req: Request, res: Response, next: NextFunction) => {
  const handleUnauthorized = () => {
    res.status(401).json({
      success: false,
      message: "Unautorized",
    });
  };
  try {
    const token = req.headers?.["x-api-token"] || "";
    if (!token) throw Error("token not found");
    const isExist = database.getAllToken().find((t) => t.token === token);
    if (!isExist) throw Error("invalid token");

    res.locals.token = token;
    return next();
  } catch (error) {
    return handleUnauthorized();
  }
};

export default apiToken;
