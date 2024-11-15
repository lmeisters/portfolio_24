import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function AboutSection() {
    return (
        <section className="mb-12">
            <div className="flex items-center space-x-2 mb-4">
                <span className="border border-gray-800 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    About
                </span>
            </div>

            <h2 className="text-3xl font-bold mb-2">About Me</h2>
            <p className="text-gray-600 mb-4">
                I'm a front-end developer focused on building functional,
                responsive web applications. I enjoy simplifying tasks with
                custom apps and staying updated on UI/UX trends to improve my
                designs. I turn inspiration into well-executed, user-centered
                websites
            </p>
            <Link
                href="/pages/about"
                aria-label="Learn more about my background and experience as a frontend developer"
            >
                <button className="flex items-center text-gray-600 hover:text-black transition-colors duration-300 group">
                    Learn more
                    <ArrowUpRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
            </Link>
        </section>
    );
}
