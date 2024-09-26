"use client";

import React, { useState } from "react";
import {
    ScrollText,
    Hand,
    Copy,
    ArrowUpRight,
    Globe,
    GitFork,
    Check,
} from "lucide-react";
import Link from "next/link";
import { FloatingNavbar } from "./components/FloatingNavbar";
import Header from "./sections/header";
import Footer from "./sections/footer";

interface ProjectCardProps {
    title: string;
    description: string;
    longDescription: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
}

const ProjectCard = ({
    title,
    description,
    longDescription,
    technologies,
    githubUrl,
    liveUrl,
}: ProjectCardProps) => (
    <div>
        <div className="flex justify-between items-start mb-4">
            <div>
                <div className="flex items-baseline space-x-2 ">
                    <div className="text-md font-extrabold border rounded-md px-2 py-1 bg-gray-200 hover:bg-gray-100 hover:border-gray-400 transition-colors duration-300 ease-in-out cursor-pointer">
                        SS
                    </div>
                    <h3 className="text-xl font-bold mb-2">{title}</h3>
                </div>
            </div>
            <div className="flex space-x-2">
                {githubUrl && (
                    <Link
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <GitFork className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
                    </Link>
                )}
                {liveUrl && (
                    <Link
                        href={liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Globe className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
                    </Link>
                )}
            </div>
        </div>
        <div className="flex md:flex-row flex-col mb-6 gap-4">
            <div className="w-full md:w-1/2 flex flex-col justify-between gap-4">
                <p className="font-medium">{description}</p>
                <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, index) => (
                        <span
                            key={index}
                            className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
            <p className="text-gray-600 w-full md:w-1/2">{longDescription}</p>
        </div>
        <div className="w-full">
            <div className="w-full h-96 bg-gray-100 rounded-md"></div>
        </div>
    </div>
);

export default function Home() {
    const [copied, setCopied] = useState(false);
    const email = "linards@example.com";

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(email).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="max-w-2xl mx-auto p-4 font-sans">
            <Header />

            <main>
                <section className="mb-12">
                    <Hand className="w-8 h-8 mb-4" />
                    <h1 className="text-5xl font-bold mb-2">
                        Hey, I'm Linards
                    </h1>
                    <p className="text-gray-600 mb-4 text-lg">
                        Front-end Developer Crafting Seamless Web Experiences
                        with Code and Creativity
                    </p>
                    <div className="flex space-x-2">
                        <button className="px-4 py-2 bg-black text-white rounded-full flex items-center hover:bg-gray-800 transition-colors duration-300 ease-in-ou">
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

                <section id="projects" className="mb-12">
                    <Link href="#projects">
                        <div className="flex items-center space-x-2 mb-4">
                            <span className="border border-gray-800 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                My Projects
                            </span>
                        </div>
                    </Link>
                    <h2 className="text-3xl font-bold mb-2">My latest works</h2>
                    <p className="text-gray-600 mb-8">
                        A Glimpse into My Recent Web Development Projects and
                        Creative Solutions
                    </p>

                    <ProjectCard
                        title="SiteSelect"
                        description="A curated platform offering a collection of the web's most innovative design galleries"
                        longDescription="Throughout the years of web development I had collected a lot of website inspiration galleries but couldn't remember what each of them featured. So I made a custom website just to categorise and filter all of them."
                        technologies={["SCSS/SASS", "JavaScript", "GSAP"]}
                        githubUrl="https://github.com/lmeisters/SiteSelect"
                        liveUrl="https://siteselect.vercel.app/"
                    />
                </section>

                <section className="mb-12">
                    <div className="flex items-center space-x-2 mb-4">
                        <span className="border border-gray-800 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            About
                        </span>
                    </div>

                    <h2 className="text-2xl font-bold mb-2">About Me</h2>
                    <p className="text-gray-600 mb-4">
                        I'm a passionate web developer with a knack for creating
                        clean, efficient, and user-friendly websites. With
                        expertise in front-end and back-end development, I focus
                        on building responsive, dynamic, and intuitive digital
                        experiences. I enjoy turning complex problems into
                        simple, elegant solutions, and I'm always exploring the
                        latest technologies to stay ahead in the ever-evolving
                        world of web development. When I'm not coding, you can
                        find me diving into new design trends or collaborating
                        on exciting tech projects.
                    </p>
                    <Link href="/about" passHref>
                        <button className="flex items-center text-gray-600 hover:text-black transition-colors duration-300 group">
                            Learn more
                            <ArrowUpRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </button>
                    </Link>
                </section>

                <section>
                    <div className="flex items-center space-x-2 mb-4">
                        <span className="border border-gray-800 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            Contact
                        </span>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Get in Touch</h2>
                    <p className="text-gray-600 mb-4">
                        Feel free to reach out if you're looking for a skilled
                        web developer who can bring fresh ideas and technical
                        expertise to your team. I'm always open to discussing
                        new opportunities and collaborations.
                    </p>

                    <button
                        className="px-4 py-2 bg-black text-white rounded-full flex items-center hover:bg-gray-800 transition-colors duration-300 ease-in-out"
                        onClick={handleCopyEmail}
                    >
                        {copied ? (
                            <Check className="w-4 h-4 mr-2" />
                        ) : (
                            <Copy className="w-4 h-4 mr-2" />
                        )}
                        {copied ? "Copied!" : "Copy email"}
                    </button>
                </section>
            </main>

            <Footer />
            <FloatingNavbar />
        </div>
    );
}
