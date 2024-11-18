"use client";

import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FloatingNavbar } from "@/app/components/FloatingNavbar";
import Header from "@/app/layout/header";
import Footer from "@/app/layout/footer";
import Tooltip from "@/app/components/ToolTip";
import LazyLoadMedia from "@/app/components/LazyLoadMedia";

const projects = [
    {
        id: 1,
        name: "PurePlaylist",
        description:
            "A Spotify playlist filtering web app that allows users to filter playlists based on various criteria such as genre, mood, and tempo",
        year: "2024",
        slug: "pureplaylist",
        github: "github.com/lmeisters/PurePlaylist",
        deployment: "Vercel",
        liveDemo: "pureplaylist.vercel.app",
        features: [
            "Keyword Filtering: Filter songs by specific keywords in titles, genres, or artist names",
            "Artist and Genre Filtering: Narrow down your playlist by selecting or excluding artists and genres",
            "User-Friendly Interface: Intuitive modal-based filtering options for seamless interaction",
            "Responsive Design: Works across all devices—desktop, tablet, and mobile",
        ],
        technologies: [
            "Frontend: React, Next.js, Tailwind CSS, Shadcn UI",
            "State Management: React Query",
            "Authentication: Next-Auth",
            "API Integration: Spotify API",
            "Deployment: Vercel",
        ],
        links: {
            github: "github.com/lmeisters/PurePlaylist",
        },
        challenges: [
            {
                challenge:
                    "Large amount of tracks loading in a timely manner while keeping the user experience smooth",
                solution:
                    "Implemented pagination and virtualized lists to handle large playlists efficiently, with loading states and progressive data fetching",
            },
            {
                challenge:
                    "Making sure all of the tracks in large playlists get filtered, sorted and deleted by the users requests",
                solution:
                    "Utilized client-side caching and optimized filtering algorithms to handle bulk operations efficiently while maintaining responsive UI",
            },
        ],
        futureEnhancements: [
            "Identify and remove duplicate tracks to keep playlists clutter-free",
            "Keep playlists fresh with new releases from artists users follow or like",
            "Set filters and create playlists automatically, right on schedule",
        ],

        mainVideo: "/assets/videos/pure_playlist/pure_playlist_demo.webm",
        videos: {
            filtering:
                "/assets/videos/pure_playlist/pure_playlist_playlist_filtering.webm",
            filters:
                "/assets/videos/pure_playlist/pure_playlist_track_filter.webm",
            sorting:
                "/assets/videos/pure_playlist/pure_playlist_track_sorting.webm",
        },
    },
    {
        id: 2,
        name: "SiteSelect",
        description:
            "A curated platform offering a collection of the web's most innovative design galleries. Designed to inspire and elevate web projects, SiteSelect allows users to explore a diverse array of visual references. It features advanced search and filtering, responsive design, and dynamic content loading from a JSON file",
        year: "2024",
        slug: "siteselect",
        github: "github.com/lmeisters/SiteSelect",
        deployment: "Vercel",
        liveDemo: "siteselect-demo.vercel.app",
        features: [
            "Curated Collection: Hand-picked design galleries from across the web",
            "Search Functionality: Advanced search and filtering tools for precise discovery",
            "Responsive Interface: Seamless browsing experience across all device sizes",
            "Dynamic Loading: Efficient content loading system using JSON data structure",
        ],
        technologies: [
            "Frontend: JavaScript, HTML, SCSS/SASS",
            "Animation: GSAP",
            "Data Handling: Fetch API",
            "Deployment: Vercel",
        ],
        links: {
            github: "github.com/lmeisters/SiteSelect",
        },
        challenges: [
            {
                challenge:
                    "Ensuring smooth performance for dynamic content loading",
                solution:
                    "Implemented efficient data fetching with Fetch API and optimized animations using GSAP",
            },
            {
                challenge: "Responsive design across multiple device sizes",
                solution:
                    "Used SCSS/SASS for scalable styling and media queries for responsiveness",
            },
        ],
        futureEnhancements: [
            "Add more filtering options based on design categories",
            "Incorporate web scraping to automatically update the galleries",
        ],

        mainVideo: "/assets/videos/siteselect/siteselect_demo.webm",
        videos: {
            search: "/assets/videos/siteselect/siteselect_search.webm",
            filters: "/assets/videos/siteselect/siteselect_filter.webm",
        },
    },
    {
        id: 3,
        name: "Terrainly",
        description:
            "A full-stack web application that allows users to discover, create, and review parks around Latvia. This application leverages Node.js, Express, and MongoDB to deliver a robust and interactive user experience with features like user authentication, park management, and a review system. This platform is designed to connect nature enthusiasts and provide a comprehensive resource for outdoor adventures in Latvia's beautiful landscapes",
        year: "2024",
        slug: "terrainly",
        github: "github.com/lmeisters/Terrainly",
        liveDemo: "terrainly.onrender.com",
        deployment: "Render",
        features: [
            "User Authentication: Complete registration and login system for personalized experience",
            "Park Management: Full CRUD functionality for creating and managing park entries",
            "Review System: Interactive platform for leaving reviews and ratings on parks",
            "Media Integration: Advanced image upload functionality using Cloudinary",
            "Interactive Mapping: Dynamic map integration powered by Mapbox",
            "Responsive Design: Bootstrap-based adaptive layout for all devices",
        ],
        technologies: [
            "Frontend: EJS, Bootstrap 5, CSS",
            "Backend: Node.js, Express, MongoDB",
            "Authentication: Passport.js",
            "Media Storage: Cloudinary",
            "Mapping: Mapbox API",
            "Security: Helmet",
            "Deployment: Render",
        ],
        links: {
            github: "github.com/lmeisters/Terrainly",
        },
        challenges: [
            {
                challenge: "Ensuring secure and efficient user authentication",
                solution: "Utilized Passport.js for robust authentication",
            },
            {
                challenge: "Handling file uploads and integrating Cloudinary",
                solution:
                    "Used Multer for handling file uploads and Cloudinary for image storage and delivery",
            },
            {
                challenge: "Integrating Mapbox for interactive maps",
                solution:
                    "Utilized Mapbox GL JS for map rendering and integration",
            },
        ],
        futureEnhancements: [
            "Enhanced search and filtering options",
            "User-generated content moderation",
            "Advanced analytics and reporting tools",
        ],
        mainVideo: "/assets/videos/terrainly/terrainly_demo.webm",
        videos: {
            register: "/assets/videos/terrainly/terrainly_register.webm",
            addPark: "/assets/videos/terrainly/terrainly_add_park.webm",
            editPark: "/assets/videos/terrainly/terrainly_edit_park.webm",
            reviewPark: "/assets/videos/terrainly/terrainly_review.webm",
        },
    },
    {
        id: 4,
        name: "AI Image Generator",
        description:
            "This project is an AI image generator application built using React, Node.js, Express, and MongoDB. It leverages the DALL-E 2 AI model to create images from user-provided prompts. Users can generate unique images, share them on the website, and browse a community showcase of AI-generated art",
        year: "2024",
        slug: "ai-image-generator",
        github: "github.com/lmeisters/AI_Image_Generator_Dall-E",
        liveDemo: "image-generator-beed6.web.app",
        deployment: "Render & Firebase",
        features: [
            "AI Generation: Custom image creation using DALL-E 2 AI model",
            "Random Inspiration: 'Surprise Me' feature for automated prompt suggestions",
            "Community Gallery: Shared showcase of AI-generated artwork",
            "Search System: Advanced functionality to find specific generated images",
            "Download Options: Direct image download capability for users",
            "Responsive Interface: Adaptive design supporting various screen sizes",
        ],
        technologies: [
            "Frontend: React, Tailwind CSS, React Router",
            "Backend: Node.js, Express, MongoDB",
            "AI Integration: OpenAI API (DALL-E 2)",
            "Media Storage: Cloudinary",
            "Build Tools: Vite",
            "Deployment: Render, Firebase",
        ],
        links: {
            github: "github.com/lmeisters/AI_Image_Generator_Dall-E",
        },
        challenges: [
            {
                challenge: "Integrating DALL-E 2 AI model effectively",
                solution:
                    "Utilized OpenAI API to seamlessly incorporate DALL-E 2 functionality",
            },
            {
                challenge: "Managing image storage and retrieval",
                solution:
                    "Implemented Cloudinary for efficient image storage and delivery",
            },
            {
                challenge: "Creating a responsive and intuitive user interface",
                solution:
                    "Leveraged React and Tailwind CSS for a flexible and user-friendly design",
            },
        ],
        futureEnhancements: [
            "Implement user accounts and authentication",
            "Add more AI models for image generation",
            "Introduce image editing features",
        ],
        mainVideo: "/assets/videos/image_gen/ai_image_generator_demo.webm",
        videos: {
            create: "/assets/videos/image_gen/ai_image_generator_create.webm",
        },
    },
];

export default function ProjectPage({ params }: { params: { slug: string } }) {
    const currentProjectIndex = projects.findIndex(
        (p) => p.name.toLowerCase().replace(/\s+/g, "-") === params.slug
    );

    if (currentProjectIndex === -1) {
        notFound();
    }

    const project = projects[currentProjectIndex];
    const nextProject = projects[(currentProjectIndex + 1) % projects.length];

    return (
        <div className="max-w-2xl mx-auto p-4 font-sans">
            <Header />
            <div className="">
                <h1 className="text-5xl font-semibold mb-4">{project.name}</h1>
                <p className="text-sm text-gray-600 mb-6">
                    {project.description}
                </p>

                <div className="grid grid-cols-1 gap-4 mb-6">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                        <label className="text-sm font-medium text-gray-800">
                            Year
                        </label>
                        <p className="text-sm text-gray-400">{project.year}</p>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                        <label className="text-sm font-medium text-gray-800">
                            Live Demo
                        </label>
                        {project.deployment === "Render" ||
                        project.deployment === "Render & Firebase" ? (
                            <Tooltip content="Apps on Render need ~40 seconds to spin up">
                                <a
                                    href={`https://${project.liveDemo}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-gray-400 hover:underline"
                                >
                                    {project.liveDemo}
                                </a>
                            </Tooltip>
                        ) : (
                            <Tooltip content="View Live Site">
                                <a
                                    href={`https://${project.liveDemo}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-gray-400 hover:underline"
                                >
                                    {project.liveDemo}
                                </a>
                            </Tooltip>
                        )}
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                        <label className="text-sm font-medium text-gray-800">
                            Github
                        </label>
                        <Tooltip
                            content={`View Github Repository: ${project.github}`}
                        >
                            <a
                                href={`https://${project.github}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-gray-400 hover:underline truncate max-w-[150px] sm:max-w-none"
                            >
                                {project.github.length > 20
                                    ? `${project.github.substring(0, 30)}...`
                                    : project.github}
                            </a>
                        </Tooltip>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                        <label className="text-sm font-medium text-gray-800">
                            Deployment
                        </label>
                        <p className="text-sm text-gray-400">
                            {project.deployment}
                        </p>
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-3xl font-semibold mb-2">
                        Project Details
                    </h2>

                    {/* Main video */}
                    <div className="w-full h-auto md:h-96 bg-gray-200 rounded-lg flex justify-center items-center overflow-hidden border border-gray-300 md:border-none mb-4">
                        <LazyLoadMedia
                            src={project.mainVideo ?? ""}
                            width={600}
                            height={400}
                            title={project.name}
                            isVideo={true}
                            enableZoom={true}
                        />
                    </div>

                    {/* Features */}
                    <div className="mb-8">
                        <h3 className="text-2xl font-semibold mb-2">
                            Features
                        </h3>
                        <ul className="list-decimal pl-5 text-gray-600">
                            {project.features.map((feature, index) => (
                                <li key={index}>
                                    <strong>{feature.split(":")[0]}:</strong>
                                    {feature.split(":")[1]}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Alternate between videos and other sections */}
                    {Object.entries(project.videos).map(([key, src], index) => (
                        <React.Fragment key={key}>
                            <div className="w-full h-auto md:h-96 bg-gray-200 rounded-lg flex justify-center items-center overflow-hidden border border-gray-300 md:border-none mb-4">
                                <LazyLoadMedia
                                    src={src}
                                    width={600}
                                    height={400}
                                    title={`${project.name} - ${key}`}
                                    isVideo={true}
                                />
                            </div>

                            {index === 0 && (
                                <div className="mb-8">
                                    <h2 className="text-2xl font-semibold mb-2">
                                        Technologies Used
                                    </h2>
                                    <ul className="list-disc pl-5 text-gray-600">
                                        {project.technologies.map(
                                            (tech, index) => (
                                                <li key={index}>
                                                    <strong>
                                                        {tech.split(":")[0]}:
                                                    </strong>
                                                    {tech.split(":")[1]}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            )}

                            {index === 1 && (
                                <div className="mb-8">
                                    <h2 className="text-2xl font-semibold mb-2">
                                        Challenges
                                    </h2>
                                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                                        {project.challenges.map(
                                            (item, index) => (
                                                <li key={index}>
                                                    <strong>
                                                        {item.challenge}
                                                    </strong>
                                                    <br />
                                                    Solution: {item.solution}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            )}
                        </React.Fragment>
                    ))}

                    {/* Future Enhancements */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold mb-2">
                            Future Enhancements
                        </h2>
                        <ul className="list-disc pl-5 text-gray-600">
                            {project.futureEnhancements.map(
                                (enhancement, index) => (
                                    <li key={index}>{enhancement}</li>
                                )
                            )}
                        </ul>
                    </div>
                </div>
            </div>

            <Link
                href={`/pages/projects/${
                    nextProject?.name?.toLowerCase().replace(/\s+/g, "-") ??
                    "default-slug"
                }`}
                className="inline-block px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-300 ease-in-out mt-6"
            >
                Next Project →
            </Link>
            <FloatingNavbar />
            <Footer />
        </div>
    );
}
