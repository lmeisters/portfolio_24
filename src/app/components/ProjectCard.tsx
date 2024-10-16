import Link from "next/link";
import { StaticImageData } from "next/image";
import { GitFork, Globe } from "lucide-react";
import Tooltip from "./ToolTip";
import LazyLoadMedia from "./LazyLoadMedia";
import Image from "next/image";

interface ProjectCardProps {
    logo?: string | StaticImageData;
    abbreviation?: string;
    title: string;
    description: string;
    longDescription: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
    image: StaticImageData;
}

const ProjectCard = ({
    logo,
    abbreviation,
    title,
    description,
    longDescription,
    technologies,
    githubUrl,
    liveUrl,
    image,
}: ProjectCardProps) => {
    return (
        <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <Link
                        href={`/pages/projects/${encodeURIComponent(
                            title.toLowerCase().replace(/\s+/g, "-")
                        )}`}
                    >
                        <div className="flex items-center space-x-2 cursor-pointer">
                            <div className="text-md font-bold border rounded-md px-2 py-1 bg-gray-100 hover:bg-gray-50 hover:border-gray-400 border-gray-200 transition-colors duration-300 ease-in-out flex items-center justify-center min-w-[32px] h-8">
                                {logo ? (
                                    <Image
                                        src={logo}
                                        alt={`${title} logo`}
                                        width={20}
                                        height={20}
                                    />
                                ) : (
                                    abbreviation
                                )}
                            </div>
                            <h3 className="text-xl font-bold mb-0 hover:underline">
                                {title}
                            </h3>
                        </div>
                    </Link>
                </div>
                <div className="flex space-x-2">
                    {githubUrl && (
                        <Tooltip content="View Github Repository">
                            <Link
                                href={githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <GitFork className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
                            </Link>
                        </Tooltip>
                    )}
                    {liveUrl && (
                        <Tooltip content="View Live Site">
                            <Link
                                href={liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Globe className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
                            </Link>
                        </Tooltip>
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
            <div className="w-full h-auto md:h-96 bg-gray-200 rounded-lg flex justify-center items-center overflow-hidden border border-gray-300 md:border-none md:p-6">
                <Tooltip content="Learn More">
                    <Link
                        href={`/pages/projects/${encodeURIComponent(
                            title.toLowerCase().replace(/\s+/g, "-")
                        )}`}
                        className="flex justify-center group w-full h-full"
                    >
                        <LazyLoadMedia
                            src={image ? image.src : "/placeholder-image.jpg"}
                            title={`${title} project screenshot`}
                            width={565}
                            height={400}
                            className="transition-transform duration-300 group-hover:scale-105 w-full h-full object-cover rounded-lg"
                        />
                    </Link>
                </Tooltip>
            </div>
        </div>
    );
};

export default ProjectCard;
