"use client";

import { useEffect, useState } from "react";
import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export function SpeedInsightsWrapper() {
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
        // Check if ad blocker is present using a more subtle approach
        const testElement = document.createElement("div");
        testElement.className =
            "pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links";
        testElement.style.position = "absolute";
        testElement.style.left = "-10000px";
        document.body.appendChild(testElement);

        const isBlocked =
            testElement.offsetHeight === 0 ||
            window.getComputedStyle(testElement).display === "none";

        document.body.removeChild(testElement);

        if (isBlocked) {
            setShouldRender(false);
        }
    }, []);

    if (!shouldRender) {
        return null;
    }

    return (
        <ErrorBoundary>
            <SpeedInsights />
        </ErrorBoundary>
    );
}

class ErrorBoundary extends React.Component<
    { children: React.ReactNode },
    { hasError: boolean }
> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch() {
        // Silently fail
    }

    render() {
        if (this.state.hasError) {
            return null;
        }

        return this.props.children;
    }
}
