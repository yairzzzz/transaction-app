import { create } from "zustand";
import { transactionInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const transactionStore = create((set, get) => ({
  transactions: [],
  totalCount: 0,
  isTransactionsLoading: false,
  isGeneratingDummyTransactions: false,
  filterQuery: {},
  setFilterQuery: (query) => {
    const { filterQuery } = get();
    set({ filterQuery: { ...filterQuery, ...query } });
  },
  resetFilterQuery: () => set({ filterQuery: {} }),

  getTransactions: async (data) => {
    set({ isTransactionsLoading: true });

    try {
      const response = await transactionInstance.get("get", {
        params: {
          from: data?.from,
          to: data?.to,
          min: data?.min,
          max: data?.max,
          page: data?.page,
          limit: data?.limit,
        },
      });
      const results = response.data;
      set({ transactions: results.data });
      set({ totalCount: results.count });
      !results.data.length && set((get().filterQuery = {}));
    } catch (error) {
      console.log(error.message);
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

  generateDummyTransactions: async (data) => {
    set({ isGeneratingDummyTransactions: true });
    const transactions = get().transactions;
    try {
      const response = await transactionInstance.post("dummy", data);
      const tx = response.data.data;
      set({ transactions: [...transactions, ...tx] });
      set({ totalCount: tx.length });

      toast.success("Transactions generated successfully");
    } catch (error) {
      toast.error("Could not generate transactions");
      console.log(error.message);
    } finally {
      set({ isGeneratingDummyTransactions: false });
    }
  },
}));
