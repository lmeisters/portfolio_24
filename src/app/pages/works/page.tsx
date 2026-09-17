import type { Metadata } from "next";
import { FloatingNavbar } from "@/app/components/FloatingNavbar";
import Header from "@/app/layout/header";
import Footer from "@/app/layout/footer";
import ProjectCard, { CardProject } from "@/app/components/ProjectCard";
import { projectPath, projects } from "@/app/data/projects";

export const metadata: Metadata = {
    title: "Works",
    description:
        "All of Linards Meisters' web projects: PurePlaylist, SiteSelect, Terrainly, an AI image generator and this portfolio.",
};

const portfolio: CardProject = {
    title: "Portfolio website",
    logo: "/icon.png",
    description: "A portfolio website showcasing my projects and skills",
    tags: ["TypeScript", "Tailwind", "React"],
    githubUrl: "https://github.com/lmeisters/portfolio_24",
    liveUrl: "https://portfoliolm.vercel.app/",
    image: "/og-image.png",
    imageWidth: 1200,
    imageHeight: 630,
};

const works: CardProject[] = [
    ...projects.map((p) => ({
        ...p,
        href: projectPath(p.slug),
        image: p.worksImage ?? p.image,
        tags: p.slug === "pureplaylist" ? ["TypeScript", "Tailwind", "Spotify API"] : p.tags,
    })),
    portfolio,
];

export default function WorksPage() {
    return (
        <div className="mx-auto max-w-2xl p-4 pb-28 font-sans md:pb-4">
            <Header />
            <main id="main">
                <div className="mb-12">
                    <h1 className="mb-2 text-4xl font-semibold">All Projects</h1>
                    <p className="text-lg text-gray-600 dark:text-neutral-400">
                        Take a look at some of my most recent projects
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {works.map((work, index) => (
                        <ProjectCard
                            key={work.title}
                            project={work}
                            variant="compact"
                            priority={index === 0}
                        />
                    ))}
                </div>
            </main>
            <Footer />
            <FloatingNavbar />
        </div>
    );
}
