"use client";

import { GoogleAnalytics as GA } from "@next/third-parties/google";
import { useState, useEffect } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import { usePathname, useSearchParams } from "next/navigation";

export function GoogleAnalytics() {
    const [hasConsent, setHasConsent] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const consent = localStorage.getItem("analytics-consent");
        if (!consent) {
            localStorage.setItem("analytics-consent", "granted");
            setHasConsent(true);
        } else {
            setHasConsent(consent === "granted");
        }
    }, []);

    useEffect(() => {
        if (hasConsent && window.gtag) {
            window.gtag("event", "page_view", {
                page_path: pathname + searchParams.toString(),
                page_title: document.title,
            });
        }
    }, [pathname, searchParams, hasConsent]);

    if (!hasConsent) return null;

    return (
        <ErrorBoundary>
            <GA gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} />
        </ErrorBoundary>
    );
}
