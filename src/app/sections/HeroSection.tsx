"use client";

import Image from "next/image";
import { ScrollText, Copy, Check } from "lucide-react";
import { useCopyEmail } from "../hooks/useCopyEmail";
import handEmoji from "@/assets/images/hand_emoji.png";

export default function HeroSection() {
    const email = "linards@example.com";
    const { copied, handleCopyEmail } = useCopyEmail(email);

    return (
        <section className="mb-12">
            <Image
                src={handEmoji}
                alt="Hand emoji"
                width={32}
                height={32}
                className="hover:animate-wave cursor-default mb-2"
                style={{ width: "auto", height: "auto" }}
            />
            <h1 className="text-5xl font-bold mb-2">Hey, I'm Linards</h1>
            <p className="text-gray-600 mb-4 text-lg">
                Front-end Developer Crafting Seamless Web Experiences with Code
                and Creativity
            </p>
            <div className="flex space-x-2">
                <button className="px-4 py-2 bg-black text-white rounded-full flex items-center hover:bg-gray-800 transition-colors duration-300 ease-in-out">
                    <ScrollText className="w-4 h-4 mr-2" />
                    Resume
                </button>
                <button
                    className="px-4 py-2 border border-gray-300 rounded-full flex items-center hover:bg-gray-100 hover:border-gray-400 transition-colors duration-300 ease-in-out"
                    onClick={handleCopyEmail}
                >
                    {copied ? (
                        <Check className="w-4 h-4 mr-2" />
                    ) : (
                        <Copy className="w-4 h-4 mr-2" />
                    )}
                    {copied ? "Copied!" : "Copy email"}
                </button>
            </div>
        </section>
    );
}
