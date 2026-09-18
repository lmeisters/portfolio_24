import { Poppins } from "next/font/google";
import type { Metadata, Viewport } from "next";
import { unstable_ViewTransition as ViewTransition } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "./components/GoogleAnalytics";
import "./globals.css";

const poppins = Poppins({
    weight: ["400", "700"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-poppins",
});

const SITE_NAME = "Linards Meisters | UX Specialist & Frontend Developer";
const DESCRIPTION =
    "Portfolio of Linards Meisters, a UX specialist and frontend developer from Riga, Latvia: projects, skills and experience.";

export const metadata: Metadata = {
    metadataBase: new URL("https://portfoliolm.vercel.app"),
    title: {
        default: SITE_NAME,
        template: "%s | Linards Meisters",
    },
    description: DESCRIPTION,
    applicationName: "Portfolio",
    authors: [{ name: "Linards Meisters" }],
    creator: "Linards Meisters",
    keywords: ["UX", "frontend", "portfolio", "React", "Next.js", "Riga"],
    icons: {
        icon: [
            { url: "/favicon.png", sizes: "32x32" },
            { url: "/icon.png", sizes: "192x192" },
        ],
        apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "/",
        siteName: SITE_NAME,
        title: SITE_NAME,
        description: DESCRIPTION,
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Linards Meisters portfolio",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: SITE_NAME,
        description: DESCRIPTION,
        images: ["/og-image.png"],
    },
    formatDetection: { email: false, address: false, telephone: false },
    appleWebApp: { capable: true, title: "Portfolio", statusBarStyle: "default" },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#121212" },
    ],
};

const themeScript = `(function(){try{var t=localStorage.getItem("theme");var d=t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d)}catch(e){}})();`;

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={`${poppins.variable} font-sans`}
            suppressHydrationWarning
        >
            <head>
                <script dangerouslySetInnerHTML={{ __html: themeScript }} />
            </head>
            <body className="bg-white text-gray-900 transition-colors duration-300 dark:bg-[#121212] dark:text-white">
                <a
                    href="#main"
                    className="sr-only rounded-full bg-black px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] dark:bg-white dark:text-black"
                >
                    Skip to content
                </a>
                <ViewTransition default="page">{children}</ViewTransition>
                {process.env.VERCEL === "1" && <SpeedInsights />}
                <GoogleAnalytics />
            </body>
        </html>
    );
}
