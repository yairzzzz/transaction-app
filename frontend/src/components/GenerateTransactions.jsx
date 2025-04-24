import { X, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { transactionStore } from "../store/transactionStore";
import { useNavigate } from "react-router-dom";

const GenerateTransactions = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValues, setInputValues] = useState({
    count: 0,
    method: "",
  });

  const { generateDummyTransactions, isGeneratingDummyTransactions } =
    transactionStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await generateDummyTransactions(inputValues);
    navigate("/");
  };

  return (
    <div>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-primary btn-wide mt-4"
        >
          Generate Dummy Transactions
        </button>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <button onClick={() => setIsOpen(false)} className="cursor-pointer">
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
              {isGeneratingDummyTransactions ? (
                <LoaderCircle className="animate-spin size-4" />
              ) : (
                "Generate"
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default GenerateTransactions;
