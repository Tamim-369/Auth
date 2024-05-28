"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
const SignUpPage = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const onSignUp = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      if (response.data.error) {
        toast(response.data.error, {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#14191d",
            color: "#fff",
          },
        });
      } else {
        toast(
          "We have send a verification link in your email address Please click and verify",
          {
            icon: "👏",
            style: {
              borderRadius: "10px",
              background: "#14191d",
              color: "#fff",
            },
          }
        );
        console.log(response.data);

        router.push("/login");
      }
    } catch (error: any) {
      toast(error.message, {
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

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
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
            {loading ? "signing up..." : "Sign up"}
          </h1>
          <input
            type="text"
            className="block bg-background border-emerald-600 border-2 focus:outline-none  w-full p-3 text-[1rem] rounded-lg mb-4"
            name="username"
            value={user.username}
            onChange={(e) => {
              setUser({ ...user, username: e.target.value });
            }}
            placeholder="Your Name"
          />
          <input
            type="email"
            className="block bg-background border-emerald-600 border-2 focus:outline-none  w-full p-3 text-[1rem] rounded-lg mb-4"
            name="email"
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
            placeholder="Your Email"
          />
          <input
            type="password"
            className="block bg-background border-emerald-600 border-2 focus:outline-none  w-full p-3 text-[1rem] rounded-lg mb-4"
            name="password"
            value={user.password}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
            placeholder="Your New Password"
          />
          <button
            type="submit"
            onClick={onSignUp}
            className={
              "w-full text-center py-3 rounded-lg bg-emerald-600 text-white hover:bg-green-dark focus:outline-none my-1 disabled:bg-emerald-700 disabled:cursor-not-allowed"
            }
            disabled={disabled}
          >
            Sign Up
          </button>
        </form>
        <div className="text-grey-dark mt-6">
          Already have an account?
          <Link
            className="no-underline border-b-2 border-emerald-600 text-blue"
            href="/login"
          >
            Log in
          </Link>
          .
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
