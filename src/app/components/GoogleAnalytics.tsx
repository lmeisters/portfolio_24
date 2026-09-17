"use client";

import { useEffect } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const INTERACTION_EVENTS = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
const FALLBACK_DELAY_MS = 8000;

declare global {
    interface Window {
        dataLayer: unknown[];
        gtag: (...args: unknown[]) => void;
    }
}

function loadGtag(id: string) {
    if (document.getElementById("ga-script")) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", id);
    const script = document.createElement("script");
    script.id = "ga-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(script);
}

export function GoogleAnalytics() {
    useEffect(() => {
        if (!GA_ID) return;
        const id = GA_ID;
        function load() {
            cleanup();
            loadGtag(id);
        }
        function cleanup() {
            clearTimeout(timer);
            for (const event of INTERACTION_EVENTS) {
                window.removeEventListener(event, load);
            }
        }
        for (const event of INTERACTION_EVENTS) {
            window.addEventListener(event, load, { once: true, passive: true });
        }
        const timer = setTimeout(load, FALLBACK_DELAY_MS);
        return cleanup;
    }, []);

    return null;
}
