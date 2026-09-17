"use client";

import { useSyncExternalStore } from "react";

function rigaTime() {
    return new Date().toLocaleTimeString("en-GB", {
        timeZone: "Europe/Riga",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
}

function subscribe(onChange: () => void) {
    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
        onChange();
        interval = setInterval(onChange, 60_000);
    }, 60_000 - (Date.now() % 60_000));
    return () => {
        clearTimeout(timeout);
        if (interval) clearInterval(interval);
    };
}

const PLACEHOLDER = "--:--";

export default function RigaTimeClock() {
    const time = useSyncExternalStore(subscribe, rigaTime, () => PLACEHOLDER);
    return (
        <p className="initial-fade-in tabular-nums">
            <time>{time}</time> Riga, Latvia
        </p>
    );
}
