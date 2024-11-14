"use client";

import React, { useState, useEffect } from "react";
import Tooltip from "./ToolTip";

interface EmojiState {
    emoji: string;
    tooltipContent: string;
}

const getCurrentEmojiState = (): EmojiState => {
    const now = new Date();
    const hour = now.getHours();
    const isWeekend = now.getDay() === 0 || now.getDay() === 6;

    if (isWeekend) {
        if (hour >= 0 && hour < 8)
            return { emoji: "😴", tooltipContent: "Currently Sleeping" };
        if (hour >= 8 && hour < 10)
            return { emoji: "🍳", tooltipContent: "Currently Making brunch" };
        if (hour >= 10 && hour < 14)
            return {
                emoji: "🏞️",
                tooltipContent: "Currently Enjoying outdoors",
            };
        if (hour >= 14 && hour < 18)
            return {
                emoji: "🎨",
                tooltipContent: "Currently Pursuing hobbies",
            };
        if (hour >= 18 && hour < 22)
            return {
                emoji: "🍿",
                tooltipContent: "Currently Watching tv shows",
            };
        return { emoji: "🌙", tooltipContent: "Winding down for the night" };
    }

    if (hour >= 0 && hour < 6)
        return { emoji: "😴", tooltipContent: "Currently Sleeping" };
    if (hour >= 6 && hour < 9)
        return { emoji: "🍽️", tooltipContent: "Currently Eating breakfast" };
    if (hour >= 9 && hour < 17)
        return { emoji: "💻", tooltipContent: "Currently Programming" };
    if (hour >= 17 && hour < 19)
        return { emoji: "🏋️", tooltipContent: "Currently Working out" };
    if (hour >= 19 && hour < 22)
        return { emoji: "📚", tooltipContent: "Currently Reading/Relaxing" };
    return { emoji: "🌙", tooltipContent: "Winding down for the night" };
};

export default function CurrentlyEmoji() {
    const [emojiState, setEmojiState] = useState<EmojiState>(() => {
        if (typeof window !== "undefined") {
            const cached = localStorage.getItem("currentEmojiState");
            return cached ? JSON.parse(cached) : getCurrentEmojiState();
        }
        return getCurrentEmojiState();
    });

    const shouldAnimate =
        typeof window !== "undefined" &&
        !localStorage.getItem("initialPageLoad");

    useEffect(() => {
        const interval = setInterval(() => {
            const newState = getCurrentEmojiState();
            setEmojiState(newState);
            localStorage.setItem("currentEmojiState", JSON.stringify(newState));
        }, 60000);

        if (shouldAnimate) {
            localStorage.setItem("initialPageLoad", "true");
        }

        return () => clearInterval(interval);
    }, [shouldAnimate]);

    return (
        <Tooltip content={emojiState.tooltipContent}>
            <span
                className={`cursor-default ${
                    shouldAnimate ? "initial-fade-in emoji-fade-in" : ""
                }`}
            >
                {emojiState.emoji}
            </span>
        </Tooltip>
    );
}
