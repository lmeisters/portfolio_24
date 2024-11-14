import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

// Preload these components with higher priority
const RigaTimeClock = dynamic(() => import("@/app/components/RigaTimeClock"), {
    ssr: false,
    loading: () => (
        <div className="w-32 h-6 bg-gray-200 rounded animate-pulse" />
    ),
});

const CurrentlyEmoji = dynamic(
    () => import("@/app/components/CurrentlyEmoji"),
    {
        ssr: false,
        loading: () => (
            <div className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
        ),
    }
);

const Header = () => (
    <header>
        <div className="flex justify-between items-center mb-8">
            <Link href="/">
                <div className="text-md font-semibold cursor-pointer">LM</div>
            </Link>
            <div className="text-md flex items-center">
                <CurrentlyEmoji />
                <span className="ml-2">
                    <RigaTimeClock />
                </span>
            </div>
        </div>
    </header>
);

export default Header;
