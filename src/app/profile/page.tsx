"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      toast(error.message, {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#14191d",
          color: "#fff",
        },
      });
      console.log(error.message);
    }
  };
  const getUserData = async () => {
    const res = await axios.get("/api/users/me");
    setUser(res.data.user);
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full">
      <h1>hey {user?.username}</h1>
      <button
        onClick={logout}
        className="bg-emerald-600 p-2 rounded-lg text-white"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
