import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import { generateJwt } from "../../utils/jwt.util";
import { validateRequiredFields } from "../../utils/field-validation.util";
import md5 from "md5";
const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { password } = req.body || {};
    validateRequiredFields({ password });

    const password_hash = md5(process.env.PASSWORD || "admin");

    if (password_hash !== md5(password)) throw Error("Invalid Password");

    res.json({
      success: true,
      token: generateJwt({ id: 1 }),
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
