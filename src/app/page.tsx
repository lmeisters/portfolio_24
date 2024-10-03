"use client";

import {
    ScrollText,
    Copy,
    ArrowUpRight,
    Globe,
    GitFork,
    Check,
} from "lucide-react";
import Link from "next/link";
import { FloatingNavbar } from "./components/FloatingNavbar";
import Header from "./sections/header";
import Contact from "./sections/contact";
import Footer from "./sections/footer";
import { useCopyEmail } from "./hooks/useCopyEmail";
import Image from "next/image";
import { StaticImageData } from "next/image";

import handEmoji from "@/assets/hand_emoji.png";
import siteSelectImage from "@/assets/siteselect.png";
import { useCallback, useState } from "react";
// import fridgeFolioImage from "@/assets/fridgefolio.png";

interface ProjectCardProps {
    abbreviation: string;
    title: string;
    description: string;
    longDescription: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
    image: StaticImageData;
}

const ProjectCard = ({
    abbreviation,
    title,
    description,
    longDescription,
    technologies,
    githubUrl,
    liveUrl,
    image,
}: ProjectCardProps & { image: StaticImageData }) => {
    const [tooltipStyle, setTooltipStyle] = useState({
        display: "none",
        left: "0px",
        top: "0px",
    });

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>) => {
            setTooltipStyle({
                display: "block",
                left: `${e.clientX + 10}px`,
                top: `${e.clientY + 10}px`,
            });
        },
        []
    );

    const handleMouseLeave = useCallback(() => {
        setTooltipStyle({ display: "none", left: "0px", top: "0px" });
    }, []);

    return (
        <div className="mb-8">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <Link
                        href={`/projects/${encodeURIComponent(
                            title.toLowerCase().replace(/\s+/g, "-")
                        )}`}
                    >
                        <div className="flex items-baseline space-x-2 cursor-pointer">
                            <div className="text-md font-bold border rounded-md px-2 py-1 bg-gray-100 hover:bg-gray-50 hover:border-gray-400 border-gray-200 transition-colors duration-300 ease-in-out">
                                {abbreviation}
                            </div>
                            <h3 className="text-xl font-bold mb-2 hover:underline">
                                {title}
                            </h3>
                        </div>
                    </Link>
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
                <p className="text-gray-600 w-full md:w-1/2">
                    {longDescription}
                </p>
            </div>
            <div className="w-full h-96 bg-gray-200 rounded-lg flex justify-center items-center overflow-hidden">
                <Link
                    href={liveUrl ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    <Image
                        src={image ?? "/placeholder-image.jpg"}
                        alt={`${title} project screenshot`}
                        width={575}
                        height={400}
                        className="h-auto max-w-full max-h-full object-contain rounded-md border border-gray-300 transition-transform duration-500 ease-in-out hover:scale-105 cursor-pointer"
                        loading="lazy"
                        placeholder="blur"
                    />
                    <div
                        className="tooltip"
                        style={{
                            ...tooltipStyle,
                            position: "fixed",
                            backgroundColor: "rgba(0, 0, 0, 0.8)",
                            color: "white",
                            padding: "5px 10px",
                            borderRadius: "8px",
                            fontSize: "14px",
                            zIndex: 1000,
                            pointerEvents: "none",
                        }}
                    >
                        Learn More
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default function Home() {
    const email = "linards@example.com";
    const { copied, handleCopyEmail } = useCopyEmail(email);

    return (
        <div className="max-w-2xl mx-auto p-4 font-sans">
            <Header />

            <main>
                <section className="mb-12">
                    <Image
                        src={handEmoji}
                        alt="Hand emoji"
                        width={38}
                        height={38}
                        className="hover:animate-wave cursor-default mb-2"
                        loading="lazy"
                        placeholder="blur"
                    />
                    <h1 className="text-5xl font-bold mb-2">
                        Hey, I'm Linards
                    </h1>
                    <p className="text-gray-600 mb-4 text-lg">
                        Front-end Developer Crafting Seamless Web Experiences
                        with Code and Creativity
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

                <section id="projects" className="mb-12 scroll-mt-4">
                    <div className="flex items-center space-x-2 mb-4">
                        <Link href="#projects">
                            <span className="border border-gray-800 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full cursor-default">
                                My Projects
                            </span>
                        </Link>
                    </div>
                    <h2 className="text-3xl font-bold mb-2">My latest works</h2>
                    <p className="text-gray-600 mb-8">
                        A Glimpse into My Recent Web Development Projects and
                        Creative Solutions
                    </p>

                    <ProjectCard
                        abbreviation="SS"
                        title="SiteSelect"
                        description="A curated platform offering a collection of the web's most innovative design galleries"
                        longDescription="Throughout the years of web development I had collected a lot of website inspiration galleries but couldn't remember what each of them featured. So I made a custom website just to categorise and filter all of them."
                        technologies={["SCSS/SASS", "JavaScript", "GSAP"]}
                        githubUrl="https://github.com/lmeisters/SiteSelect"
                        liveUrl="https://siteselect.vercel.app/"
                        image={siteSelectImage}
                    />
                    <ProjectCard
                        abbreviation="FF"
                        title="FridgeFolio"
                        description="A recipe sharing platform"
                        longDescription="I made this website for my mom who loves cooking and sharing her recipes with friends and family. She can easily add, edit and delete recipes, and the website is also hosted on Vercel."
                        technologies={[
                            "Tailwind",
                            "Typescript",
                            "FreamerMotion",
                        ]}
                        githubUrl="https://github.com/lmeisters/FridgeFolio"
                        liveUrl="https://siteselect.vercel.app/"
                        image={siteSelectImage}
                    />
                </section>

                <section className="mb-12">
                    <div className="flex items-center space-x-2 mb-4">
                        <span className="border border-gray-800 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            About
                        </span>
                    </div>

                    <h2 className="text-3xl font-bold mb-2">About Me</h2>
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
                <Contact />
            </main>

            <Footer />
            <FloatingNavbar />
        </div>
    );
}
