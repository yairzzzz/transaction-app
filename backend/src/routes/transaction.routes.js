import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  newTransaction,
  getTransactions,
  updateTransaction,
} from "../controllers/transactions.controller.js";
const router = express.Router();

router.post("/new", newTransaction);

router.get("/get", protectRoute, getTransactions);

router.patch("/update/:id", protectRoute, updateTransaction);

export default router;
