import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertCircle, ArrowRight } from "lucide-react";
import { FloatingNavbar } from "@/app/components/FloatingNavbar";
import Header from "@/app/layout/header";
import Footer from "@/app/layout/footer";
import Tooltip from "@/app/components/Tooltip";
import ProjectVideo from "@/app/components/ProjectVideo";
import {
    displayUrl,
    getProject,
    projectPath,
    projects,
} from "@/app/data/projects";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
    return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Params;
}): Promise<Metadata> {
    const project = getProject((await params).slug);
    if (!project) return {};
    return {
        title: project.title,
        description: project.description,
        openGraph: {
            title: project.title,
            description: project.description,
            url: projectPath(project.slug),
        },
    };
}

/** "Label: text" bullet where the label is bold. */
function LabelledItem({ text }: { text: string }) {
    const [label, ...rest] = text.split(":");
    const detail = rest.join(":");
    return detail ? (
        <li>
            <strong>{label}:</strong>
            {detail}
        </li>
    ) : (
        <li>{text}</li>
    );
}

const linkClasses =
    "text-sm text-gray-600 underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current dark:text-neutral-400";

export default async function ProjectPage({ params }: { params: Params }) {
    const { slug } = await params;
    const index = projects.findIndex((p) => p.slug === slug);
    if (index === -1) notFound();

    const project = projects[index];
    const nextProject = projects[(index + 1) % projects.length];

    return (
        <div className="mx-auto max-w-2xl p-4 pb-28 font-sans md:pb-4">
            <Header />
            <main id="main">
                {project.liveNotice && (
                    <p
                        role="note"
                        className="mb-4 flex items-center gap-2 rounded-lg border border-amber-300 bg-amber-50 p-2 text-sm text-amber-800 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-200"
                    >
                        <AlertCircle aria-hidden="true" className="h-4 w-4 shrink-0" />
                        {project.liveNotice}
                    </p>
                )}
                <h1 className="mb-4 text-5xl font-semibold">{project.title}</h1>
                <p className="mb-6 text-sm text-gray-600 dark:text-neutral-400">
                    {project.detail}
                </p>

                <dl className="mb-6 grid grid-cols-1 gap-4">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-2 dark:border-neutral-800">
                        <dt className="text-sm font-medium">Year</dt>
                        <dd className="text-sm text-gray-600 dark:text-neutral-400">
                            {project.year}
                        </dd>
                    </div>
                    <div className="flex items-center justify-between border-b border-gray-200 pb-2 dark:border-neutral-800">
                        <dt className="text-sm font-medium">Live demo</dt>
                        <dd>
                            <Tooltip
                                content={
                                    project.liveNotice ??
                                    (project.slowStart
                                        ? "Hosted on Render: allow ~40 s to spin up"
                                        : "Open live site")
                                }
                            >
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={linkClasses}
                                >
                                    {displayUrl(project.liveUrl)}
                                    <span className="sr-only">
                                        {" "}
                                        (opens in a new tab)
                                    </span>
                                </a>
                            </Tooltip>
                        </dd>
                    </div>
                    <div className="flex items-center justify-between border-b border-gray-200 pb-2 dark:border-neutral-800">
                        <dt className="text-sm font-medium">GitHub</dt>
                        <dd className="min-w-0">
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${linkClasses} relative block max-w-[180px] truncate sm:max-w-none`}
                            >
                                {displayUrl(project.githubUrl)}
                                <span className="sr-only">
                                    {" "}
                                    (opens in a new tab)
                                </span>
                            </a>
                        </dd>
                    </div>
                    <div className="flex items-center justify-between border-b border-gray-200 pb-2 dark:border-neutral-800">
                        <dt className="text-sm font-medium">Deployment</dt>
                        <dd className="text-sm text-gray-600 dark:text-neutral-400">
                            {project.deployment}
                        </dd>
                    </div>
                </dl>

                <h2 className="mb-2 text-3xl font-semibold">Project Details</h2>

                <div className="mb-4">
                    <ProjectVideo
                        src={project.videoSrc}
                        label={`${project.title} demo`}
                    />
                </div>

                <section className="mb-8" aria-labelledby="features-heading">
                    <h3 id="features-heading" className="mb-2 text-2xl font-semibold">
                        Features
                    </h3>
                    <ol className="list-decimal pl-5 text-gray-600 dark:text-neutral-400">
                        {project.features.map((feature) => (
                            <LabelledItem key={feature} text={feature} />
                        ))}
                    </ol>
                </section>

                {/* Alternate feature videos with the remaining sections. */}
                {project.videos.map((video, i) => (
                    <div key={video.src}>
                        <div className="mb-4">
                            <ProjectVideo
                                src={video.src}
                                label={`${project.title}: ${video.label}`}
                            />
                        </div>
                        {i === 0 && (
                            <section className="mb-8" aria-labelledby="tech-heading">
                                <h3 id="tech-heading" className="mb-2 text-2xl font-semibold">
                                    Technologies Used
                                </h3>
                                <ul className="list-disc pl-5 text-gray-600 dark:text-neutral-400">
                                    {project.techStack.map((tech) => (
                                        <LabelledItem key={tech} text={tech} />
                                    ))}
                                </ul>
                            </section>
                        )}
                        {i === 1 && (
                            <section className="mb-8" aria-labelledby="challenges-heading">
                                <h3 id="challenges-heading" className="mb-2 text-2xl font-semibold">
                                    Challenges
                                </h3>
                                <ul className="list-disc space-y-2 pl-5 text-gray-600 dark:text-neutral-400">
                                    {project.challenges.map((item) => (
                                        <li key={item.challenge}>
                                            <strong>{item.challenge}</strong>
                                            <br />
                                            Solution: {item.solution}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}
                    </div>
                ))}

                {/* Projects with fewer than two videos still need these sections. */}
                {project.videos.length < 2 && (
                    <section className="mb-8" aria-labelledby="challenges-heading">
                        <h3 id="challenges-heading" className="mb-2 text-2xl font-semibold">
                            Challenges
                        </h3>
                        <ul className="list-disc space-y-2 pl-5 text-gray-600 dark:text-neutral-400">
                            {project.challenges.map((item) => (
                                <li key={item.challenge}>
                                    <strong>{item.challenge}</strong>
                                    <br />
                                    Solution: {item.solution}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                <section className="mb-8" aria-labelledby="future-heading">
                    <h3 id="future-heading" className="mb-2 text-2xl font-semibold">
                        Future Enhancements
                    </h3>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-neutral-400">
                        {project.futureEnhancements.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </section>

                <Link
                    href={projectPath(nextProject.slug)}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-white transition-colors duration-300 hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                >
                    Next project: {nextProject.title}
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
            </main>
            <Footer />
            <FloatingNavbar />
        </div>
    );
}
