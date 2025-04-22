import axios from "axios";

const baseURL = import.meta.env.PROD ? "/api/" : "http://localhost:5000/api/";

export const authInstance = axios.create({
  baseURL: `${baseURL}auth`,
  withCredentials: true,
});

export const transactionInstance = axios.create({
  baseURL: `${baseURL}transaction`,
  withCredentials: true,
});
