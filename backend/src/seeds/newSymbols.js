import Symbol from "../models/symbols.model.js";
import { connectDB } from "../lib/db.js";
import { config } from "dotenv";

config();

const symbolsToInsert = [
  {
    name: "BTC",
    lastPrice: 82675.0,
    priceChg: -373.54, // 0.45% of 83048.54
    pricePercentChange: "-0.45%",
  },
  {
    name: "ETH",
    lastPrice: 1783.65,
    priceChg: -16.02,
    pricePercentChange: "-0.89%",
  },
  {
    name: "BNB",
    lastPrice: 592.53,
    priceChg: -2.08,
    pricePercentChange: "-0.35%",
  },
  {
    name: "SOL",
    lastPrice: 117.37,
    priceChg: -1.5,
    pricePercentChange: "-1.26%",
  },
  {
    name: "XRP",
    lastPrice: 2.13,
    priceChg: 0.0,
    pricePercentChange: "-",
  },
  {
    name: "DOGE",
    lastPrice: 0.1675,
    priceChg: -0.00098,
    pricePercentChange: "-0.58%",
  },
  {
    name: "ADA",
    lastPrice: 0.6481,
    priceChg: -0.0101,
    pricePercentChange: "-1.54%",
  },
  {
    name: "AVAX",
    lastPrice: 17.85,
    priceChg: -0.21,
    pricePercentChange: "-1.16%",
  },
  {
    name: "DOT",
    lastPrice: 3.92,
    priceChg: -0.15,
    pricePercentChange: "-3.69%",
  },
  {
    name: "LINK",
    lastPrice: 12.63,
    priceChg: -0.14,
    pricePercentChange: "-1.10%",
  },
];

const addSymbols = async () => {
  try {
    connectDB();
    await Symbol.insertMany(symbolsToInsert);
    console.log("Operation completed");
  } catch (error) {
    console.log("Operation failed");
    console.log(error);
  }
};

addSymbols();
