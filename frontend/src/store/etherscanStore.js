import axios from "axios";
import { create } from "zustand";
const apiKey = import.meta.env.VITE_ETHERSCAN_KEY;

export const etherscanStore = create((set) => ({
  ethUsdLastPrice: null,
  ethBtcLastPrice: null,
  isPriceLoading: false,

  getEthLastPrice: async () => {
    set({ isPriceLoading: true });
    try {
      const response = await axios.get(
        `https://api.etherscan.io/v2/api?chainid=1&module=stats&action=ethprice&apikey=${apiKey}`
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
