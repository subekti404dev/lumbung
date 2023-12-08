import express from "express";
import jwtAuth from "../../middlewares/jwt-auth.routes";
import userRoutes from "./users.route";
import uptimeRoutes from "./uptime.route";
import authRoutes from "./auth.route";
import vaultRoutes from "./vault.route";
import tokenRoutes from "./token.route";

const router = express.Router();

router.use("/uptime", uptimeRoutes); // <-- public routes
router.use("/auth", authRoutes);
router.use("/users", jwtAuth, userRoutes); // <-- private routes
router.use("/vaults", jwtAuth, vaultRoutes); // <-- private routes
router.use("/tokens", jwtAuth, tokenRoutes); // <-- private routes

export default router;
