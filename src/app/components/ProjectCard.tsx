import Link from "next/link";
import { StaticImageData } from "next/image";
import { GitFork, Globe } from "lucide-react";
import Tooltip from "./ToolTip";
import LazyLoadImage from "./LazyLoadMedia";

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
}: ProjectCardProps) => {
    return (
        <div className="mb-8">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <Link
                        href={`/pages/projects/${encodeURIComponent(
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
                        <Tooltip content="View on GitHub">
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
            <div className="w-full h-96 bg-gray-200 rounded-lg flex justify-center items-center overflow-hidden">
                <Tooltip content="Learn More">
                    <Link
                        href={`/pages/projects/${encodeURIComponent(
                            title.toLowerCase().replace(/\s+/g, "-")
                        )}`}
                        className="flex justify-center"
                    >
                        <LazyLoadImage
                            src={image ? image.src : "/placeholder-image.jpg"}
                            alt={`${title} project screenshot`}
                            width={565}
                            height={400}
                            title={title}
                            applyHoverEffect={true}
                        />
                    </Link>
                </Tooltip>
            </div>
        </div>
    );
};

export default ProjectCard;
