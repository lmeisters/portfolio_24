"use client";

// React/Next.js imports
import Image from "next/image";
import Link from "next/link";

// Third-party libraries
import { GitFork, Globe } from "lucide-react";

// Components
import { FloatingNavbar } from "@/app/components/FloatingNavbar";
import Header from "@/app/layout/header";
import Footer from "@/app/layout/footer";
import Tooltip from "@/app/components/ToolTip";
import LazyLoadMedia from "@/app/components/LazyLoadMedia";

// Assets/Images
import siteSelectImage from "@/assets/images/siteselect_works.webp";
import terrainlyImage from "@/assets/images/terrainly.webp";
import terrainlyLogo from "@/assets/images/terrainly_logo.webp";
import purePlaylistImage from "@/assets/images/pure_playlist.webp";
import purePlaylistLogo from "@/assets/images/pure_playlist_logo.webp";
import aiImageGeneratorImage from "@/assets/images/ai_image_generator.webp";

// Add after the existing imports
import { skillIcons } from "@/app/utils/skillIcons";

function LogoElement({ project }: { project: (typeof projects)[number] }) {
    return (
        <div className="text-md font-bold border rounded-md px-1 py-1 bg-gray-100 hover:bg-gray-50 hover:border-gray-400 border-gray-200 transition-colors duration-300 ease-in-out flex items-center justify-center w-6 h-6">
            {project.logo ? (
                <Image
                    src={project.logo}
                    alt={`${project.title} logo`}
                    width={24}
                    height={24}
                    className="w-6 h-6 object-contain"
                    style={{
                        width: "auto",
                        height: "auto",
                    }}
                />
            ) : (
                project.abbreviation
            )}
        </div>
    );
}

const projects = [
    {
        logo: purePlaylistLogo.src,
        title: "PurePlaylist",
        description:
            "A Spotify playlist management app for easy sorting, filtering, and organization",
        technologies: ["TypeScript", "Tailwind", "Spotify API"],
        githubUrl: "https://github.com/lmeisters/PurePlaylist",
        liveUrl: "https://pureplaylist.vercel.app",
        image: purePlaylistImage,
        videoSrc: "/assets/videos/pure_playlist/pure_playlist_demo.webm",
        hasProjectPage: true,
    },
    {
        abbreviation: "SS",
        title: "SiteSelect",
        description:
            "A curated platform offering a collection of the web's most innovative design galleries",
        technologies: ["JavaScript", "SCSS/SASS", "GSAP"],
        githubUrl: "https://github.com/lmeisters/SiteSelect",
        liveUrl: "https://siteselect.vercel.app/",
        image: siteSelectImage,
        videoSrc: "/assets/videos/siteselect/siteselect_demo.webm",
        hasProjectPage: true,
    },
    {
        logo: terrainlyLogo.src,
        title: "Terrainly",
        description:
            "A full stack web app for discovering, reviewing, and managing parks around Latvia",
        technologies: ["JavaScript", "Bootstrap", "Node.js"],
        githubUrl: "https://github.com/lmeisters/Terrainly",
        liveUrl: "https://terrainly.onrender.com",
        image: terrainlyImage,
        videoSrc: "/assets/videos/terrainly/terrainly_demo.webm",
        hasProjectPage: true,
    },
    {
        abbreviation: "IG",
        title: "AI Image Generator",
        description:
            "Web app that creates and showcases unique images from user prompts",
        technologies: ["React", "Tailwind", "Node.js"],
        githubUrl: "https://github.com/lmeisters/AI_Image_Generator_Dall-E",
        liveUrl: "https://image-generator-beed6.web.app",
        image: aiImageGeneratorImage,
        videoSrc: "/assets/videos/image_gen/ai_image_generator_demo.webm",
        hasProjectPage: true,
    },
    {
        logo: "/icon.png",
        title: "Portfolio website",
        description: "A portfolio website showcasing my projects and skills",
        technologies: ["TypeScript", "Tailwind", "React"],
        githubUrl: "https://github.com/lmeisters/portfolio_24",
        liveUrl: "https://portfoliolm.vercel.app/",
        image: {
            src: "/og-image.png",
        },
        hasProjectPage: false,
    },
];

export default function ProjectsPage() {
    return (
        <div className="max-w-2xl mx-auto p-4 font-sans">
            <Header />
            <main>
                <div className="mb-12">
                    <h1 className="text-4xl font-semibold mb-2">
                        All Projects
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Take a look at some of my most recent projects
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                        <div
                            key={project.title}
                            className="relative flex flex-col h-full"
                        >
                            <div className="flex flex-col flex-grow">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        {project.hasProjectPage ? (
                                            <Link
                                                href={`/pages/projects/${encodeURIComponent(
                                                    project.title
                                                        .toLowerCase()
                                                        .replace(/\s+/g, "-")
                                                )}`}
                                            >
                                                <LogoElement
                                                    project={project}
                                                />
                                            </Link>
                                        ) : (
                                            <LogoElement project={project} />
                                        )}

                                        {project.hasProjectPage ? (
                                            <Link
                                                href={`/pages/projects/${encodeURIComponent(
                                                    project.title
                                                        .toLowerCase()
                                                        .replace(/\s+/g, "-")
                                                )}`}
                                                className="hover:text-gray-600 transition-colors duration-300"
                                            >
                                                <h3 className="text-xl font-semibold">
                                                    {project.title}
                                                </h3>
                                            </Link>
                                        ) : (
                                            <h3 className="text-xl font-semibold">
                                                {project.title}
                                            </h3>
                                        )}
                                    </div>
                                    <div className="flex gap-3">
                                        <Tooltip content="View Github Repository">
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-500 hover:text-gray-700"
                                            >
                                                <GitFork className="w-5 h-5" />
                                            </a>
                                        </Tooltip>
                                        <Tooltip
                                            content={
                                                project.title ===
                                                "AI Image Generator"
                                                    ? "Currently unavailable due to API usage limits"
                                                    : "View Live Site"
                                            }
                                        >
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-500 hover:text-gray-700"
                                            >
                                                <Globe className="w-5 h-5" />
                                            </a>
                                        </Tooltip>
                                    </div>
                                </div>

                                <p className="text-gray-600 mb-3 line-clamp-3 flex-grow">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-3">
                                    {project.technologies.map((tech) => {
                                        const Icon = skillIcons[tech];
                                        return (
                                            <span
                                                key={tech}
                                                className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded inline-flex items-center gap-1.5"
                                            >
                                                {Icon && (
                                                    <Icon className="w-3.5 h-3.5" />
                                                )}
                                                {tech}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>

                            <Tooltip
                                content={
                                    project.hasProjectPage
                                        ? "Learn More"
                                        : "Preview"
                                }
                            >
                                {project.hasProjectPage ? (
                                    <Link
                                        href={`/pages/projects/${encodeURIComponent(
                                            project.title
                                                .toLowerCase()
                                                .replace(/\s+/g, "-")
                                        )}`}
                                        className="block aspect-video w-full relative overflow-hidden rounded-lg group"
                                    >
                                        <LazyLoadMedia
                                            src={project.image.src}
                                            videoSrc={project.videoSrc}
                                            title={`${project.title} project screenshot`}
                                            width={565}
                                            height={400}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            priority={index === 0}
                                        />
                                    </Link>
                                ) : (
                                    <div className="block aspect-video w-full relative overflow-hidden rounded-lg group">
                                        <LazyLoadMedia
                                            src={project.image.src}
                                            videoSrc={project.videoSrc}
                                            title={`${project.title} project screenshot`}
                                            width={565}
                                            height={400}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            priority={index === 0}
                                        />
                                    </div>
                                )}
                            </Tooltip>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
            <FloatingNavbar />
        </div>
    );
}
