import { FloatingNavbar } from "./components/FloatingNavbar";
import Header from "./layout/header";
import HeroSection from "./sections/HeroSection";
import ProjectsSection from "./sections/ProjectsSection";
import AboutSection from "./sections/AboutSection";
import ContactSection from "./sections/ContactSection";
import Footer from "./layout/footer";

export default function Home() {
    return (
        <div className="mx-auto max-w-2xl p-4 pb-28 font-sans md:pb-4">
            <Header />
            <main id="main">
                <HeroSection />
                <ProjectsSection />
                <AboutSection />
                <ContactSection />
            </main>
            <Footer />
            <FloatingNavbar />
        </div>
    );
}
