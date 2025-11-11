"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UserData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password || !confirmPassword) {
      toast.error("All fields are required!");
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address!");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passowrd do not match!");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be atleast 6 characters long!");
      setLoading(false);
      return;
    }

    const storedData = localStorage.getItem("users");
    const users: UserData[] = storedData ? JSON.parse(storedData) : [];

    const existingUser = users.find((u) => u.email === email.trim());
    if (existingUser) {
      toast.error("User already exists! Please login");
      setLoading(false);
      return;
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = { email: email.trim(), password: hashedPassword };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    toast.success("Account created successfully!", {
      autoClose: 2000,
      position: "top-center",
    });

    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100">
      <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSignup} className="flex flex-col gap-3 w-80">
        <input
          value={email}
          className="w-full p-2 border rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          value={password}
          className="w-full p-2 border rounded"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          value={confirmPassword}
          className="p-2 border rounded"
          placeholder="Confirm Password"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-slate-900 text-white w-full p-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        <p className="text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 underline">
            Login
          </a>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignIn;
