"use client";

import { FloatingNavbar } from "./components/FloatingNavbar";
import Header from "./layout/header";
import HeroSection from "./sections/HeroSection";
import ProjectsSection from "./sections/ProjectsSection";
import AboutSection from "./sections/AboutSection";
import Contact from "./sections/Contact";
import Footer from "./layout/footer";

export default function Home() {
    return (
        <div className="max-w-2xl mx-auto p-4 font-sans">
            <Header />

            <HeroSection />
            <ProjectsSection />
            <AboutSection />
            <Contact />

            <Footer />
            <FloatingNavbar />
        </div>
    );
}
