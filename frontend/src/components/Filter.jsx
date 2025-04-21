import { ListFilter } from "lucide-react";

import { transactionStore } from "../store/transactionStore";
import toast from "react-hot-toast";

const Filter = () => {
  const { getTransactions, filterQuery, setFilterQuery } = transactionStore();

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    transactionStore.getState().filterQuery;
    if (new Date(filterQuery.from) >= new Date(filterQuery.to)) {
      return toast.error("Please select valid dates");
    }
    if (filterQuery.min > filterQuery.max) {
      return toast.error("Please select valid amount filtering");
    }

    if (
      !filterQuery.from &&
      !filterQuery.to &&
      !filterQuery.min &&
      !filterQuery.max
    ) {
      return toast.error("Please select atleast one filtering");
    }
    getTransactions(filterQuery);
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
              value={filterQuery.from}
              onChange={(e) => setFilterQuery({ from: e.target.value })}
              id="from-date"
              type="date"
              className="input input-sm w-full"
            />
          </label>

          <label className="form-control ">
            <span className="label-text">To</span>
            <input
              value={filterQuery.to}
              onChange={(e) => setFilterQuery({ to: e.target.value })}
              id="to-date"
              type="date"
              className="input input-sm w-full"
            />
          </label>

          <label className="form-control ">
            <span className="label-text">Min Amount</span>
            <input
              value={filterQuery.min}
              onChange={(e) => setFilterQuery({ min: +e.target.value })}
              id="min-amount"
              type="number"
              className="input input-sm w-full"
            />
          </label>

          <label className="form-control ">
            <span className="label-text">Max Amount</span>
            <input
              value={filterQuery.max}
              onChange={(e) => setFilterQuery({ max: +e.target.value })}
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
