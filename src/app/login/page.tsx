"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";

export default function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find((u: any) => u.email===email);

        if (!user){
            alert("User not foun, sign up first");
            return;
        }

        const match = bcrypt.compareSync(password, user.password);
        if (!match){
            alert("Incorrect password!");
            return;
        }

        localStorage.setItem("auth", JSON.stringify({ email }));
        router.push("/");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100">
            <h1 className="text-3xl font-bold mb-4">Login</h1>
            <form onSubmit={handleLogin} className="flex flex-col gap-3 w-80">
                <input value={email} className="p-2 border rounded" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input value={password} className="p-2 border rounded" placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="bg-slate-800 text-white p-2 rounded">Login</button>
                <p className="text-center">
                    Don't have an account? <a href="/signup" className="text-blue-600 underline">Sign Up</a>
                </p>
            </form>
        </div>
    );
}