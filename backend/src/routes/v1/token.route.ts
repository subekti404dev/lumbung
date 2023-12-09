import { database } from "../../db/db";
import express, { Request, Response } from "express";
import _ from "lodash";
import { validateRequiredFields } from "../../utils/field-validation.util";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    res.json({
      success: true,
      data: database.getAllToken(),
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    validateRequiredFields({ name });
    const data = database.generateNewToken(name);
    res.json({
      success: true,
      data,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/:token", async (req: Request, res: Response) => {
  try {
    const token = req.params.token;
    validateRequiredFields({ token });
    database.revokeToken(token);
    res.json({
      success: true,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
