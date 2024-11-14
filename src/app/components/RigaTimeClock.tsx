"use client";

import { useState, useEffect } from "react";

function getCurrentRigaTime() {
    return new Date().toLocaleTimeString("en-GB", {
        timeZone: "Europe/Riga",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
}

export default function RigaTimeClock() {
    const [time, setTime] = useState(() => {
        if (typeof window !== "undefined") {
            const cached = localStorage.getItem("rigaTime");
            return cached || getCurrentRigaTime();
        }
        return getCurrentRigaTime();
    });

    const shouldAnimate =
        typeof window !== "undefined" &&
        !localStorage.getItem("initialPageLoad");

    useEffect(() => {
        const interval = setInterval(() => {
            const newTime = getCurrentRigaTime();
            setTime(newTime);
            localStorage.setItem("rigaTime", newTime);
        }, 1000);

        if (shouldAnimate) {
            localStorage.setItem("initialPageLoad", "true");
        }

        return () => clearInterval(interval);
    }, [shouldAnimate]);

    return (
        <div
            className={`${
                shouldAnimate ? "initial-fade-in clock-fade-in" : ""
            }`}
        >
            {time} Riga, Latvia
        </div>
    );
}
