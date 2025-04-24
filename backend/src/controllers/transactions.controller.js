import Transaction from "../models/transactions.model.js";
import crypto from "crypto";

export const getTransactions = async (req, res) => {
  const { _id: userId } = req.user;
  let { from, to, min, max, page, limit } = req.query;

  const query = {
    $or: [{ from: userId }, { to: userId }],
  };
  if (from || to) {
    query.date = {};

    if (from) query.date.$gte = new Date(from);
    if (to) query.date.$lte = new Date(to);
  }

  if (from && to && new Date(from) >= new Date(to)) {
    return res.status(400).json({ error: "Invalid dates range" });
  }

  if (min || max) {
    min = parseInt(min);
    max = parseInt(max);

    query.amount = {};

    if (min) query.amount.$gte = min;
    if (max) query.amount.$lte = max;
  }

  if (min && max && min >= max) {
    return res.status(400).json({ error: "Invalid amounts range" });
  }

  const safePage = +(page || "0") + 1;
  const safeLimit = +(limit || "10");

  const skip = (safePage - 1) * safeLimit;

  try {
    const transactions = await Transaction.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(safeLimit);

    const count = await Transaction.countDocuments(query);

    const message = transactions.length ? "Success" : "No transactions found";

    res.status(200).json({ message, data: transactions, count });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve transactions" });
    console.log("Error in getTransactions controller", error.message);
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
    console.log("Error in updateTransaction controller", error.TypeError);
  }
};

export const generateDummyTransactions = async (req, res) => {
  const { _id: from } = req.user;

  const { count, method } = req.body;

  if (count > 1000) {
    return res.status(400).json({ error: "Count can't be higher than 1,000" });
  }

  if (!method) {
    return res.status(400).json({ error: "Method is required" });
  }

  const to = "68060e2c0989f42e1297ea43"; // dummy user._id to send transactions to

  const transactions = [];

  for (let i = 0; i < count; i++) {
    const amount = Math.ceil(Math.random() * 100000);
    const fee = Math.random() * 20;
    const hash = `0x${crypto.randomBytes(32).toString("hex")}`;

    const start = new Date(2020, 0, 1).getTime();
    const end = new Date().getTime();
    const randomDate = start + Math.ceil(Math.random() * (end - start));
    const date = new Date(randomDate).toISOString();

    transactions.push({
      method,
      from,
      to,
      amount,
      fee,
      date,
      hash,
    });
  }

  try {
    const newTransactions = await Transaction.insertMany(transactions);

    res.status(200).json({ message: "Success", data: newTransactions });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
    console.log("Error in generateDummyTransactions controller", error.message);
  }
};
