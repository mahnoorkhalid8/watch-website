"use client";

import { Copyright} from "lucide-react";
import Link from "next/link";

export default function Footer(){
    return (
        <footer className="bottom-0 left-0 w-full bg-black text-slate-200 border-t mt-12">
            <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                    <h4 className="text-lg font-bold mb-2">Watch House</h4>
                    <p className="text-sm mt-2">Quality timepiece for every occassion.</p>
                </div>

                <div>
                    <h5 className="font-semibold">Company</h5>
                    <ul className="mt-2 text-sm space-y-2">
                        <li><Link href="/about">About Us</Link></li>
                        <li>Careers</li>
                        <li>Press</li>
                    </ul>
                </div>

                <div>
                    <h5 className="font-semibold">Support</h5>
                    <ul className="mt-2 text-sm space-y-2">
                        <li><Link href="/contact">Contact</Link></li>
                        <li>FAQs</li>
                        <li>Shipping</li>
                    </ul>
                </div>

                <div>
                    <h5 className="font-semibold">Follow</h5>
                    <div className="mt-2 ">
                        <div className="w-8 h-8 g-white rounded flex items-center justify-center">Instagram</div>
                        <div className="w-8 h-8 g-white rounded flex items-center justify-center">Twitter</div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center gap-3 text-center py-4 text-sm text-slate-500 border-t">
                <Copyright />{new Date().getFullYear()} WatchHouse. All rights reserved.
            </div>
        </footer>
    );
}