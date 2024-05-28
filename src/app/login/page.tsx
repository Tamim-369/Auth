"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
const LogInPage = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const onResetStart = async (e: any) => {
    e.preventDefault();
    if (user.email.length > 0) {
      const res = await axios.post("/api/users/reset", { email: user.email });
      toast(res.data.message, {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#14191d",
          color: "#fff",
        },
      });
    } else {
      toast("Please enter your email", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#14191d",
          color: "#fff",
        },
      });
    }
  };
  const onLogIn = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);

      console.log(response.data);
      if (response.data.error) {
        toast(response.data.error, {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#14191d",
            color: "#fff",
          },
        });
        return;
      }
      localStorage.setItem("token", response.data.token);
      router.push("/profile");
    } catch (error: any) {
      toast("User not found", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#14191d",
          color: "#fff",
        },
      });
    } finally {
      setLoading(false);
    }
  };
  const router = useRouter();
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [user]);

  return (
    <div className="font-sans bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <form className="bg-backgroundUpper px-6 py-8 rounded shadow-md text-white w-full">
          <h1 className="mb-8 text-2xl text-center font-bold">
            {loading ? "Logging In" : "Log In"}
          </h1>

          <input
            type="email"
            className="block bg-background border-emerald-600 border-2 focus:outline-none  w-full p-2 text-[1rem] rounded-lg mb-4"
            name="email"
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
            placeholder="Your email"
          />
          <input
            type="password"
            className="block bg-background border-emerald-600 border-2 focus:outline-none  w-full p-2 text-[1rem] rounded-lg mb-4"
            name="password"
            value={user.password}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
            placeholder="Your Password"
          />

          <button
            type="submit"
            onClick={onLogIn}
            className="w-full text-center py-2.5 rounded-lg bg-emerald-600 text-white hover:bg-green-dark focus:outline-none my-1 disabled:bg-emerald-700 disabled:cursor-not-allowed"
            disabled={disabled}
          >
            Log In
          </button>
        </form>
        <div className="text-grey-dark text-sm mt-6 flex flex-wrap gap-1">
          <span>Already have an account? </span>
          <Link
            className="no-underline border-b-2 border-emerald-600 text-blue"
            href="/signup"
          >
            Sign Up
          </Link>
          <div className="text-grey-dark  ">
            <span> or </span>
            <button
              className="no-underline border-b-2 border-emerald-600 text-blue"
              onClick={onResetStart}
            >
              {" "}
              Forgot password
            </button>
            .
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
