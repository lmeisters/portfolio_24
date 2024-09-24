import React from "react";
import Link from "next/link";
import Head from "next/head";
import RigaTimeClock from "../components/RigaTimeClock";

const Header = () => (
    <>
        <Head>
            <title>Linards - Portfolio</title>
            <meta name="description" content="Linards' portfolio" />
        </Head>

        <header className="flex justify-between items-center mb-8">
            <Link href="/">
                <div className="text-md font-semibold border rounded-md p-1 hover:bg-gray-100 hover:border-gray-400 transition-colors duration-300 ease-in-out cursor-pointer">
                    LM
                </div>
            </Link>
            <div className="text-md">
                <RigaTimeClock />
            </div>
        </header>
    </>
);

export default Header;
