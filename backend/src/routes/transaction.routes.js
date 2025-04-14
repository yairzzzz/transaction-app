import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { newTransaction } from "../controllers/transactions.controller.js";
const router = express.Router();

router.post("/new", newTransaction);

export default router;
