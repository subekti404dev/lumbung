import { database } from "../../db/db";
import express, { Request, Response } from "express";
import _ from "lodash";
const router = express.Router();
import dataFormatter from "../../utils/formatter";

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const type = req.query.type || "json";
    const data = database.getVaultById(id);
    if (!data) throw Error("not found");
    let rawText;
    if (type === "json") {
      res.json(data.data);
    }

    let contentType;

    if (type === "yaml") {
      rawText = dataFormatter.yaml(data.data);
      contentType = "application/yaml";
    }

    if (type === "toml") {
      rawText = dataFormatter.toml(data.data);
      contentType = "application/toml";
    }

    if (type === "dotenv") {
      rawText = dataFormatter.dotenv(data.data)?.replace(/\s*=\s*/g, "=");
      contentType = "text/plain";
    }
    if (contentType) res.setHeader("Content-Type", contentType);
    res.send(rawText);
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
