import _ from "lodash";
import express, { Request, Response } from "express";
import { database } from "../../db/db";
import { validateRequiredFields } from "../../utils/field-validation.util";
import { socket } from "../../utils/socket";
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
    const oldData = database.getVaultById(id);
    const isDiff = JSON.stringify(oldData) !== JSON.stringify(data);
    if (isDiff) {
      database.updateVault(id, data);
      socket.emit(`update_${id}`, JSON.stringify(data));
    }
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
