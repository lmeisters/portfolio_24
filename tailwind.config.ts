import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-poppins)", ...defaultTheme.fontFamily.sans],
            },
            keyframes: {
                wave: {
                    "0%": { transform: "rotate(0deg)" },
                    "10%": { transform: "rotate(14deg)" },
                    "20%": { transform: "rotate(-8deg)" },
                    "30%": { transform: "rotate(14deg)" },
                    "40%": { transform: "rotate(-4deg)" },
                    "50%": { transform: "rotate(10deg)" },
                    "60%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(0deg)" },
                },
                "zoom-in": {
                    from: { opacity: "0", transform: "scale(0.9)" },
                    to: { opacity: "1", transform: "scale(1)" },
                },
            },
            animation: {
                wave: "wave 1.5s infinite",
                "wave-once": "wave 1.5s 2",
                "zoom-in": "zoom-in 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            },
        },
    },
    plugins: [],
};
export default config;
