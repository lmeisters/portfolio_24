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
    const [mounted, setMounted] = useState(false);
    const [time, setTime] = useState(getCurrentRigaTime());

    useEffect(() => {
        setMounted(true);
        const interval = setInterval(() => {
            setTime(getCurrentRigaTime());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (!mounted) return null;

    return <div>{time} Riga, Latvia</div>;
}
