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
    res.status(400).json({ message: "Transaction could not be created" });
    console.log("Error in newTransaction controller", error);
  }
};

export const getTransactions = async (req, res) => {
  const { _id: userId } = req.user;
  const { start, end, min, max } = req.query;

  const query = {
    $or: [{ from: userId }, { to: userId }],
  };
  if (start || end) {
    query.date = {};

    if (start) query.date.$gte = new Date(start);
    if (end) query.date.$lte = new Date(end);
  }
  if (min || max) {
    query.amount = {};

    if (min) query.amount.$gte = parseFloat(min);
    if (max) query.amount.$lte = parseFloat(max);
  }
  try {
    const transactions = await Transaction.find(query).sort({ date: -1 });

    if (!transactions.length) {
      return res.status(404).json({ error: "Could not find any transaction" });
    }

    res.status(200).json({ message: "Success", data: transactions });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve transactions" });
    console.log("Error in getTransactions controller", error);
  }
};

export const updateTransaction = async (req, res) => {
  const { id } = req.params; // Transaction _id
  const { newAmount } = req.body;

  if (!id || newAmount == null) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      { amount: newAmount },
      { new: true }
    );

    if (!updatedTransaction) {
      return res
        .status(404)
        .json({ error: "Transaction not found or could not be updated" });
    }

    return res
      .status(200)
      .json({ message: "Success", data: updatedTransaction });
  } catch (error) {
    res.status(500).json({ error: "Failed to update the transaction" });
    console.log("Error in updateTransaction controller", error);
  }
};
