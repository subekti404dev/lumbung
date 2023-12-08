import express, { Request, Response } from "express";

const router = express.Router();

router.get("/me", async (req: Request, res: Response) => {
  try {
    res.json({
      success: true,
      data: res.locals.user,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
