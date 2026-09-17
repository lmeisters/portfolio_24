import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * GA4 tag, loaded after the page is idle so it never competes with hydration.
 * Renders nothing when no measurement id is configured (local dev, previews).
 */
export function GoogleAnalytics() {
    if (!GA_ID) return null;
    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                strategy="lazyOnload"
            />
            <Script id="ga-init" strategy="lazyOnload">
                {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
        </>
    );
}
