import React, { useState } from "react";
import axios from "../hooks/axiosConfig";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import useUserActions from "../hooks/useReduxActions";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useUserActions();
  const handleSuccess = async (credentialResponse) => {
    setLoading(true);
    setError("");
    // console.log(credentialResponse);
    // return;
    try {
      // const response = await axios.post("api/signin", {
      //   email,
      //   password,
      // });
      const res = await axios.post("api/auth/google", {
        token: credentialResponse.credential,
      });
      if (res.data.success) {
        login(res.data.user);
        console.log(res.data.user);
        navigate("/quiz");
      }
      console.log("Login success:", res.data);
      // console.log("Login successful:", response.data);
      // Redirect or store token here
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-r from-white via-[var(--non-photo-blue)] to-white">
      <form
        onSubmit={handleSuccess}
        className="max-sm:w-[90%] max-md:w-3/4 md:w-1/2 border-4 border-[var(--secondary-color)]/50 p-4 rounded-lg bg-white"
      >
        <div className="text-4xl font-bold text-[var(--secondary-color)] text-center">
          quizzify
        </div>
        <div className="mt-2 font-semibold text-center">Welcome,</div>
        <div className="text-sm text-center text-gray-600">
          Please enter your details to sign in.
        </div>

        {/* Email */}
        <div className="my-2">
          <label className="block font-bold">E-Mail Address</label>
          <div className="w-full p-1 mt-1 border border-gray-300 rounded-xl">
            <input
              placeholder="Enter your email..."
              className="w-full p-1 bg-transparent outline-none rounded-xl"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="my-2 mb-4">
          <label className="block font-bold">Password</label>
          <div className="flex items-center w-full gap-1 p-1 mt-1 border border-gray-300 rounded-xl">
            <input
              className="w-full p-1 bg-transparent outline-none rounded-xl"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div
              className="text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <RiEyeLine className="text-2xl" />
              ) : (
                <RiEyeCloseLine className="text-2xl" />
              )}
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-2 text-sm text-center text-red-600">{error}</div>
        )}

        {/* Sign in button */}
        <div className="flex justify-center w-full my-3 text-center">
          <button
            type="submit"
            disabled={loading}
            className="max-sm:w-full max-md:w-3/4 md:w-1/2 bg-[var(--accent-color)] p-2 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </div>

        {/* OR Divider */}
        <div className="flex items-center justify-center w-full">
          <div className="flex items-center justify-center gap-1 max-sm:w-full max-md:w-3/4 md:w-1/2">
            <div className="flex items-center w-full">
              <div className="w-full border border-gray-300"></div>
            </div>
            <div className="text-gray-600">OR</div>
            <div className="flex items-center w-full">
              <div className="w-full border border-gray-300"></div>
            </div>
          </div>
        </div>

        {/* Sign in with Google */}
        <div className="flex justify-center w-full mt-3">
          <div className="flex items-center justify-center gap-2 p-2 text-black border border-black rounded-lg cursor-pointer max-sm:w-full max-md:w-3/4 md:w-1/2">
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={() => console.log("Login Failed")}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
