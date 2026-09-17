import Link from "next/link";
import RigaTimeClock from "@/app/components/RigaTimeClock";
import CurrentlyEmoji from "@/app/components/CurrentlyEmoji";

export default function Header() {
    return (
        <header className="mb-8 flex items-center justify-between">
            <Link
                href="/"
                className="rounded font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
            >
                LM<span className="sr-only"> – Linards Meisters, home</span>
            </Link>
            <div className="flex items-center gap-2">
                <CurrentlyEmoji />
                <RigaTimeClock />
            </div>
        </header>
    );
}
