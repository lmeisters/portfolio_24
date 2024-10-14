import { Poppins } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";

const poppins = Poppins({
    weight: ["400", "700"],
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "LM Portfolio",
    description: "Welcome to my portfolio",
    icons: {
        icon: [
            { url: "/favicon.png", sizes: "32x32" },
            { url: "/icon.png", sizes: "192x192" },
        ],
        apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={poppins.className}>
            <body>{children}</body>
        </html>
    );
}
