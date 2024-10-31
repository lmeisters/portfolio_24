"use client";
import React, { useState, useEffect } from "react";
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

    useEffect(() => {
        // Load dark mode preference from localStorage
        const savedDarkMode = localStorage.getItem("darkMode") === "true";
        setIsDarkMode(savedDarkMode);
        applyDarkMode(savedDarkMode);
    }, []);

    const toggleDarkMode = () => {
        const newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);
        localStorage.setItem("darkMode", newDarkMode.toString());
        applyDarkMode(newDarkMode);
    };

    const applyDarkMode = (darkMode: boolean) => {
        if (darkMode) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
    };

    const handleCopyEmail = () => {
        navigator.clipboard.writeText("your-email@example.com").then(() => {
            setEmailCopied(true);
            setTimeout(() => setEmailCopied(false), 2000);
        });
    };

    return (
        <nav className="fixed bottom-14 md:bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg px-4 sm:px-6 py-2 sm:py-3">
            <ul className="flex items-center space-x-5 sm:space-x-6">
                <li>
                    <Link
                        href="/"
                        className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-black transition-colors duration-300"
                    >
                        <div className="transition-transform transform duration-300 hover:scale-110">
                            <House size={28} className="sm:w-6 sm:h-6" />
                        </div>
                    </Link>
                </li>
                <li>
                    <Link
                        href="/#projects"
                        className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-black transition-colors duration-300"
                    >
                        <div className="transition-transform transform duration-300 hover:scale-110">
                            <Briefcase size={28} className="sm:w-6 sm:h-6" />
                        </div>
                    </Link>
                </li>
                <li>
                    <Link
                        href="/pages/about"
                        className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-black transition-colors duration-300"
                    >
                        <div className="transition-transform transform duration-300 hover:scale-110">
                            <User size={28} className="sm:w-6 sm:h-6" />
                        </div>
                    </Link>
                </li>
                <li>
                    <a
                        href="https://drive.google.com/file/d/1_uUxYKSwakk_O9ZBZYH-jw03ZaM2X-gN/view"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-black transition-colors duration-300"
                    >
                        <div className="transition-transform transform duration-300 hover:scale-110">
                            <FileText size={28} className="sm:w-6 sm:h-6" />
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
                                <Check size={28} className="sm:w-6 sm:h-6" />
                            ) : (
                                <Mail size={28} className="sm:w-6 sm:h-6" />
                            )}
                        </div>
                    </button>
                </li>
                <li className="flex items-center justify-center">
                    <button
                        onClick={toggleDarkMode}
                        className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-black transition-colors duration-300 p-1"
                    >
                        <div className="transition-transform transform duration-300 hover:scale-110 flex items-center justify-center">
                            {isDarkMode ? (
                                <Moon size={28} className="sm:w-6 sm:h-6" />
                            ) : (
                                <Sun size={28} className="sm:w-6 sm:h-6" />
                            )}
                        </div>
                    </button>
                </li>
            </ul>
        </nav>
    );
};
