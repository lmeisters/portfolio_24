"use client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FloatingNavbar } from "@/app/components/FloatingNavbar";
import Header from "@/app/sections/header";

const projects = [
    {
        name: "SiteSelect",
        description:
            "A curated platform offering a collection of the web's most innovative design galleries",
        features: [
            "Real-time collaboration",
            "Multi-language support",
            "Integrated chat",
            "Version control",
        ],
        technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Docker"],
        challenges: ["Real-time sync", "Secure code execution", "Scalability"],
        metrics: {
            uptime: "99.9%",
            responseTime: "<100ms",
            users: "1000 concurrent",
        },
        links: {
            demo: "https://codeconnect-demo.com",
            github: "https://github.com/yourusername/codeconnect",
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
            <div className="max-w-2xl mx-auto p-4 font-sans">
                <h1 className="text-3xl font-bold mb-2">
                    {project.name || project.title}
                </h1>
                <p className="text-gray-600 mb-4">{project.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">
                            Key Features
                        </h2>
                        <ul className="list-disc list-inside">
                            {project.features.map((feature, index) => (
                                <li key={index} className="text-sm">
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Remove or comment out the Tech Stack section if not available in the project data */}
                </div>

                {/* Remove or comment out sections that are not available in the project data */}

                <div className="flex justify-between items-center mb-4">
                    {/* Remove or adjust these links based on available data */}
                </div>

                {/* Remove or adjust the Contact section based on available data */}
            </div>

            <Link
                href={`/projects/${
                    (nextProject?.name || nextProject?.title)
                        ?.toLowerCase()
                        .replace(/\s+/g, "-") ?? "default-slug"
                }`}
                className="inline-block bg-gray-800 text-white px-6 py-3 rounded"
            >
                Next Project →
            </Link>
            <FloatingNavbar />
        </div>
    );
}
