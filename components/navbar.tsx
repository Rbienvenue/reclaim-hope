"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About us" },
    { href: "/programs", label: "Programs" },
    { href: "/GetInvolved", label: "Get involved" },
    { href: "/impact", label: "Impact" },
    { href: "/sponsor", label: "Sponsor" },
    { href: "/shop", label: "Shop" },
    { href: "/media-center", label: "Media center" },
    { href: "/contact", label: "Contact us" },
];

const mediaCenterItems = [
    { href: "/testimonials", label: "Testimonials" },
    { href: "/newsletter", label: "Newsletters" },
    { href: "/blog", label: "Blog" },
    { href: "/gallery", label: "Gallery" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [mediaOpen, setMediaOpen] = useState(false);
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

                        if (item.href === "/media-center") {
                            return (
                                <li
                                    key={item.href}
                                    className="relative z-50"
                                    onMouseEnter={() => setMediaOpen(true)}
                                    onMouseLeave={() => setMediaOpen(false)}
                                >
                                    <button
                                        type="button"
                                        className={`transition inline-flex items-center gap-1 ${active ? "text-yellow-600 font-semibold" : "hover:text-yellow-500"}`}
                                        aria-expanded={mediaOpen}
                                        onClick={() => setMediaOpen((prev) => !prev)}
                                    >
                                        {item.label}
                                        <ChevronDown className={`w-4 h-4 transition-transform ${mediaOpen ? "rotate-180" : ""}`} />
                                    </button>

                                    {mediaOpen && (
                                        <div className="absolute right-0 top-full w-56 rounded-3xl border border-gray-200 bg-white shadow-2xl py-3 z-50">
                                            {mediaCenterItems.map((subItem) => (
                                                <Link
                                                    key={subItem.href}
                                                    href={subItem.href}
                                                    className="block px-5 py-3 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition"
                                                >
                                                    {subItem.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </li>
                            );
                        }

                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`transition ${active ? "text-yellow-600 font-semibold" : "hover:text-yellow-500"}`}
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
                            className="bg-yellow-600 text-white px-8 py-4 rounded hover:bg-yellow-500 transition"
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
                        if (item.href === "/media-center") {
                            return (
                                <li key={item.href} className="space-y-2">
                                    <div
                                        className={`block transition ${active ? "text-yellow-600 font-semibold" : "hover:text-yellow-500"}`}
                                    >
                                        {item.label}
                                    </div>
                                    <div className="space-y-1 px-4">
                                        {mediaCenterItems.map((subItem) => (
                                            <Link
                                                key={subItem.href}
                                                href={subItem.href}
                                                className="block rounded-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                                            >
                                                {subItem.label}
                                            </Link>
                                        ))}
                                    </div>
                                </li>
                            );
                        }

                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`block transition ${active ? "text-yellow-600 font-semibold" : "hover:text-yellow-500"}`}
                                    aria-current={active ? "page" : undefined}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}
                    <li>
                        <Link href="/donate" className="bg-yellow-600 text-white px-5 py-2 rounded inline-block">
                            Donate
                        </Link>
                    </li>
                </ul>
            )}

        </div>
    );
}