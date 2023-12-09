import { database } from "../../db/db";
import express, { Request, Response } from "express";
import _ from "lodash";
const router = express.Router();

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    res.json({
      success: true,
      data: database.getVaultById(id),
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
