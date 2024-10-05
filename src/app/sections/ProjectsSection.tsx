import Link from "next/link";
import ProjectCard from "../components/ProjectCard";
import siteSelectImage from "@/assets/images/siteselect.png";
import fridgefolioImage from "@/assets/images/fridgefolio.png";

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
                abbreviation="SS"
                title="SiteSelect"
                description="A curated platform offering a collection of the web's most innovative design galleries"
                longDescription="Throughout the years of web development I had collected a lot of website inspiration galleries but couldn't remember what each of them featured. So I made a custom website just to categorise and filter all of them."
                technologies={["SCSS/SASS", "JavaScript", "GSAP"]}
                githubUrl="https://github.com/lmeisters/SiteSelect"
                liveUrl="https://siteselect.vercel.app/"
                image={siteSelectImage}
            />
            <ProjectCard
                abbreviation="FF"
                title="FridgeFolio"
                description="A recipe sharing platform"
                longDescription="I made this website for my mom who loves cooking and sharing her recipes with friends and family. She can easily add, edit and delete recipes, and the website is also hosted on Vercel."
                technologies={["Tailwind", "Typescript", "FreamerMotion"]}
                githubUrl="https://github.com/lmeisters/FridgeFolio"
                liveUrl="https://siteselect.vercel.app/"
                image={fridgefolioImage}
            />
            <ProjectCard
                abbreviation="FF"
                title="FridgeFolio"
                description="A recipe sharing platform"
                longDescription="I made this website for my mom who loves cooking and sharing her recipes with friends and family. She can easily add, edit and delete recipes, and the website is also hosted on Vercel."
                technologies={["Tailwind", "Typescript", "FreamerMotion"]}
                githubUrl="https://github.com/lmeisters/FridgeFolio"
                liveUrl="https://siteselect.vercel.app/"
                image={siteSelectImage}
            />
        </section>
    );
}
