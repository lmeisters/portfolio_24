"use client";

import Image from "next/image";
import { ScrollText } from "lucide-react";
import handEmoji from "@/assets/images/hand_emoji.webp";
import { useState, useEffect } from "react";
import { CopyEmailButton } from "../components/CopyEmailButton";

export default function HeroSection() {
    const email = "linards.meisters@gmail.com";
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(true);
        const timer = setTimeout(() => setAnimate(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="mb-12">
            <Image
                src={handEmoji}
                alt="Wave emoji"
                width={32}
                height={32}
                priority
                className={`cursor-default mb-2 w-8 h-8 ${
                    animate ? "animate-wave" : ""
                } hover:animate-wave`}
            />
            <h1 className="text-5xl font-bold mb-2">Hey, I&apos;m Linards</h1>
            <p className="text-gray-600 mb-4 text-lg">
                UX Specialist optimizing digital products through research, testing, and design
            </p>
            <div className="flex space-x-2">
                <button
                    onClick={() =>
                        window.open(
                            "https://drive.google.com/file/d/1n1P4QFTfuhQN4Ob7TfwC-j3wxt8PApi2/view?usp=sharing",
                            "_blank",
                            "noopener,noreferrer"
                        )
                    }
                    className="px-4 py-2 bg-black text-white rounded-full flex items-center hover:bg-gray-800 transition-colors duration-300 ease-in-out"
                >
                    <ScrollText className="w-4 h-4 mr-2" />
                    Resume
                </button>
                <CopyEmailButton email={email} variant="outline" />
            </div>
        </section>
    );
}
