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
                I have a Bachelor's in Computer Science and a Master's in
                progress at Riga Technical University. During my internship at
                Mykoob, I focused on improving front-end workflows, creating
                maintainable SCSS architecture, and optimizing performance for
                responsive web design. I have certifications in advanced CSS and
                JavaScript and currently specialize in building fast, accessible
                web applications with tools like React, Next.js, and Tailwind
                CSS
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
