"use client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FloatingNavbar } from "@/app/components/FloatingNavbar";
import Header from "@/app/sections/header";
import Footer from "@/app/sections/footer";

const projects = [
    {
        id: 1,
        name: "SiteSelect",
        description:
            "Integrated development environment for web applications. Full stack web development platform that includes code editor, version control, and instant website and API deployment. An I made a custom website just to categorize and filter all of them.",
        year: "2024",
        slug: "siteselect",
        github: "github.com/lmeisters/SiteSelect",
        deployment: "Vercel",
        features: [
            "Real-time collaborative code editor",
            "Support for multiple programming languages (Python, JavaScript, Java, C++)",
            "Integrated terminal and debugger",
            "Version control with Git integration",
            "Code completion and intelligent suggestions",
            "Customizable workspace and theme management",
        ],
        technologies: [
            "Frontend: React.js, Redux, Socket.io (client)",
            "Backend: Node.js, Express.js, Socket.io (server)",
            "Database: MongoDB",
            "Authentication: JSON Web Tokens (JWT)",
            "Version Control: Git",
            "Code Execution: Docker containers",
        ],
        links: {
            github: "github.com/lmeisters/SiteSelect",
        },
    },
    {
        id: 2,
        name: "FridgeFolio",
        description:
            "Integrated development environment for web applications. Full stack web development platform that includes code editor, version control, and instant website and API deployment. An I made a custom website just to categorize and filter all of them.",
        year: "2024",
        slug: "siteselect",
        github: "github.com/lmeisters/SiteSelect",
        deployment: "Vercel",
        features: [
            "Real-time collaborative code editor",
            "Support for multiple programming languages (Python, JavaScript, Java, C++)",
            "Integrated terminal and debugger",
            "Version control with Git integration",
            "Code completion and intelligent suggestions",
            "Customizable workspace and theme management",
        ],
        technologies: [
            "Frontend: React.js, Redux, Socket.io (client)",
            "Backend: Node.js, Express.js, Socket.io (server)",
            "Database: MongoDB",
            "Authentication: JSON Web Tokens (JWT)",
            "Version Control: Git",
            "Code Execution: Docker containers",
        ],
        links: {
            github: "github.com/lmeisters/SiteSelect",
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
                <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
                <p className="text-sm text-gray-600 mb-6">
                    {project.description}
                </p>

                <div className="grid grid-cols-1 gap-4 mb-6">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                        <label className="text-sm font-medium text-gray-700">
                            Year
                        </label>
                        <p className="text-sm text-gray-400">{project.year}</p>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                        <label className="text-sm font-medium text-gray-700">
                            Live Demo
                        </label>
                        <a
                            href={`https://${params.slug}.vercel.app`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-gray-400 hover:underline"
                        >
                            {`${params.slug}.vercel.app`}
                        </a>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                        <label className="text-sm font-medium text-gray-700">
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
                        <label className="text-sm font-medium text-gray-700">
                            Deployment
                        </label>
                        <p className="text-sm text-gray-400">
                            {project.deployment}
                        </p>
                    </div>
                </div>

                <div className="mb-6">
                    <div className="bg-gray-200 h-96 mb-4 rounded-lg"></div>
                    <div className="grid grid-cols-2 gap-4 rounded-lg">
                        <div className="bg-gray-200 h-96 rounded-lg"></div>
                        <div className="bg-gray-200 h-96 rounded-lg"></div>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Features</h2>
                    <ul className="list-decimal pl-5">
                        {project.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                        ))}
                    </ul>
                </div>

                <div className="bg-gray-200 h-96 mb-6 rounded-lg"></div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">
                        Technologies Used
                    </h2>
                    <ul className="list-disc pl-5">
                        {project.technologies.map((tech, index) => (
                            <li key={index}>{tech}</li>
                        ))}
                    </ul>
                </div>

                <div className="bg-gray-200 h-96 rounded-lg"></div>
            </div>

            <Link
                href={`/projects/${
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
