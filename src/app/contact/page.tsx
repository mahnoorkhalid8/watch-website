"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState<string[]>(() => {
        try {
            return JSON.parse(localStorage.getItem("comments") || "[]");
        }
        catch {
            return [];
        }
    });

    const submit = (e: any) => {
        e.preventDefault();

        if (!comment.trim())
            return;

        const updated = [...comments, comment.trim()];
        setComments(updated);

        localStorage.setItem("comments", JSON.stringify(updated));
        setComment("");
    }

    return(
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-2xl font-bold">Contact Us</h1>
            <p className="mt-2">
                Email:{" "}
                <a 
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=mahnoorkhalid814@gmail.com"
                    target="_blank"
                    className="text-blue-400 hover:underline"
                >
                    mahnoorkhalid814@gmail.com
                </a>
                | Phone:{" "}
                <a
                    href="tel:+923332455342"
                    target="_blank"
                    className="text-blue-400 hover:underline"
                >
                    +92 33 2455342
                </a>
            </p>

            <form onSubmit={submit} className="mt-6">
                <textarea
                    value={comment}
                    onChange={(e)=> setComment(e.target.value)}
                    placeholder="Write a comment"
                    className="w-full p-3 border rounded h-28"
                />
                <button className="mt-3 px-4 py-2 bg-slate-900 text-white rounded">Submit</button>
            </form>

            <div className="mt-6">
                <h3 className="font-semibold">Comments</h3>
                <ul className="mt-2 space-y-2">
                    {comments.map((c, i) => <li key={i} className="p-3 bg-white rounded border">{c}</li>)}
                </ul>
            </div>
        </div>
    );
}
