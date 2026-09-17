"use client";

import { useSyncExternalStore } from "react";
import Tooltip from "./Tooltip";

interface EmojiState {
    emoji: string;
    label: string;
}

/** What I'm probably doing right now, based on the time of day in Riga. */
function currentActivity(): EmojiState {
    const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Riga",
        hour: "numeric",
        hour12: false,
        weekday: "short",
    }).formatToParts(new Date());
    const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0) % 24;
    const weekday = parts.find((p) => p.type === "weekday")?.value;
    const isWeekend = weekday === "Sat" || weekday === "Sun";

    if (isWeekend) {
        if (hour < 8) return { emoji: "😴", label: "Currently sleeping" };
        if (hour < 10) return { emoji: "🍳", label: "Currently making brunch" };
        if (hour < 14) return { emoji: "🏞️", label: "Currently enjoying the outdoors" };
        if (hour < 18) return { emoji: "🎨", label: "Currently pursuing hobbies" };
        if (hour < 22) return { emoji: "🍿", label: "Currently watching TV shows" };
        return { emoji: "🌙", label: "Winding down for the night" };
    }
    if (hour < 6) return { emoji: "😴", label: "Currently sleeping" };
    if (hour < 9) return { emoji: "🍽️", label: "Currently eating breakfast" };
    if (hour < 17) return { emoji: "💻", label: "Currently programming" };
    if (hour < 19) return { emoji: "🏋️", label: "Currently working out" };
    if (hour < 22) return { emoji: "📚", label: "Currently reading or relaxing" };
    return { emoji: "🌙", label: "Winding down for the night" };
}

// The server can't know when the visitor will load the page, so it renders a
// fixed state that the client replaces right after hydration (no mismatch).
const SERVER_STATE: EmojiState = { emoji: "💻", label: "Currently programming" };

// Snapshots must be referentially stable between reads, so cache by label.
let cached = SERVER_STATE;
function getSnapshot() {
    const next = currentActivity();
    if (next.label !== cached.label) cached = next;
    return cached;
}

function subscribe(onChange: () => void) {
    const interval = setInterval(onChange, 60_000);
    return () => clearInterval(interval);
}

export default function CurrentlyEmoji() {
    const state = useSyncExternalStore(subscribe, getSnapshot, () => SERVER_STATE);
    return (
        <Tooltip content={state.label}>
            <span
                role="img"
                aria-label={state.label}
                className="initial-fade-in cursor-default"
            >
                {state.emoji}
            </span>
        </Tooltip>
    );
}
