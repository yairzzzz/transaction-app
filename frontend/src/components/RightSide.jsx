import { Bitcoin } from "lucide-react";

const RightSide = () => {
  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center px-10 overflow-hidden bg-base-200">
      {/* Fullscreen icon layer */}

      {/* Text content */}
      <div className="z-10 text-center max-w-md">
        <h2 className="text-3xl font-bold text-primary mb-4">
          Welcome to Etherscan
        </h2>
        <p className="text-base-content text-lg">
          Browse and search Ethereum transactions with ease.
          <br />
          <span className="text-base-content/70">
            Etherscan helps you track activity on the blockchain — fast,
            reliable, and developer-friendly.
          </span>
        </p>
      </div>
    </div>
  );
};

export default RightSide;
