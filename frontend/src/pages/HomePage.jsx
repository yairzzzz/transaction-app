import { Pencil, X, Check } from "lucide-react";
import { transactionStore } from "../store/transactionStore";
import { useEffect, useState } from "react";
import Filter from "../components/Filter";
import Pagination from "../components/Pagination";
import TransactionsNotFound from "../components/TransactionsNotFound";
import convertDate from "../lib/convertDate";
import EthData from "../components/EthData";
import { etherscanStore } from "../store/etherscanStore";
import toast from "react-hot-toast";

const HomePage = () => {
  const { transactions, getTransactions, editAmount, isTransactionsLoading } =
    transactionStore();
  const { getEthLastPrice } = etherscanStore();

  const [editingId, setEditingId] = useState(null);
  const [editedAmount, setEditedAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isNaN(editedAmount)) {
      return toast.error("Amount must be a valid number");
    }

    const currentTx = transactions.find((tx) => tx._id === editingId);
    const currentAmount = currentTx?.amount; // Prevent updating to the same amount
    if (currentAmount === +editedAmount) {
      return toast.error(
        "Please choose a different amount than the previous one"
      );
    }

    if (editedAmount > 999999999) {
      return toast.error("Amount can't exceed 1B");
    }

    editAmount(editingId, editedAmount);
    setEditingId(null);
  };

  useEffect(() => {
    getTransactions();
    getEthLastPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!transactions.length && !isTransactionsLoading) {
    return <TransactionsNotFound />;
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <section className=" flex flex-col h-[90%] bg-base-200 rounded-2xl shadow-2xl overflow-hidden">
        <EthData />
        {/* Filter Component */}
        <Filter />
        {/* Pagination Component*/}
        <div className="w-full p-4">
          <Pagination />
        </div>
        <div className="overflow-x-auto w-full grow">
          {/* Table starts */}
          <table className="table w-full min-w-[1000px] table-zebra table-md">
            <thead>
              <tr className="text-center sticky">
                <th>Hash</th>
                <th>Method</th>
                <th>Date</th>
                <th>From</th>
                <th>To</th>
                <th>Amount</th>
                <th>Fee</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((item) => (
                <tr key={item._id}>
                  <td className="max-w-[200px] truncate" title={item.hash}>
                    {item.hash}
                  </td>
                  <td className="max-w-[200px] truncate">{item.method}</td>
                  <td className="max-w-[200px] truncate">
                    {convertDate(item.date)}
                  </td>
                  <td className="max-w-[200px] truncate"> {item.from}</td>
                  <td className="max-w-[200px] truncate"> {item.to}</td>

                  <td className="max-w-[200px] truncate group">
                    {/* Editing Amount Logic */}
                    {editingId !== item._id ? (
                      <div className="truncate flex items-center justify-between gap-2">
                        <span>${item.amount.toLocaleString()}</span>
                        <button
                          onClick={() => {
                            setEditingId(item._id);
                            setEditedAmount(item.amount);
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        >
                          <Pencil className="size-3" />
                        </button>
                      </div>
                    ) : (
                      <form
                        onSubmit={handleSubmit}
                        className="flex items-center justify-between w-full"
                      >
                        <div className="relative ">
                          <input
                            type="text"
                            value={editedAmount}
                            onChange={(e) => setEditedAmount(e.target.value)}
                            className="input input-xs md:input-md "
                          />
                          <div className="absolute right-1 top-1/2 -translate-y-1/2 flex gap-1">
                            <button
                              type="button"
                              onClick={() => setEditingId(null)}
                            >
                              <X className="text-red-500 size-4 cursor-pointer" />
                            </button>
                            <button type="submit">
                              <Check className="text-green-500 size-4 cursor-pointer" />
                            </button>
                          </div>
                        </div>
                      </form>
                    )}
                  </td>
                  <td className="max-w-[200px] truncate">
                    {" "}
                    ${+item.fee.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
