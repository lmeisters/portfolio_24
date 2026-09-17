import type { Metadata } from "next";
import Image, { StaticImageData } from "next/image";
import { FloatingNavbar } from "@/app/components/FloatingNavbar";
import Header from "@/app/layout/header";
import Footer from "@/app/layout/footer";
import SkillsSection from "@/app/components/SkillsSection";
import Tooltip from "@/app/components/Tooltip";
import { SkillTag } from "@/app/components/icons";
import avatar from "@/assets/images/avatar.webp";
import airBalticLogo from "@/assets/images/airbaltic_logo.webp";
import mykoobLogo from "@/assets/images/mykoob_logo.webp";
import udemyLogo from "@/assets/images/udemy_logo.svg";
import rtuLogo from "@/assets/images/rtu_logo.svg";
import butsLogo from "@/assets/images/buts_logo.webp";

export const metadata: Metadata = {
    title: "About",
    description:
        "Linards Meisters: UX specialist with a computer science degree from Riga Technical University. Skills, education, experience and courses.",
};

interface TimelineItemProps {
    title: string;
    subtitle: string | string[];
    description?: string;
    year: string;
    logo: StaticImageData;
    organisation?: string;
}

function TimelineItem({
    title,
    subtitle,
    description,
    year,
    logo,
    organisation,
}: TimelineItemProps) {
    const org = organisation ?? title;
    return (
        <li className="mb-4 flex items-start gap-4">
            <Tooltip content={org}>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-white dark:border-neutral-700">
                    <Image
                        src={logo}
                        alt={`${org} logo`}
                        width={36}
                        height={36}
                        className="h-9 w-9 rounded-full object-contain transition-transform duration-500 ease-in-out hover:scale-110"
                    />
                </span>
            </Tooltip>
            <div className="flex-grow">
                <h3 className="font-medium">{title}</h3>
                {description && (
                    <p className="text-gray-600 dark:text-neutral-400">{description}</p>
                )}
                {Array.isArray(subtitle) ? (
                    <ul className="mt-1 flex flex-wrap gap-1" aria-label="Skills">
                        {subtitle.map((skill) => (
                            <li key={skill}>
                                <SkillTag name={skill} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600 dark:text-neutral-400">{subtitle}</p>
                )}
            </div>
            <span className="shrink-0 text-gray-600 dark:text-neutral-400">{year}</span>
        </li>
    );
}

export default function AboutPage() {
    return (
        <div className="mx-auto max-w-2xl p-4 pb-28 font-sans md:pb-4">
            <Header />
            <main id="main">
                <section className="mb-12 flex items-center" aria-labelledby="about-heading">
                    <div className="w-2/3">
                        <h1 id="about-heading" className="mb-2 text-4xl font-semibold">
                            Thanks for stopping by
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-neutral-400">
                            UX Specialist crafting data-driven experiences with
                            research and code
                        </p>
                    </div>
                    <div className="flex w-1/3">
                        <Image
                            src={avatar}
                            alt="Memoji avatar of Linards"
                            width={125}
                            height={125}
                            priority
                            className="ml-auto h-auto max-w-[125px] rounded-full"
                        />
                    </div>
                </section>

                <section className="mb-8" aria-labelledby="about-me-heading">
                    <h2 id="about-me-heading" className="mb-2 text-xl font-bold">
                        About Me
                    </h2>
                    <p className="mb-2 text-gray-600 dark:text-neutral-400">
                        I&apos;m a UX Specialist with a Computer Science
                        background from Riga Technical University. I combine
                        user research and experimentation with hands-on
                        technical skills. I design A/B tests, build prototypes,
                        and implement solutions using HTML, CSS, JavaScript,
                        TypeScript, React, Next.js, and Tailwind.
                    </p>
                    <p className="mb-2 text-gray-600 dark:text-neutral-400">
                        My foundation started during my internship at Mykoob,
                        where I worked on SCSS architecture and modern
                        JavaScript projects that taught me how to write
                        maintainable, performant code. Now I split my time
                        between optimizing user experiences at work and
                        building side projects that solve real problems, things
                        I actually wish existed.
                    </p>
                    <p className="mb-4 text-gray-600 dark:text-neutral-400">
                        I stay inspired by following design trends and
                        experimenting with new approaches, always focusing on
                        creating experiences that are responsive, accessible,
                        and genuinely useful.
                    </p>
                </section>

                <SkillsSection />

                <section className="mb-8" aria-labelledby="education-heading">
                    <h2 id="education-heading" className="mb-4 text-xl font-bold">
                        Education
                    </h2>
                    <ul>
                        <TimelineItem
                            title="Riga Technical University"
                            subtitle="Incomplete Master's Degree of Computer Science"
                            year="2023 - 2024"
                            logo={rtuLogo}
                        />
                        <TimelineItem
                            title="Riga Technical University"
                            subtitle="Bachelor's Degree of Computer Science"
                            year="2016 - 2020"
                            logo={rtuLogo}
                        />
                    </ul>
                </section>

                <section className="mb-8" aria-labelledby="experience-heading">
                    <h2 id="experience-heading" className="mb-4 text-xl font-bold">
                        Experience
                    </h2>
                    <ul>
                        <TimelineItem
                            title="airBaltic"
                            description="UX Specialist"
                            subtitle={["JavaScript", "MS Clarity", "Optimisely"]}
                            year="2025 - Present"
                            logo={airBalticLogo}
                        />
                        <TimelineItem
                            title="Mykoob"
                            description="Front-End Developer Internship"
                            subtitle={["JavaScript", "CSS3", "SCSS/SASS"]}
                            year="2024"
                            logo={mykoobLogo}
                        />
                    </ul>
                </section>

                <section className="mb-8" aria-labelledby="courses-heading">
                    <h2 id="courses-heading" className="mb-4 text-xl font-bold">
                        Courses
                    </h2>
                    <ul>
                        <TimelineItem
                            title="The Complete JavaScript Course 2024"
                            subtitle={["JavaScript"]}
                            year="2024"
                            logo={udemyLogo}
                            organisation="Udemy"
                        />
                        <TimelineItem
                            title="Advanced CSS and Sass"
                            subtitle={["SCSS/SASS", "Flexbox", "Grid"]}
                            year="2024"
                            logo={udemyLogo}
                            organisation="Udemy"
                        />
                        <TimelineItem
                            title="The Web Developer Bootcamp 2023"
                            subtitle={[
                                "HTML5",
                                "CSS3",
                                "JavaScript",
                                "Bootstrap",
                                "React",
                                "Node.js",
                                "Express.js",
                                "MongoDB",
                            ]}
                            year="2023"
                            logo={udemyLogo}
                            organisation="Udemy"
                        />
                        <TimelineItem
                            title="Web risinājumu izstrāde"
                            subtitle={["Web Development"]}
                            year="2022"
                            logo={butsLogo}
                            organisation="Learning center BUTS"
                        />
                    </ul>
                </section>
            </main>
            <Footer />
            <FloatingNavbar />
        </div>
    );
}
