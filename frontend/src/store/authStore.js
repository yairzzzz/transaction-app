import { authInstance } from "../lib/axios";
import { create } from "zustand";
import toast from "react-hot-toast";

export const authStore = create((set) => ({
  authUser: null,
  isRegistering: false,
  isLoggingIn: false,
  isCheckingAuth: true,
  checkAuth: async () => {
    try {
      const res = await authInstance("checkAuth");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuth", error.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  register: async (data) => {
    set({ isRegistering: true });

    try {
      const res = await authInstance.post("register", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isRegistering: false });
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await authInstance.post("login", data);
      set({ authUser: res.data });

      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await authInstance.post("logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  },
}));
