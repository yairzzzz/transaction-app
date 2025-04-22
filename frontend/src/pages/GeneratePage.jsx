import GenerateTransactions from "../components/GenerateTransactions";

const GeneratePage = () => {
  return (
    <div>
      <div className="h-screen flex items-center justify-center">
        <section className=" flex flex-col w-[100%] md:w-[70%] h-[90%] bg-base-200 rounded-2xl shadow-2xl overflow-hidden">
          <div className="h-full flex items-center justify-start flex-col text-center">
            <h1 className="text-xl sm:text-4xl font-bold text-primary mt-40">
              Generate Dummy Transactions
            </h1>{" "}
            <br /> <br />
            <p className="text-base-content text-xs sm:text-lg mb-5">
              Quickly generate additional sample transactions to test filters,
              pagination, or bulk data handling. <br />
              <br />
              <br />
              <span className="text-secondary font-semibold"></span>
            </p>
            <GenerateTransactions />
          </div>
        </section>
      </div>
    </div>
  );
};

export default GeneratePage;
