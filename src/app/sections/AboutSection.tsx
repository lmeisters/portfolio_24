import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionBadge from "../components/SectionBadge";

export default function AboutSection() {
    return (
        <section className="mb-12" aria-labelledby="about-heading">
            <SectionBadge>About</SectionBadge>
            <h2 id="about-heading" className="mb-2 text-3xl font-bold">
                About Me
            </h2>
            <p className="mb-4 text-gray-600 dark:text-neutral-400">
                I have a Bachelor&apos;s in Computer Science and work as a UX
                Specialist, which means I spend my days designing A/B tests,
                analyzing user behavior, and turning research into actual design
                solutions. What makes my approach different is that I can take
                those designs all the way through. I build prototypes, implement
                fixes directly with GTM, ensure everything meets accessibility
                standards, and write the automation tests to verify it all
                works. My frontend background lets me move quickly between
                Figma, code, and data without losing context. I focus on
                creating experiences that are fast, accessible, and solve real
                problems for users.
            </p>
            <Link
                href="/pages/about"
                className="group inline-flex items-center rounded text-gray-600 transition-colors duration-300 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current dark:text-neutral-400 dark:hover:text-white"
            >
                More about me
                <ArrowUpRight
                    aria-hidden="true"
                    className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
            </Link>
        </section>
    );
}
