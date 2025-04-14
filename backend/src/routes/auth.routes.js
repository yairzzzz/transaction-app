import express from "express";
import {
  register,
  login,
  logout,
  checkAuth,
} from "../controllers/auth.controller.js";

import protectRoute from "../middleware/protectRoute.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.get("/checkAuth", protectRoute, checkAuth);

export default router;
