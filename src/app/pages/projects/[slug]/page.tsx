"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { FloatingNavbar } from "@/app/components/FloatingNavbar";
import Header from "@/app/layout/header";
import Footer from "@/app/layout/footer";
import LazyLoadMedia from "@/app/components/LazyLoadMedia";
import siteSelectImage from "@/assets/images/siteselect.png";
import terrainlyImage from "@/assets/images/terrainly.webp";
import aiImageGeneratorImage from "@/assets/images/ai_image_generator.webp";

const projects = [
    {
        id: 1,
        name: "SiteSelect",
        description:
            "A curated platform offering a collection of the web's most innovative design galleries. Designed to inspire and elevate web projects, SiteSelect allows users to explore a diverse array of visual references. It features advanced search and filtering, responsive design, and dynamic content loading from a JSON file.",
        year: "2024",
        slug: "siteselect",
        github: "github.com/lmeisters/SiteSelect",
        deployment: "Vercel",
        liveDemo: "siteselect-demo.vercel.app",
        features: [
            "Curated design galleries from across the web",
            "Advanced search and filtering tools",
            "Responsive design for seamless browsing on any device",
            "Dynamic content loading using JSON data",
        ],
        technologies: [
            "Frontend: JavaScript, HTML, SCSS/SASS, GSAP",
            "Data Handling: Fetch API, Async/Await",
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
            "Expand to include user submissions through a form instead of email",
        ],
        mainImage: siteSelectImage,
        mainVideo: "/assets/videos/siteselect_main.webm",
        videos: {
            search: "/assets/videos/siteselect_search.webm",
            filters: "/assets/videos/siteselect_filters.webm",
        },
    },
    {
        id: 2,
        name: "Terrainly",
        description:
            "A full-stack web application that allows users to discover, create, and review parks around Latvia. This application leverages Node.js, Express, and MongoDB to deliver a robust and interactive user experience with features like user authentication, park management, and a review system. This platform is designed to connect nature enthusiasts and provide a comprehensive resource for outdoor adventures in Latvia's beautiful landscapes.",
        year: "2024",
        slug: "terrainly",
        github: "github.com/lmeisters/Terrainly",
        liveDemo: "terrainly.onrender.com",
        deployment: "Render",
        features: [
            "User registration and authentication",
            "Create, read, update, and delete (CRUD) parks",
            "Leave reviews and ratings for parks",
            "Image upload functionality with Cloudinary",
            "Interactive map integration using Mapbox",
            "Responsive design using Bootstrap",
        ],
        technologies: [
            "Backend: Node.js, Express, MongoDB (with Mongoose), Helmet",
            "Frontend: EJS (Embedded JavaScript), Bootstrap 5, CSS, GSAP",
            "Authentication: Passport.js",
            "File Uploads: Multer, Cloudinary",
            "Mapping: Mapbox API, Mapbox GL JS",
            "Version Control: Git",
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
        mainImage: terrainlyImage,
        mainVideo: "/assets/videos/terrainly_demo.webm",
        videos: {
            // demo: "/assets/videos/terrainly_demo.webm",
            // features: "/assets/videos/terrainly_features.webm",
        },
    },
    {
        id: 3,
        name: "AI Image Generator",
        description:
            "This project is an AI image generator application built using React, Node.js, Express, and MongoDB. It leverages the DALL-E 2 AI model to create images from user-provided prompts. Users can generate unique images, share them on the website, and browse a community showcase of AI-generated art.",
        year: "2024",
        slug: "ai-image-generator",
        github: "github.com/lmeisters/AI_Image_Generator_Dall-E",
        liveDemo: "ai-image-generator-dall-e.vercel.app",
        deployment: "Render",
        features: [
            "User registration and authentication",
            "Create, read, update, and delete (CRUD) parks",
            "Leave reviews and ratings for parks",
            "Image upload functionality with Cloudinary",
            "Interactive map integration using Mapbox",
            "Responsive design using Bootstrap",
        ],
        technologies: [
            "Backend: Node.js, Express, MongoDB (with Mongoose), Helmet",
            "Frontend: EJS (Embedded JavaScript), Bootstrap 5, CSS, GSAP",
            "Authentication: Passport.js",
            "File Uploads: Multer, Cloudinary",
            "Mapping: Mapbox API, Mapbox GL JS",
            "Version Control: Git",
        ],
        links: {
            github: "github.com/lmeisters/AI_Image_Generator_Dall-E",
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
        mainImage: aiImageGeneratorImage,
        videos: {
            // demo: "/assets/videos/terrainly_demo.webm",
            // features: "/assets/videos/terrainly_features.webm",
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
                        <a
                            href={`https://${project.liveDemo}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-gray-400 hover:underline"
                        >
                            {project.liveDemo}
                        </a>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                        <label className="text-sm font-medium text-gray-800">
                            Github
                        </label>
                        <a
                            href={`https://${project.github}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-gray-400 hover:underline"
                        >
                            {project.github}
                        </a>
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
                    <div className="bg-gray-200 h-96 mb-4 rounded-lg relative overflow-hidden flex justify-center items-center">
                        <LazyLoadMedia
                            src={project.mainVideo ?? ""}
                            width={600}
                            height={400}
                            title={project.name}
                            isVideo={true}
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-lg">
                        {Object.entries(project.videos).map(([key, src]) => (
                            <div
                                key={key}
                                className="bg-gray-200 h-96 rounded-lg relative overflow-hidden"
                            >
                                <LazyLoadMedia
                                    src={src}
                                    width={400}
                                    height={300}
                                    title={`${project.name} - ${key}`}
                                    isVideo={true}
                                    // className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover scale-150"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-3xl font-semibold mb-2">Features</h2>
                    <ul className="list-decimal pl-5 text-gray-600">
                        {project.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                        ))}
                    </ul>
                </div>

                <div className="mb-8">
                    <h2 className="text-3xl font-semibold mb-2">
                        Technologies Used
                    </h2>
                    <ul className="list-disc pl-5 text-gray-600">
                        {project.technologies.map((tech, index) => (
                            <li key={index}>{tech}</li>
                        ))}
                    </ul>
                </div>

                <div className="mb-8">
                    <h2 className="text-3xl font-semibold mb-2">Challenges</h2>
                    <ul className="list-disc pl-5 text-gray-600">
                        {project.challenges.map((item, index) => (
                            <li key={index}>
                                <strong>{item.challenge}</strong>
                                <br />
                                Solution: {item.solution}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-gray-200 h-96 mb-8 rounded-lg"></div>

                <div className="mb-8">
                    <h2 className="text-3xl font-semibold mb-2">
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

                <div className="bg-gray-200 h-96 rounded-lg"></div>
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
