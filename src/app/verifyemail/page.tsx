"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import React from "react";

const VerifyEmailPage = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const verifyUserEmail = async () => {
    try {
      if (token.length > 0) {
        await axios.post("/api/users/verifyEmail", { token });
        setVerified(true);
      } else {
        setError(true);
      }
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
  }, []);
  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);
  useEffect(() => {
    if (verified) {
      router.push("/login");
    }
  }, [verified]);
  return (
    <div className="min-h-screen w-full bg-background flex flex-col justify-center items-center">
      <h1 className="text-3xl">Verify Email</h1>{" "}
      <h2 className="text-xl p-2">{token ? "" : "no token"}</h2>
      {verified && (
        <div>
          {/* <h2 className="text-2xl">Email Verified</h2>
          <Link href={"/login"}>Click to login</Link> */}
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl">Something went wrong!</h2>
        </div>
      )}
    </div>
  );
};

export default VerifyEmailPage;
