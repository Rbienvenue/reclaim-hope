"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About us" },
    { href: "/programs", label: "Programs" },
    { href: "/GetInvolved", label: "Get involved" },
    { href: "/impact", label: "Impact" },
    { href: "/sponsor", label: "Sponsor" },
    { href: "/shop", label: "Shop" },
    { href: "/newsletter", label: "Newsletter" },
    { href: "/contact", label: "Contact us" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (!pathname) return false;
        if (href === "/") {
            return pathname === "/";
        }
        return pathname === href || pathname.startsWith(href + "/");
    };

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
                    {navItems.map((item) => {
                        const active = isActive(item.href);
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`transition ${active ? "text-orange-600 font-semibold" : "hover:text-orange-500"}`}
                                    aria-current={active ? "page" : undefined}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}

                    {/* CTA Button */}
                    <li>
                        <Link
                            href="/donate"
                            className="bg-orange-600 text-white px-8 py-4 rounded hover:bg-orange-500 transition"
                        >
                            Donate
                        </Link>
                    </li>
                </ul>
                <button className="md:hidden text-black"
                    onClick={() => setOpen(!open)}
                >
                    ☰
                </button>
            </nav>

            {/* mobile menu */}
            {open && (
                <ul className="md:hidden mt-2 flex flex-col gap-6 px-6 pb-6 text-center text-black">
                    {navItems.map((item) => {
                        const active = isActive(item.href);
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`block transition ${active ? "text-orange-600 font-semibold" : "hover:text-orange-500"}`}
                                    aria-current={active ? "page" : undefined}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}
                    <li>
                        <Link href="/donate" className="bg-orange-600 text-white px-5 py-2 rounded inline-block">
                            Donate
                        </Link>
                    </li>
                </ul>
            )}

        </div>
    );
}