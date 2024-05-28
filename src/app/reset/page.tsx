"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ForgotPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const router = useRouter();
  const onReset = async (e: any) => {
    e.preventDefault();
    if (password.length > 0 && token.length > 0) {
      setLoading(true);
      const res = await axios.put("/api/users/reset", { token, password });
      toast(res.data.message, {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#14191d",
          color: "#fff",
        },
      });
      setLoading(false);

      router.push("/login");
    } else {
      setLoading(false);

      toast("Something went wrong", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#14191d",
          color: "#fff",
        },
      });
    }
  };

  useEffect(() => {
    const foundToken = window.location.search.split("=")[1];
    setToken(foundToken);
  }, []);
  return (
    <>
      <div className="font-sans bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <form className="bg-backgroundUpper px-6 py-8 rounded shadow-md text-white w-full">
            <h1 className="mb-8 text-2xl text-center font-bold">
              Please enter your new password
            </h1>

            <input
              type="password"
              className="block bg-background border-emerald-600 border-2 focus:outline-none  w-full p-2 text-[1rem] rounded-lg mb-4"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Your Password"
            />

            <button
              type="submit"
              onClick={onReset}
              className="w-full text-center py-2.5 rounded-lg bg-emerald-600 text-white hover:bg-green-dark focus:outline-none my-1 disabled:bg-emerald-700 disabled:cursor-not-allowed"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
