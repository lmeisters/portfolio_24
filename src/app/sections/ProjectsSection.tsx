import Link from "next/link";
import ProjectCard from "../components/ProjectCard";
import siteSelectImage from "@/assets/images/siteselect.webp";
import terrainlyImage from "@/assets/images/terrainly.webp";
import terrainlyLogo from "@/assets/images/terrainly_logo.webp";

import purePlaylistImage from "@/assets/images/pure_playlist.webp";
import purePlaylistLogo from "@/assets/images/pure_playlist_logo.webp";
import { ArrowUpRight } from "lucide-react";

export default function ProjectsSection() {
    return (
        <section id="projects" className="mb-12 scroll-mt-4">
            <div className="flex items-center space-x-2 mb-4">
                <span className="border border-gray-800 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    My Projects
                </span>
            </div>
            <h2 className="text-3xl font-bold mb-2">My latest works</h2>
            <p className="text-gray-600 mb-8">
                A Glimpse into My Recent Web Development Projects and Creative
                Solutions
            </p>

            <ProjectCard
                logo={purePlaylistLogo.src}
                title="PurePlaylist"
                description="A Spotify playlist management app for easy sorting, filtering, and organization"
                longDescription="I created PurePlaylist to simplify managing large playlists, allowing users to organize their music to suit their preferences with just a few clicks"
                technologies={["TypeScript", "Tailwind", "React"]}
                githubUrl="https://github.com/lmeisters/PurePlaylist"
                liveUrl="https://pureplaylist.vercel.app"
                image={purePlaylistImage}
                videoSrc="/assets/videos/pure_playlist/pure_playlist_demo.webm"
                isNew={true}
            />
            <ProjectCard
                abbreviation="SS"
                title="SiteSelect"
                description="A curated platform offering a collection of the web's most innovative design galleries"
                longDescription="I built a custom platform to organize and filter website inspiration galleries I collected over the years, making it easier to find specific design references"
                technologies={["JavaScript", "SCSS/SASS", "GSAP"]}
                githubUrl="https://github.com/lmeisters/SiteSelect"
                liveUrl="https://siteselect.vercel.app/"
                image={siteSelectImage}
                videoSrc="/assets/videos/siteselect/siteselect_demo.webm"
            />
            <ProjectCard
                logo={terrainlyLogo.src}
                title="Terrainly"
                description="A full stack web app for discovering, reviewing, and managing parks around Latvia"
                longDescription="I initially built this web app as a course project, but this year I chose to continue developing it to enhance its frontend and expand its functionality"
                technologies={["Javascript", "Bootstrap", "Node.js"]}
                githubUrl="https://github.com/lmeisters/Terrainly"
                liveUrl="https://terrainly.onrender.com"
                image={terrainlyImage}
                videoSrc="/assets/videos/terrainly/terrainly_demo.webm"
            />

            <Link href="/pages/works">
                <button className="flex items-center text-gray-600 hover:text-black transition-colors duration-300 group">
                    See all projects
                    <ArrowUpRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
            </Link>
        </section>
    );
}
