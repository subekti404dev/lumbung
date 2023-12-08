import { database } from "../../db/db";
import express, { Request, Response } from "express";
import _ from "lodash";
import { validateRequiredFields } from "../../utils/field-validation.util";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    res.json({
      success: true,
      data: database.getVaults(),
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

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

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, data } = req.body;
    validateRequiredFields({ name, data });
    database.addVault(name, data);
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

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { name, data } = req.body;
    validateRequiredFields({ id, name, data });
    database.updateVault(id, data);
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

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    validateRequiredFields({ id });
    database.deleteVaultById(id);
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
