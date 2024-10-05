"use client";
import Link from "next/link";
import { FloatingNavbar } from "./components/FloatingNavbar";
import Header from "./layout/header";
import Footer from "./layout/footer";

export default function NotFound() {
    return (
        <div className="relative flex flex-col min-h-screen font-sans max-w-2xl mx-auto p-4">
            <Header />
            <main className="flex-grow flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-5xl font-bold mb-4">404</h1>
                    <h2 className="text-2xl font-semibold mb-6">
                        Page Not Found
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Oops! The page you're looking for doesn't exist or has
                        been moved.
                    </p>
                    <Link href="/">
                        <span className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-300 ease-in-out">
                            Go back home
                        </span>
                    </Link>
                </div>
            </main>
            <Footer />
            <div className="fixed bottom-0 left-0 right-0 z-50">
                <FloatingNavbar />
            </div>
        </div>
    );
}
