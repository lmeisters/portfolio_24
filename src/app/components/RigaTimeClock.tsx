import { useState, useEffect } from "react";

const RigaTimeClock = () => {
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const rigaTime = new Date(
                now.toLocaleString("en-US", { timeZone: "Europe/Riga" })
            );
            setTime(
                rigaTime.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                })
            );
        };

        updateTime();
        const timerId = setInterval(updateTime, 1000);

        return () => clearInterval(timerId);
    }, []);

    return <div>{time} Riga, Latvia</div>;
};

export default RigaTimeClock;
