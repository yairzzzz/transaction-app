import EthData from "./EthData";
import GenerateTransactions from "./GenerateTransactions";

const TransactionsNotFound = () => {
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
            <GenerateTransactions />
          </div>
        </section>
      </div>
    </div>
  );
};

export default TransactionsNotFound;
