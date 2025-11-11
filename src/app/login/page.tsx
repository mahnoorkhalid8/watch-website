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

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateFields = (currentEmail: string, currentPassword: string) => {
    let isValid = true;
    let newEmailError = "";
    let newPasswordError = "";

    if (!currentEmail || !validateEmail(currentEmail.trim())) {
      newEmailError = "Please enter a valid email address.";
      isValid = false;
    }

    if (!currentPassword || currentPassword.length < 6) {
      newPasswordError = "Password must be atleast 6 characters long.";
      isValid = false;
    }

    setEmailError(newEmailError);
    setPasswordError(newPasswordError);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setButtonLoading(true);

    if (!validateFields(email, password)) {
      setButtonLoading(false);
      return;
    }

    const storedData = localStorage.getItem("users");

    if (!storedData) {
      toast.error("No user data found.Redirecting to Sign Up...");
      setTimeout(() => router.push("/signup"), 2000);
      setButtonLoading(false);
      return;
    }

    const users: UserData[] = JSON.parse(storedData);
    const user = users.find((u) => u.email === email);

    if (!user) {
      toast.error("User not found. Redirecting to Sign Up...");
      setTimeout(() => router.push("/signup"), 2000);
      setButtonLoading(false);
      return;
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (passwordMatch) {
      toast.success("Successfully signed in!", {
        autoClose: 2000,
        position: "top-center",
      });

      localStorage.setItem("auth", JSON.stringify({ email: user.email }));
      sessionStorage.setItem("isLogin", "true");

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } else {
      toast.error("Invalid password. Please try again.");
      setButtonLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100">
      <h1 className="text-3xl font-bold mb-4">Login</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80">
        <input
          value={email}
          className="p-2 border rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p className="text-red-600 text-sm">{emailError}</p>}

        <input
          value={password}
          className="p-2 border rounded"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && (
          <p className="text-red-600 text-sm">{passwordError}</p>
        )}

        <button
          type="submit"
          className="bg-slate-800 text-white p-2 rounded disabled:opacity-50"
          disabled={buttonLoading}
        >
          {buttonLoading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-blue-600 underline">
            Sign Up
          </a>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};
export default Login;
