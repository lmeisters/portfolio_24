import { Poppins } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import { SpeedInsightsWrapper } from "./components/SpeedInsightsWrapper";
import { GoogleAnalytics } from "./components/GoogleAnalytics";
import "./styles/modal.css";

const poppins = Poppins({
    weight: ["400", "700"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-poppins",
    preload: true,
});

export const metadata: Metadata = {
    metadataBase: new URL("https://portfoliolm.vercel.app"),
    title: "Linards Meisters | Frontend Developer Portfolio",
    description:
        "Welcome to my portfolio - Showcasing web development projects and skills",
    icons: {
        icon: [
            { url: "/favicon.png", sizes: "32x32" },
            { url: "/icon.png", sizes: "192x192" },
        ],
        apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
    },
    openGraph: {
        type: "website",
        locale: "en_LV",
        url: "https://portfoliolm.vercel.app",
        title: "Linards Meisters | Frontend Developer Portfolio",
        description:
            "Welcome to my portfolio - Showcasing web development projects and skills",
        siteName: "Linards Meisters | Frontend Developer Portfolio",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Linards Meisters | Frontend Developer Portfolio",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Linards Meisters | Frontend Developer Portfolio",
        description:
            "Welcome to my portfolio - Showcasing web development projects and skills",
        images: ["/og-image.png"],
    },
    keywords: [
        "web development",
        "portfolio",
        "React",
        "Next.js",
        "frontend",
        "backend",
    ],
    authors: [{ name: "Linards Meisters" }],
    creator: "Linards Meisters",
    publisher: "Linards Meisters",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    other: {
        "google-font-preconnect": ["https://fonts.gstatic.com"],
        generator: "Next.js",
        framework: "Next.js 14",
        language: "TypeScript",
        viewport: "width=device-width, initial-scale=1.0",
        "theme-color": "#000000",
        "apple-mobile-web-app-capable": "yes",
        "apple-mobile-web-app-status-bar-style": "default",
        "format-detection": "telephone=no",
        "application-name": "Portfolio",
        "apple-mobile-web-app-title": "Portfolio",
        "next-head-count": "0",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${poppins.variable} font-sans`}>
            <head>
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preconnect"
                    href="https://fonts.googleapis.com"
                    crossOrigin="anonymous"
                />
                <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
                <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
                <link rel="icon" href="/favicon.ico" />

                <meta name="generator" content="Next.js" />
                <meta name="framework" content="Next.js 14" />
                <meta name="language" content="TypeScript" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta name="theme-color" content="#000000" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="default"
                />
                <meta name="format-detection" content="telephone=no" />
                <meta name="application-name" content="Portfolio" />
                <meta name="apple-mobile-web-app-title" content="Portfolio" />
                <meta name="next-head-count" content="0" />
            </head>
            <body>
                {children}
                <SpeedInsightsWrapper />
                <GoogleAnalytics />
            </body>
        </html>
    );
}
