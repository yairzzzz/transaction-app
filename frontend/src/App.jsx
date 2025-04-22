import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";

import { Routes, Route } from "react-router-dom";
import { themeStore } from "./store/themeStore";
import { Toaster } from "react-hot-toast";
import { authStore } from "./store/authStore";
import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import TransactionsNotFound from "./components/TransactionsNotFound";
import GeneratePage from "./pages/GeneratePage";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = authStore();
  const { theme } = themeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div data-theme={theme}>
        <Navbar />

        <div className="h-screen flex justify-center items-center">
          <LoaderCircle className="size-10 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div data-theme={theme} className="h-screen w-screen">
      <Navbar />

      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <LoginPage />} />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <HomePage />}
        />
        <Route
          path="/register"
          element={!authUser ? <Register /> : <HomePage />}
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/generate" element={<GeneratePage />} />
      </Routes>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
}

export default App;
