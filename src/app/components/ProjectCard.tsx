import Link from "next/link";
import type { StaticImageData } from "next/image";
import { GitFork, Globe } from "lucide-react";
import Tooltip from "./Tooltip";
import ProjectLogo from "./ProjectLogo";
import MediaPreview from "./MediaPreview";
import { SkillTag } from "./icons";

export interface CardProject {
    title: string;
    /** Detail page path; omit for projects without one. */
    href?: string;
    logo?: StaticImageData | string;
    abbreviation?: string;
    description: string;
    longDescription?: string;
    tags: string[];
    githubUrl: string;
    liveUrl: string;
    liveNotice?: string;
    image: StaticImageData | string;
    /** Only needed when `image` is a string path. */
    imageWidth?: number;
    imageHeight?: number;
    videoSrc?: string;
    isNew?: boolean;
}

interface ProjectCardProps {
    project: CardProject;
    /** "full" is the home page layout, "compact" the works grid. */
    variant?: "full" | "compact";
    priority?: boolean;
}

export default function ProjectCard({
    project,
    variant = "full",
    priority = false,
}: ProjectCardProps) {
    const {
        title,
        href,
        description,
        longDescription,
        tags,
        githubUrl,
        liveUrl,
        liveNotice,
        image,
        videoSrc,
        isNew,
    } = project;
    const compact = variant === "compact";
    const Heading = compact ? "h2" : "h3";

    const heading = (
        <span className="flex items-center gap-2">
            <ProjectLogo
                logo={project.logo}
                abbreviation={project.abbreviation}
            />
            <Heading className="text-xl font-bold">{title}</Heading>
            {isNew && (
                <span className="animate-shimmer -translate-y-2 rounded bg-black px-1 text-[10px] font-medium text-white dark:bg-white dark:text-black">
                    New
                </span>
            )}
        </span>
    );

    return (
        <article className={compact ? "flex h-full flex-col" : "mb-8 last-of-type:mb-4"}>
            <div className="mb-4 flex items-center justify-between gap-4">
                {href ? (
                    <Link
                        href={href}
                        className="group rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
                    >
                        {heading}
                    </Link>
                ) : (
                    heading
                )}
                <div className="flex gap-3">
                    <Tooltip content="GitHub repository">
                        <a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${title} on GitHub (opens in a new tab)`}
                            className="inline-flex rounded-md p-1 text-gray-600 transition-colors hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current dark:text-neutral-400 dark:hover:text-white"
                        >
                            <GitFork aria-hidden="true" className="h-5 w-5" />
                        </a>
                    </Tooltip>
                    <Tooltip content={liveNotice ?? "Live site"}>
                        <a
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${title} live site${
                                liveNotice ? `, ${liveNotice.toLowerCase()}` : ""
                            } (opens in a new tab)`}
                            className="inline-flex rounded-md p-1 text-gray-600 transition-colors hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current dark:text-neutral-400 dark:hover:text-white"
                        >
                            <Globe aria-hidden="true" className="h-5 w-5" />
                        </a>
                    </Tooltip>
                </div>
            </div>

            {compact ? (
                <>
                    <p className="mb-3 flex-grow text-gray-600 dark:text-neutral-400">
                        {description}
                    </p>
                    <ul className="mb-3 flex flex-wrap gap-2" aria-label="Technologies">
                        {tags.map((tag) => (
                            <li key={tag}>
                                <SkillTag name={tag} />
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <div className="mb-6 flex flex-col gap-4 md:flex-row">
                    <div className="flex w-full flex-col justify-between gap-4 md:w-1/2">
                        <p className="font-medium">{description}</p>
                        <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                            {tags.map((tag) => (
                                <li key={tag}>
                                    <SkillTag name={tag} />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <p className="w-full text-gray-600 dark:text-neutral-400 md:w-1/2">
                        {longDescription}
                    </p>
                </div>
            )}

            <div
                className={
                    compact
                        ? "aspect-video w-full"
                        : "flex h-auto w-full items-center justify-center overflow-hidden rounded-lg border border-gray-300 bg-gray-200 dark:border-neutral-700 dark:bg-neutral-800 md:h-96 md:border-none md:p-6"
                }
            >
                <Tooltip
                    content={href ? "Learn more" : "Preview"}
                    className={compact ? "h-full w-full" : "w-full"}
                >
                    <MediaPreview
                        image={image}
                        alt={`${title} screenshot`}
                        width={project.imageWidth}
                        height={project.imageHeight}
                        videoSrc={videoSrc}
                        href={href}
                        priority={priority}
                    />
                </Tooltip>
            </div>
        </article>
    );
}
