"use client";

import Image from "next/image";
import { FloatingNavbar } from "@/app/components/FloatingNavbar";
import Header from "@/app/layout/header";
import Footer from "@/app/layout/footer";
import PhysicsContainer from "@/app/components/PhysicsSimulation";

import memoji from "@/assets/images/memoji.png";
import mykoobLogo from "@/assets/images/mykoob_logo.webp";
import udemyLogo from "@/assets/images/udemy_logo.svg";
import rtuLogo from "@/assets/images/rtu_logo.svg";
import butsLogo from "@/assets/images/buts_logo.webp";

interface TimelineItemProps {
    title: string;
    subtitle: string;
    year: number | string;
    imageSrc: string;
}

const TimelineItem = ({
    title,
    subtitle,
    year,
    imageSrc,
}: TimelineItemProps) => (
    <div className="flex items-start space-x-4 mb-4">
        <div className="w-12 h-12 relative flex-shrink-0 rounded-full overflow-hidden bg-white-100 flex items-center justify-center border border-gray-200">
            <Image
                src={imageSrc}
                alt={title}
                width={imageSrc.includes("udemy") ? 20 : 36}
                height={imageSrc.includes("udemy") ? 20 : 36}
                className="rounded-full"
            />
        </div>
        <div className="flex-grow">
            <h3 className="font-medium">{title}</h3>
            <p className="text-gray-600">{subtitle}</p>
        </div>
        <span className="text-gray-500">{year}</span>
    </div>
);

const About = () => {
    return (
        <div className="max-w-2xl mx-auto p-4 font-sans">
            <Header />
            <main>
                <section className="mb-12 flex md:flex-row md:items-center items-start">
                    <div className="md:w-2/3">
                        <h1 className="text-4xl font-semibold mb-2">
                            Thanks for stopping by
                        </h1>
                        <p className="text-gray-600 mb-4 text-lg">
                            Front-end Developer Crafting Seamless Web
                            Experiences with Code and Creativity
                        </p>
                    </div>
                    <div className="md:w-1/3 flex justify-center">
                        <Image
                            src={memoji}
                            alt="Memoji profile"
                            width={150}
                            height={150}
                            className="rounded-full w-25 h-25 md:w-[150px] md:h-[150px]"
                        />
                    </div>
                </section>
                <section className="mb-12">
                    <h2 className="text-xl font-bold mb-2">About Me</h2>
                    <p className="text-gray-600 mb-4">
                        I&apos;m a passionate web developer with a knack for
                        creating clean, efficient, and user-friendly websites.
                        With expertise in front-end and back-end development, I
                        focus on building responsive, dynamic, and intuitive
                        digital experiences. I enjoy turning complex problems
                        into simple, elegant solutions, and I&apos;m always
                        exploring the latest technologies to stay ahead in the
                        ever-evolving world of web development. When I&apos;m
                        not coding, you can find me diving into new design
                        trends or collaborating on exciting tech projects.
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
                        subtitle="JavaScript"
                        year={2024}
                        imageSrc={udemyLogo.src}
                    />
                    <TimelineItem
                        title="Advanced CSS and Sass"
                        subtitle="SCSS/SASS Flexbox Grid"
                        year={2024}
                        imageSrc={udemyLogo.src}
                    />
                    <TimelineItem
                        title="The Web Developer Bootcamp 2024"
                        subtitle="HTML5 CSS3 JavaScript React.js Node.js Express.js MongoDB"
                        year={2024}
                        imageSrc={udemyLogo.src}
                    />
                    <TimelineItem
                        title="Web risinājumu izstrāde"
                        subtitle="Learning CenterBUTS"
                        year={2022}
                        imageSrc={butsLogo.src}
                    />
                </section>
            </main>
            <Footer />
            <FloatingNavbar />
        </div>
    );
};

export default About;
