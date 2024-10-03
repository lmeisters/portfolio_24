"use client";
import React, { useState } from "react";
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
import Link from "next/link";

export const FloatingNavbar = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [emailCopied, setEmailCopied] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        if (isDarkMode) {
            document.body.classList.remove("dark-mode");
        } else {
            document.body.classList.add("dark-mode");
        }
    };

    const handleCopyEmail = () => {
        navigator.clipboard.writeText("your-email@example.com").then(() => {
            setEmailCopied(true);
            setTimeout(() => setEmailCopied(false), 2000);
        });
    };

    return (
        <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg px-6 pt-3 pb-2">
            <ul className="flex space-x-6 align-baseline">
                <li>
                    <Link
                        href="/"
                        className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-black transition-colors duration-300"
                    >
                        <div className="transition-transform transform duration-300 hover:scale-110">
                            <House size={20} />
                        </div>
                    </Link>
                </li>
                <li>
                    <Link
                        href="/#projects"
                        className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-black transition-colors duration-300"
                    >
                        <div className="transition-transform transform duration-300 hover:scale-110">
                            <Briefcase size={20} />
                        </div>
                    </Link>
                </li>
                <li>
                    <Link
                        href="/about"
                        className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-black transition-colors duration-300"
                    >
                        <div className="transition-transform transform duration-300 hover:scale-110">
                            <User size={20} />
                        </div>
                    </Link>
                </li>
                <li>
                    <a
                        href="#resume"
                        className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-black transition-colors duration-300"
                    >
                        <div className="transition-transform transform duration-300 hover:scale-110">
                            <FileText size={20} />
                        </div>
                    </a>
                </li>
                <li className="flex flex-col items-center">
                    <button
                        onClick={handleCopyEmail}
                        className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-black transition-colors duration-300"
                    >
                        <div className="transition-transform transform duration-300 hover:scale-110">
                            {emailCopied ? (
                                <Check size={20} />
                            ) : (
                                <Mail size={20} />
                            )}
                        </div>
                    </button>
                </li>
                <li>
                    <button
                        onClick={toggleDarkMode}
                        className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-black transition-colors duration-300"
                    >
                        <div className="transition-transform transform duration-300 hover:scale-110">
                            {isDarkMode ? (
                                <Moon size={20} />
                            ) : (
                                <Sun size={20} />
                            )}
                        </div>
                    </button>
                </li>
            </ul>
        </nav>
    );
};
