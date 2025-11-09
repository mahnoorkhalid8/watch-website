"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import bcrypt from "bcryptjs";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [name, setName] = useState("");
    const router = useRouter();

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const exists = users.find((u: any) => u.email===email);
        if (exists){
            alert("User exists, please login");
            return;
        }
            
        const hashed = bcrypt.hashSync(password, 8);
        users.push({ email, password: hashed });
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("auth", JSON.stringify({ email }));
        router.push("/");
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100">
            <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
            <form onSubmit={handleSignup} className="flex flex-col gap-3 w-80">
                {/* <input className="p-2 border rounded" placeholder="Name" onChange={(e) => setName(e.target.value)} /> */}
                <input value={email} className="w-full p-2 border rounded" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input value={password} className="w-full  p-2 border rounded" placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="bg-slate-900 text-white w-full p-2 rounded">Sign Up</button>
            </form>
        </div>
    );
}