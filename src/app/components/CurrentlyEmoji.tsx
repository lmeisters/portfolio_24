import React, { useState, useEffect } from "react";
import Tooltip from "./ToolTip";

const getCurrentEmojiState = () => {
    const now = new Date();
    const hour = now.getHours();
    const isWeekend = now.getDay() === 0 || now.getDay() === 6;

    if (isWeekend) {
        // Weekend schedule
        if (hour >= 0 && hour < 8) {
            return { emoji: "😴", tooltipContent: "Currently Sleeping" };
        } else if (hour >= 8 && hour < 10) {
            return { emoji: "🍳", tooltipContent: "Currently Making brunch" };
        } else if (hour >= 10 && hour < 14) {
            return {
                emoji: "🏞️",
                tooltipContent: "Currently Enjoying outdoors",
            };
        } else if (hour >= 14 && hour < 18) {
            return {
                emoji: "🎨",
                tooltipContent: "Currently Pursuing hobbies",
            };
        } else if (hour >= 18 && hour < 22) {
            return {
                emoji: "🍿",
                tooltipContent: "Currently Watching tv shows",
            };
        } else {
            return {
                emoji: "🌙",
                tooltipContent: "Winding down for the night",
            };
        }
    } else {
        // Weekday schedule
        if (hour >= 0 && hour < 6) {
            return { emoji: "😴", tooltipContent: "Currently Sleeping" };
        } else if (hour >= 6 && hour < 9) {
            return {
                emoji: "🍽️",
                tooltipContent: "Currently Eating breakfast",
            };
        } else if (hour >= 9 && hour < 17) {
            return { emoji: "💻", tooltipContent: "Currently Programming" };
        } else if (hour >= 17 && hour < 19) {
            return { emoji: "🏋️", tooltipContent: "Currently Working out" };
        } else if (hour >= 19 && hour < 22) {
            return {
                emoji: "📚",
                tooltipContent: "Currently Reading/Relaxing",
            };
        } else {
            return {
                emoji: "🌙",
                tooltipContent: "Winding down for the night",
            };
        }
    }
};

const CurrentlyEmoji: React.FC = () => {
    const [{ emoji, tooltipContent }, setEmojiState] =
        useState(getCurrentEmojiState);

    useEffect(() => {
        const updateEmoji = () => {
            setEmojiState(getCurrentEmojiState());
        };

        const interval = setInterval(updateEmoji, 60000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Tooltip content={tooltipContent}>
            <span style={{ cursor: "default" }}>{emoji}</span>
        </Tooltip>
    );
};

export default CurrentlyEmoji;
