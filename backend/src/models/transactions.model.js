import mongoose from "mongoose";

const transactionsSchema = new mongoose.Schema({
  hash: {
    type: String,
    required: true,
    unique: true,
  },
  method: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  fee: {
    type: Number,
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },
});

const Transaction = mongoose.model("Transaction", transactionsSchema);
export default Transaction;
