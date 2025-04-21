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
  const { from, to, min, max, page, limit } = req.query;

  const query = {
    $or: [{ from: userId }, { to: userId }],
  };
  if (from || to) {
    query.date = {};

    if (from) query.date.$gte = new Date(from);
    if (to) query.date.$lte = new Date(to);
  }
  if (min || max) {
    query.amount = {};

    if (min) query.amount.$gte = parseFloat(min);
    if (max) query.amount.$lte = parseFloat(max);
  }

  const safePage = Math.max(parseInt(page || "1", 10), 1);
  const safeLimit = Math.max(parseInt(limit || "10", 10), 1);

  const skip = (safePage - 1) * safeLimit;

  try {
    const transactions = await Transaction.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(safeLimit);

    if (!transactions.length) {
      return res.status(404).json({ error: "Could not find any transaction" });
    }

    const count = await Transaction.countDocuments(query);

    res.status(200).json({ message: "Success", data: transactions, count });
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

  const to = "68060e2c0989f42e1297ea43"; // dummy user._id to send transactions to

  // method, from, to, amount, fee, date - DB required

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
