import Transaction from "../models/transactions.model.js";
import crypto from "crypto";

export const newTransaction = async (req, res) => {
  const { method, from, to, amount, fee, date } = req.body;

  if (fee < 0 || amount < 0) {
    return res
      .status(400)
      .json({ error: "Amount and Fee cannot be lower than zero" });
  }

  const fields = ["method", "from", "to", "amount", "fee", "date"];

  const missing = fields.filter((f) => !req.body[f]);

  if (missing.length) {
    return res
      .status(400)
      .json({ error: `Missing fields: ${missing.join(",")}` });
  }

  try {
    const hash = `0x${crypto.randomBytes(32).toString("hex")}`;

    const newTransaction = await Transaction.create({
      method,
      from,
      to,
      amount: parseFloat(amount),
      fee: parseFloat(fee),
      hash,
      date,
    });

    res.status(201).json({
      message: "Transaction created successfully",
      data: newTransaction,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Transaction could not be created", error });
  }
};
