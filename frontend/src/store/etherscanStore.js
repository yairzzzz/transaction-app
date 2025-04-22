import axios from "axios";
import { create } from "zustand";

export const etherscanStore = create((set) => ({
  ethUsdLastPrice: null,
  ethBtcLastPrice: null,
  isPriceLoading: false,

  getEthLastPrice: async () => {
    set({ isPriceLoading: true });
    try {
      const response = await axios.get(
        "https://api.etherscan.io/v2/api?chainid=1&module=stats&action=ethprice&apikey=89QW4ZJAHA9PAQ2Y97C96GFA9UHT9YITWH"
      );

      set({ ethUsdLastPrice: response.data.result.ethusd });
      set({ ethBtcLastPrice: response.data.result.ethbtc });
    } catch (error) {
      console.log("Failed to fetch eth data", error.message);
    } finally {
      set({ isPriceLoading: false });
    }
  },
}));
