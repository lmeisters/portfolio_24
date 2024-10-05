import React from "react";
import Link from "next/link";
import Head from "next/head";
import RigaTimeClock from "@/app/components/RigaTimeClock";
import CurrentlyEmoji from "@/app/components/CurrentlyEmoji";

const Header = () => (
    <>
        <Head>
            <title>Linards - Portfolio</title>
            <meta name="description" content="Linards' portfolio" />
        </Head>

        <header className="flex justify-between items-center mb-8">
            <Link href="/">
                <div className="text-md font-semibold cursor-pointer">LM</div>
            </Link>
            <div className="text-md flex items-center">
                <CurrentlyEmoji />
                <span className="ml-2">
                    <RigaTimeClock />
                </span>
            </div>
        </header>
    </>
);

export default Header;
