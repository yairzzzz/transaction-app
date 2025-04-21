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
      set({ transactions: response.data.data });
      set({ totalCount: response.data.count });
    } catch (error) {
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

  generateDummyTransactions: async (data) => {
    set({ isGeneratingDummyTransactions: true });
    const transactions = get().transactions;
    try {
      const response = await transactionInstance.post("dummy", data);
      set({ transactions: [...transactions, response.data.data] });
      toast.success("Transactions generated successfully");
    } catch (error) {
      toast.error("Could not generate transactions");
      console.log(error.message);
    }
  },
}));
