"use client"
import { useState } from "react";

export default function Navbar() {

    const [open, setOpen] = useState(false);
    return (
        <div className="w-full bg-white md:flex items-center justify-between px-10 py-4 shadow-sm">
            <nav className="flex justify-between w-full" >

                {/* Logo */}

                <a href="/">
                    <img
                        src="/logo.png"
                        alt="Reclaim hope logo"
                        className="h-12 w-auto"
                    />
                </a>

                {/* Navigation */}
                <ul className="hidden md:flex gap-8 text-black items-center">
                    <li><a href="/" className="hover:text-orange-500">Home</a></li>
                    <li><a href="/about" className="hover:text-orange-500">About us</a></li>
                    <li><a href="/programs" className="hover:text-orange-500">Programs</a></li>
                    <li><a href="/GetInvolved" className="hover:text-orange-500">Get involved</a></li>
                    <li><a href="/impact" className="hover:text-orange-500">Impact</a></li>
                    <li><a href="/newsletter" className="hover:text-orange-500">Newsletter</a></li>
                    <li><a href="/contact" className="hover:text-orange-500">Contact us</a></li>

                    {/* CTA Button */}
                    <li>
                        <a
                            href="/donate"
                            className="bg-orange-600 text-white px-8 py-4 rounded hover:bg-orange-500 transition"
                        >
                            Donate
                        </a>
                    </li>
                </ul>
                <button className="md:hidden text-black"
                    onClick={() => setOpen(!open)}
                >
                    ☰
                </button>
            </nav>

            {/* mobile menu */}
            {
                open && (
                    <ul className="md:hidden mt-2 flex flex-col gap-6 px-6 pb-6 text-center text-black">
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About us</a></li>
                        <li><a href="/programs">Programs</a></li>
                        <li><a href="/GetInvolved">Get involved</a></li>
                        <li><a href="/impact">Impact</a></li>
                        <li><a href="/newsletter">Newsletter</a></li>
                        <li><a href="/contact">Contact us</a></li>
                        <li>
                            <a href="/donate" className="bg-orange-600 text-white px-5 py-2 rounded inline-block">
                                Donate
                            </a>
                        </li>
                    </ul>
                )
            }

        </div>
    );
}