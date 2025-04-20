import { ListFilter } from "lucide-react";
import { useState } from "react";
import { transactionStore } from "../store/transactionStore";
import toast from "react-hot-toast";

const Filter = () => {
  const [inputFields, setInputFields] = useState({
    from: "",
    to: "",
    min: "",
    max: "",
  });

  const { getTransactions } = transactionStore();

  const handleFilterSubmit = (e) => {
    e.preventDefault();

    if (new Date(inputFields.from) >= new Date(inputFields.to)) {
      return toast.error("Please select valid dates");
    }
    if (inputFields.min > inputFields.max) {
      return toast.error("Please select valid amount filtering");
    }

    if (
      !inputFields.from &&
      !inputFields.to &&
      !inputFields.min &&
      !inputFields.max
    ) {
      return toast.error("Please select atleast one filtering");
    }
    getTransactions(inputFields);
  };

  return (
    <form onSubmit={handleFilterSubmit}>
      <div className="collapse bg-base-200 border-base-300 border">
        <input type="checkbox" />
        <div className="collapse-title font-semibold flex justify-between">
          <span>Filter Transactions</span> <ListFilter />
        </div>
        <div className="collapse-content text-sm flex flex-col gap-2">
          <label className="form-control ">
            <span className="label-text">From</span>
            <input
              value={inputFields.from}
              onChange={(e) =>
                setInputFields({ ...inputFields, from: e.target.value })
              }
              id="from-date"
              type="date"
              className="input input-sm w-full"
            />
          </label>

          <label className="form-control ">
            <span className="label-text">To</span>
            <input
              value={inputFields.to}
              onChange={(e) =>
                setInputFields({ ...inputFields, to: e.target.value })
              }
              id="to-date"
              type="date"
              className="input input-sm w-full"
            />
          </label>

          <label className="form-control ">
            <span className="label-text">Min Amount</span>
            <input
              value={inputFields.min}
              onChange={(e) =>
                setInputFields({ ...inputFields, min: +e.target.value })
              }
              id="min-amount"
              type="number"
              className="input input-sm w-full"
            />
          </label>

          <label className="form-control ">
            <span className="label-text">Max Amount</span>
            <input
              value={inputFields.max}
              onChange={(e) =>
                setInputFields({ ...inputFields, max: +e.target.value })
              }
              id="max-amount"
              type="number"
              className="input input-sm w-full"
            />
          </label>
          <button className="btn btn-active btn-primary w-[120px] ">
            Apply Filters
          </button>
        </div>
      </div>
    </form>
  );
};

export default Filter;
