import { Rotate3d, Globe, LoaderCircle } from "lucide-react";
import eth from "../images/ethereum.png";
import { etherscanStore } from "../store/etherscanStore";
import { useEffect } from "react";
const EthData = () => {
  const { ethUsdLastPrice, ethBtcLastPrice, getEthLastPrice, isPriceLoading } =
    etherscanStore();

  useEffect(() => {
    getEthLastPrice();
  }, [ethUsdLastPrice, ethBtcLastPrice, getEthLastPrice]);
  return (
    <div className="flex flex-col items-start md:flex-row md:justify-between py-5 px-4 mt-4 mb-4 sticky space-y-2 border-b-1 border-base-300 ">
      <div className="flex items-center space-x-2">
        <img src={eth} alt="Etherum Logo" className="size-8" />

        <div className="flex flex-col">
          <span className="text-gray-400">ETHER PRICE</span>

          {isPriceLoading ? (
            <span className="flex justify-center mt-2">
              {" "}
              <LoaderCircle className="size-5 animate-spin" />{" "}
            </span>
          ) : (
            <span className="font-bold">
              ${Number(ethUsdLastPrice).toFixed(2)}
              <span className="text-gray-400 font-normal">
                @ {Number(ethBtcLastPrice).toFixed(7)} BTC
              </span>{" "}
              <span className="text-red-600 font-normal">(-4.8%)</span>
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Globe className="size-8 " />

        <div className="flex flex-col">
          <span className="text-gray-400">MARKET CAP</span>
          {isPriceLoading ? (
            <span className="flex justify-center mt-2">
              {" "}
              <LoaderCircle className="size-5 animate-spin" />{" "}
            </span>
          ) : (
            <span className="font-bold">
              {" "}
              ${Number(ethUsdLastPrice * 120708156).toLocaleString()}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Rotate3d className="size-8 " />

        <div className="flex flex-col">
          <span className="text-gray-400">TRANSACTIONS</span>
          <span className="font-bold"> 2,771.90M</span>
        </div>
      </div>
    </div>
  );
};

export default EthData;
