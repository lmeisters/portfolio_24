"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    House,
    Briefcase,
    User,
    FileText,
    Mail,
    Sun,
    Moon,
    Check,
} from "lucide-react";
import { useCopyEmail } from "@/app/hooks/useCopyEmail";
import { EMAIL, RESUME_URL } from "@/app/data/site";

const itemClasses =
    "inline-flex h-11 w-11 items-center justify-center rounded-full text-gray-600 transition-colors duration-300 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current dark:text-neutral-400 dark:hover:text-white sm:h-9 sm:w-9 [&>svg]:transition-transform [&>svg]:duration-300 hover:[&>svg]:scale-110";
const iconClasses = "h-7 w-7 sm:h-6 sm:w-6";

const pages = [
    { href: "/", label: "Home", Icon: House },
    { href: "/pages/works", label: "Works", Icon: Briefcase },
    { href: "/pages/about", label: "About", Icon: User },
];

function readTheme() {
    return document.documentElement.classList.contains("dark");
}

export function FloatingNavbar() {
    const pathname = usePathname();
    const { copied, copyEmail } = useCopyEmail(EMAIL);
    // Only used for aria-pressed; the icon itself is switched with CSS so it
    // is right on the very first paint.
    const [dark, setDark] = useState(false);

    useEffect(() => {
        setDark(readTheme());
    }, []);

    const toggleTheme = () => {
        const next = !readTheme();
        document.documentElement.classList.toggle("dark", next);
        try {
            localStorage.setItem("theme", next ? "dark" : "light");
        } catch {
            // Storage unavailable (private mode); the choice just won't persist.
        }
        setDark(next);
    };

    return (
        <nav
            aria-label="Primary"
            className="fixed bottom-14 left-1/2 z-40 -translate-x-1/2 rounded-full md:bottom-8 bg-white px-3 py-1 shadow-lg ring-1 ring-black/5 dark:bg-neutral-900 dark:ring-white/10 sm:px-4 sm:py-2"
        >
            <ul className="flex items-center gap-1 sm:gap-2">
                {pages.map(({ href, label, Icon }) => (
                    <li key={href}>
                        <Link
                            href={href}
                            className={itemClasses}
                            aria-label={label}
                            aria-current={pathname === href ? "page" : undefined}
                        >
                            <Icon aria-hidden="true" className={iconClasses} />
                        </Link>
                    </li>
                ))}
                <li>
                    <a
                        href={RESUME_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={itemClasses}
                        aria-label="Resume (opens in a new tab)"
                    >
                        <FileText aria-hidden="true" className={iconClasses} />
                    </a>
                </li>
                <li>
                    <button
                        type="button"
                        onClick={() => copyEmail()}
                        className={itemClasses}
                        aria-label="Copy email address"
                    >
                        {copied ? (
                            <Check aria-hidden="true" className={iconClasses} />
                        ) : (
                            <Mail aria-hidden="true" className={iconClasses} />
                        )}
                        <span role="status" className="sr-only">
                            {copied ? "Email address copied to clipboard" : ""}
                        </span>
                    </button>
                </li>
                <li>
                    <button
                        type="button"
                        onClick={toggleTheme}
                        className={itemClasses}
                        aria-label="Dark mode"
                        aria-pressed={dark}
                    >
                        <Sun aria-hidden="true" className={`${iconClasses} dark:hidden`} />
                        <Moon aria-hidden="true" className={`${iconClasses} hidden dark:block`} />
                    </button>
                </li>
            </ul>
        </nav>
    );
}
