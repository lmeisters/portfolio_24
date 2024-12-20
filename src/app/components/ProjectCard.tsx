import Link from "next/link";
import { StaticImageData } from "next/image";
import { GitFork, Globe } from "lucide-react";
import Tooltip from "./ToolTip";
import LazyLoadMedia from "./LazyLoadMedia";
import Image from "next/image";
import { skillIcons } from "@/app/utils/skillIcons";

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
    videoSrc?: string;
    isNew?: boolean;
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
    videoSrc,
    isNew,
}: ProjectCardProps) => {
    return (
        <div className="mb-8 last-of-type:mb-4">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <Link
                        href={`/pages/projects/${encodeURIComponent(
                            title.toLowerCase().replace(/\s+/g, "-")
                        )}`}
                    >
                        <div className="flex items-center space-x-2 cursor-pointer">
                            <div className="text-md font-bold border rounded-md px-1 py-1 bg-gray-100 hover:bg-gray-50 hover:border-gray-400 border-gray-200 transition-colors duration-300 ease-in-out flex items-center justify-center w-8 h-8">
                                {logo ? (
                                    <Image
                                        src={logo}
                                        alt={`${title} logo`}
                                        width={24}
                                        height={24}
                                        className="w-6 h-6 object-contain"
                                        style={{
                                            width: "auto",
                                            height: "auto",
                                        }}
                                    />
                                ) : (
                                    abbreviation
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-xl font-bold mb-0">
                                    {title}
                                </h3>
                                {isNew && (
                                    <span className="animate-shimmer bg-black text-white text-[10px] font-medium px-1 rounded translate-y-[-10px]">
                                        New
                                    </span>
                                )}
                            </div>
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
                                aria-label={`View ${title} Github Repository`}
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
                                aria-label={`View ${title} Live Site`}
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
                        {technologies.map((tech) => {
                            const Icon = skillIcons[tech];
                            return (
                                <span
                                    key={tech}
                                    className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded inline-flex items-center gap-1.5"
                                >
                                    {Icon && <Icon className="w-3.5 h-3.5" />}
                                    {tech}
                                </span>
                            );
                        })}
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
                            videoSrc={videoSrc}
                            title={`${title} project screenshot`}
                            width={565}
                            height={400}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </Link>
                </Tooltip>
            </div>
        </div>
    );
};

export default ProjectCard;
