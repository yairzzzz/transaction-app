import axios from "axios";

export const authInstance = axios.create({
  baseURL: "http://localhost:5000/api/auth/",
  withCredentials: true,
});

export const transactionInstance = axios.create({
  baseURL: "http://localhost:5000/api/transaction/",
  withCredentials: true,
});
