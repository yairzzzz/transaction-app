import eth from "../images/ethereum.png";
import { Mail, LockKeyhole, LoaderCircle, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { authStore } from "../store/authStore";
import RightSide from "../components/RightSide";

function LoginPage() {
  const { isLoggingIn, login } = authStore();
  const [showPassword, setShowPassword] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userDetails.email || !userDetails.password) {
      return toast.error("All fields are required!");
    }
    if (userDetails.password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userDetails.email)) {
      return toast.error("Invalid email format");
    }

    login(userDetails);
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="block lg:hidden absolute inset-0 z-0 pointer-events-none overflow-hidden"></div>
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 ">
        {/* BTC icon */}
        <img src={eth} alt="Etherum Logo" className="size-18 animate-bounce" />

        <div className="text-center max-w-xl mt-10 mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-5">
            Welcome Back to Etherscan
          </h1>
          <p className="text-base-content text-lg mb-5">
            Log in to explore Ethereum transactions, manage your history, and
            access detailed blockchain data. <br />
            <span className="text-secondary font-semibold">
              Your journey through the blockchain continues here.
            </span>
          </p>
        </div>

        {/* inputs */}
        <form onSubmit={handleSubmit} className="space-y-6 w-[55%]">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium mb-2">Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <Mail className="size-5 text-base-content/40" />
              </div>
              <input
                type="text"
                className={`input input-bordered w-full pl-10`}
                placeholder="you@example.com"
                value={userDetails.email}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, email: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium mb-2">Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <LockKeyhole className="size-5 text-base-content/40" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className={`input input-bordered w-full pl-10`}
                placeholder="••••••••"
                value={userDetails.password}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, password: e.target.value })
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className=" size-4 cursor-pointer" />
                ) : (
                  <Eye className=" size-4 cursor-pointer" />
                )}
              </button>
            </div>
          </div>
          {isLoggingIn ? (
            <button className="btn btn-primary w-full">
              <LoaderCircle className="animate-spin" />{" "}
            </button>
          ) : (
            <button className="btn btn-primary w-full">Sign in</button>
          )}
        </form>
        <div className="text-center">
          <p className="text-base-content/60">
            Don't have an account?{" "}
            <Link to="/register" className="link link-primary">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* right side */}
      <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
        <RightSide />
      </div>
    </div>
  );
}

export default LoginPage;
