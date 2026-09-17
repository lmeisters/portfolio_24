import Image from "next/image";
import { ScrollText } from "lucide-react";
import handEmoji from "@/assets/images/hand_emoji.webp";
import { CopyEmailButton } from "../components/CopyEmailButton";
import { EMAIL, RESUME_URL } from "../data/site";

export default function HeroSection() {
    return (
        <section className="mb-12" aria-labelledby="hero-heading">
            <Image
                src={handEmoji}
                alt=""
                width={32}
                height={32}
                priority
                className="mb-2 h-8 w-8 animate-wave-once cursor-default hover:animate-wave"
            />
            <h1 id="hero-heading" className="mb-2 text-5xl font-bold">
                Hey, I&apos;m Linards
            </h1>
            <p className="mb-4 text-lg text-gray-600 dark:text-neutral-400">
                UX Specialist optimizing digital products through research,
                testing, and design
            </p>
            <div className="flex flex-wrap gap-2">
                <a
                    href={RESUME_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full bg-black px-4 py-2 text-white transition-colors duration-300 hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                >
                    <ScrollText aria-hidden="true" className="mr-2 h-4 w-4" />
                    Resume
                    <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <CopyEmailButton email={EMAIL} variant="outline" />
            </div>
        </section>
    );
}
