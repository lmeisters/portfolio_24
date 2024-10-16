"use client";

import Image from "next/image";
import { FloatingNavbar } from "@/app/components/FloatingNavbar";
import Header from "@/app/layout/header";
import Footer from "@/app/layout/footer";
import PhysicsContainer from "@/app/components/PhysicsSimulation";
import LazyLoadMedia from "@/app/components/LazyLoadMedia";
import Tooltip from "@/app/components/ToolTip";

import avatar from "@/assets/images/avatar.webp";
import mykoobLogo from "@/assets/images/mykoob_logo.webp";
import udemyLogo from "@/assets/images/udemy_logo.svg";
import rtuLogo from "@/assets/images/rtu_logo.svg";
import butsLogo from "@/assets/images/buts_logo.webp";

interface TimelineItemProps {
    title: string;
    subtitle: string | string[];
    year: number | string;
    imageSrc: string;
    isCourse?: boolean;
}

const TimelineItem = ({
    title,
    subtitle,
    year,
    imageSrc,
    isCourse = false,
}: TimelineItemProps) => {
    const getTooltipContent = () => {
        if (isCourse) {
            if (imageSrc.includes("udemy")) {
                return "Udemy";
            } else if (imageSrc.includes("buts")) {
                return "Learning center BUTS";
            }
        }
        return title;
    };

    return (
        <div className="flex items-start space-x-4 mb-4">
            <div className="w-12 h-12 relative flex-shrink-0 rounded-full overflow-hidden bg-white-100 flex items-center justify-center border border-gray-200">
                <Tooltip content={getTooltipContent()}>
                    <div className="transition-transform duration-500 ease-in-out hover:scale-110">
                        <Image
                            src={imageSrc}
                            alt={title}
                            width={48}
                            height={48}
                            className="rounded-full w-9 h-9"
                            style={{ objectFit: "contain" }}
                        />
                    </div>
                </Tooltip>
            </div>
            <div className="flex-grow">
                <h3 className="font-medium">{title}</h3>
                {Array.isArray(subtitle) ? (
                    <div className="flex flex-wrap gap-1 mt-1">
                        {subtitle.map((skill, index) => (
                            <span
                                key={index}
                                className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-xs"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">{subtitle}</p>
                )}
            </div>
            <span className="text-gray-500">{year}</span>
        </div>
    );
};

const About = () => {
    return (
        <div className="max-w-2xl mx-auto p-4 font-sans">
            <Header />
            <main>
                <section className="mb-12 flex items-center">
                    <div className="w-2/3 pr-4">
                        <h1 className="text-4xl font-semibold mb-2">
                            Thanks for stopping by
                        </h1>
                        <p className="text-gray-600 mb-4 text-lg">
                            Front-end Developer Crafting Seamless Web
                            Experiences with Code and Creativity
                        </p>
                    </div>
                    <div className="w-1/3 flex justify-center">
                        <LazyLoadMedia
                            src={avatar.src}
                            title="Memoji avatar"
                            width={125}
                            height={125}
                            className="rounded-full h-auto max-w-[125px]"
                        />
                    </div>
                </section>
                <section className="mb-12">
                    <h2 className="text-xl font-bold mb-2">About Me</h2>
                    <p className="text-gray-600 mb-2">
                        I'm a front-end developer with a background in Computer
                        Science from Riga Technical University, currently
                        pursuing my Master's degree. My skills include HTML,
                        CSS, JavaScript, and TypeScript, along with experience
                        using frameworks like React, Next.js, and Tailwind.
                    </p>
                    <p className="text-gray-600 mb-4">
                        During my internship at Mykoob, I built a strong
                        foundation in SCSS and modern JavaScript, working
                        through detailed projects that sharpened my coding and
                        design skills. Outside of work, I create web apps that
                        solve real-life problems, focusing on clear,
                        user-centered functionality. I draw design inspiration
                        from industry trends and continuously refine my approach
                        to building responsive, well-architected websites.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">My Skills</h2>
                    <PhysicsContainer />
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">Education</h2>
                    <TimelineItem
                        title="Riga Technical University"
                        subtitle="Master's Degree of Computer Science"
                        year="2023 - present"
                        imageSrc={rtuLogo.src}
                    />
                    <TimelineItem
                        title="Riga Technical University"
                        subtitle="Bachelor's Degree of Computer Science"
                        year="2016 - 2020"
                        imageSrc={rtuLogo.src}
                    />
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">Experience</h2>
                    <TimelineItem
                        title="Mykoob"
                        subtitle="Front-end Developer Internship"
                        year={2024}
                        imageSrc={mykoobLogo.src}
                    />
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">Courses</h2>
                    <TimelineItem
                        title="The Complete JavaScript Course 2024"
                        subtitle={["JavaScript"]}
                        year={2024}
                        imageSrc={udemyLogo.src}
                        isCourse={true}
                    />
                    <TimelineItem
                        title="Advanced CSS and Sass"
                        subtitle={["SCSS", "SASS", "Flexbox", "Grid"]}
                        year={2024}
                        imageSrc={udemyLogo.src}
                        isCourse={true}
                    />
                    <TimelineItem
                        title="The Web Developer Bootcamp 2023"
                        subtitle={[
                            "HTML5",
                            "CSS3",
                            "JavaScript",
                            "React.js",
                            "Node.js",
                            "Express.js",
                            "MongoDB",
                        ]}
                        year={2023}
                        imageSrc={udemyLogo.src}
                        isCourse={true}
                    />
                    <TimelineItem
                        title="Web risinājumu izstrāde"
                        subtitle={["Web Development"]}
                        year={2022}
                        imageSrc={butsLogo.src}
                        isCourse={true}
                    />
                </section>
            </main>
            <Footer />
            <FloatingNavbar />
        </div>
    );
};

export default About;
