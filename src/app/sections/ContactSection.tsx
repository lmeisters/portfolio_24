import { CopyEmailButton } from "../components/CopyEmailButton";
import SectionBadge from "../components/SectionBadge";
import { EMAIL } from "../data/site";

export default function ContactSection() {
    return (
        <section aria-labelledby="contact-heading">
            <SectionBadge>Contact</SectionBadge>
            <h2 id="contact-heading" className="mb-2 text-3xl font-bold">
                Get in Touch
            </h2>
            <p className="mb-6 text-gray-600 dark:text-neutral-400">
                I&apos;m available for new projects and collaborations.
                Let&apos;s connect and discuss how I can help solve your UX
                challenges.
            </p>
            <CopyEmailButton email={EMAIL} variant="default" />
        </section>
    );
}
