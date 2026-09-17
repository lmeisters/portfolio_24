import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import SectionBadge from "../components/SectionBadge";
import { projectPath, projects } from "../data/projects";

const FEATURED = ["pureplaylist", "siteselect", "terrainly"];

export default function ProjectsSection() {
    const featured = FEATURED.map(
        (slug) => projects.find((p) => p.slug === slug)!
    );

    return (
        <section
            id="projects"
            className="mb-12 scroll-mt-4"
            aria-labelledby="projects-heading"
        >
            <SectionBadge>My Projects</SectionBadge>
            <h2 id="projects-heading" className="mb-2 text-3xl font-bold">
                My latest works
            </h2>
            <p className="mb-8 text-gray-600 dark:text-neutral-400">
                A glimpse into my recent web development projects and creative
                solutions
            </p>

            {featured.map((project, index) => (
                <ProjectCard
                    key={project.slug}
                    priority={index === 0}
                    project={{
                        ...project,
                        href: projectPath(project.slug),
                    }}
                />
            ))}

            <Link
                href="/pages/works"
                className="group inline-flex items-center rounded text-gray-600 transition-colors duration-300 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current dark:text-neutral-400 dark:hover:text-white"
            >
                See all projects
                <ArrowUpRight
                    aria-hidden="true"
                    className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
            </Link>
        </section>
    );
}
