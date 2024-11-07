import Link from "next/link";
import ProjectCard from "../components/ProjectCard";
import siteSelectImage from "@/assets/images/siteselect.webp";
import terrainlyImage from "@/assets/images/terrainly.webp";
import terrainlyLogo from "@/assets/images/terrainly_logo.webp";
// import aiImageGeneratorImage from "@/assets/images/ai_image_generator.webp";
import purePlaylistImage from "@/assets/images/pure_playlist.webp";
import purePlaylistLogo from "@/assets/images/pure_playlist_logo.webp";

export default function ProjectsSection() {
    return (
        <section id="projects" className="mb-12 scroll-mt-4">
            <div className="flex items-center space-x-2 mb-4">
                <Link href="#projects">
                    <span className="border border-gray-800 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full cursor-default">
                        My Projects
                    </span>
                </Link>
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
                technologies={["TypeScript", "Tailwind", "Spotify API"]}
                githubUrl="https://github.com/lmeisters/PurePlaylist"
                liveUrl="https://pureplaylist.vercel.app"
                image={purePlaylistImage}
                videoSrc="/assets/videos/pure_playlist/pure_playlist_demo.webm"
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
                videoSrc="/assets/siteselect/siteselect_demo.webm"
            />
            <ProjectCard
                logo={terrainlyLogo.src}
                title="Terrainly"
                description="A full stack web app for discovering, reviewing, and managing parks around Latvia"
                longDescription="I initially built this web app as a course project, but this year I chose to continue developing it to enhance its frontend and expand its functionality"
                technologies={["Javascript", "Bootstrap", "MongoDB"]}
                githubUrl="https://github.com/lmeisters/Terrainly"
                liveUrl="https://terrainly.onrender.com"
                image={terrainlyImage}
                videoSrc="/assets/videos/terrainly/terrainly_demo.webm"
            />
            {/* <ProjectCard
                abbreviation="IG"
                title="AI Image Generator"
                description="Web app that creates and showcases unique images from user prompts"
                longDescription="I built this app to enhance my full-stack skills and explore AI-powered image generation with DALL-E 2"
                technologies={["React", "Tailwind", "Node.js"]}
                githubUrl="https://github.com/lmeisters/AI_Image_Generator_Dall-E"
                liveUrl="https://image-generator-beed6.web.app"
                image={aiImageGeneratorImage}
                videoSrc="/assets/image_gen/ai_image_generator_demo.webm"
            /> */}
        </section>
    );
}
