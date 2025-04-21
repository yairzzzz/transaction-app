import { X } from "lucide-react";
import { useState } from "react";
import EthData from "./EthData";
import { transactionStore } from "../store/transactionStore";

const TransactionsNotFound = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [inputValues, setInputValues] = useState({
    count: 0,
    method: "",
  });

  const { generateDummyTransactions } = transactionStore();

  const handleSubmit = () => {
    generateDummyTransactions(inputValues);
  };

  return (
    <div>
      <div className="h-screen flex items-center justify-center">
        <section className=" flex flex-col w-[100%] md:w-[70%] h-[90%] bg-base-200 rounded-2xl shadow-2xl overflow-hidden">
          <EthData />

          {/* No Transactions content */}

          <div className="h-full flex items-center justify-start flex-col text-center">
            <h1 className="text-xl sm:text-4xl font-bold text-primary ">
              No Transactions Yet
            </h1>{" "}
            <br /> <br />
            <p className="text-base-content text-xs sm:text-lg mb-5">
              It looks like your Ethereum transaction history is currently
              empty. Start exploring the blockchain by adding sample
              transactions to your account. <br />
              <br />
              <br />
              <span className="text-secondary font-semibold">
                Your data journey begins here.
              </span>
            </p>
            {!isOpen ? (
              <button
                onClick={() => setIsOpen(true)}
                className="btn btn-primary btn-wide mt-4"
              >
                Generate Dummy Transactions
              </button>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer"
                >
                  <X className=" size-10 text-red-500" />{" "}
                </button>
                <form onSubmit={handleSubmit}>
                  <fieldset className="fieldset p-4 w-65 sm:w-82">
                    <legend className="fieldset-legend">
                      Generate Dummy Transactions
                    </legend>

                    <label htmlFor="transactionCount" className="label">
                      How many?
                    </label>
                    <input
                      id="transactionCount"
                      type="number"
                      className="input"
                      placeholder="Max 1,000"
                      max={1000}
                      value={inputValues.count}
                      onChange={(e) =>
                        setInputValues({
                          ...inputValues,
                          count: e.target.value,
                        })
                      }
                    />

                    <label htmlFor="methodType" className="label">
                      Which method?
                    </label>
                    <input
                      id="methodType"
                      type="text"
                      className="input"
                      placeholder="transfer/call, etc..."
                      value={inputValues.method}
                      onChange={(e) =>
                        setInputValues({
                          ...inputValues,
                          method: e.target.value,
                        })
                      }
                    />
                  </fieldset>
                  <button className="btn btn-primary sm:btn-md" type="submit">
                    Generate
                  </button>
                </form>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TransactionsNotFound;
