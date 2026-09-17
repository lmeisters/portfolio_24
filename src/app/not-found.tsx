import Link from "next/link";
import { FloatingNavbar } from "./components/FloatingNavbar";
import Header from "./layout/header";
import Footer from "./layout/footer";

export const metadata = { title: "Page not found" };

export default function NotFound() {
    return (
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col p-4 pb-28 font-sans md:pb-4">
            <Header />
            <main id="main" className="flex flex-grow items-center justify-center">
                <div className="text-center">
                    <h1 className="mb-4 text-5xl font-bold">404</h1>
                    <p className="mb-6 text-2xl font-semibold">Page not found</p>
                    <p className="mb-8 text-gray-600 dark:text-neutral-400">
                        Oops! The page you&apos;re looking for doesn&apos;t
                        exist or has been moved.
                    </p>
                    <Link
                        href="/"
                        className="inline-block rounded-full bg-black px-4 py-2 text-white transition-colors duration-300 hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                    >
                        Go back home
                    </Link>
                </div>
            </main>
            <Footer />
            <FloatingNavbar />
        </div>
    );
}
