import { create } from "zustand";
import { transactionInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { persist } from "zustand/middleware";

export const transactionStore = create()(
  persist((set, get) => ({
    transactions: [],
    isTransactionsLoading: false,

    getTransactions: async (data) => {
      set({ isTransactionsLoading: true });

      try {
        const response = await transactionInstance("get", {
          params: {
            from: data?.from,
            to: data?.to,
            min: data?.min,
            max: data?.max,
          },
        });
        set({ transactions: response.data.data });
      } catch (error) {
        toast.error("Could not find any transaction");
        console.log(error.message);
        set({ transactions: [] });
      } finally {
        set({ isTransactionsLoading: false });
      }
    },

    editAmount: async (id, newAmount) => {
      const transactions = get().transactions;
      try {
        const response = await transactionInstance.patch(`update/${id}`, {
          newAmount,
        });

        const updatedTransactions = transactions.map((tx) =>
          id === tx._id ? response.data.data : tx
        );

        set({ transactions: updatedTransactions });
        toast.success("Amount was changed successfully");
      } catch (error) {
        toast.error("Could not change the amount");
        console.log(error.message);
      }
    },
  }))
);
