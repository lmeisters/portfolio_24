import Image, { StaticImageData } from "next/image";

interface ProjectLogoProps {
    logo?: StaticImageData | string;
    abbreviation?: string;
    className?: string;
}

/** 32px square tile showing a project's logo or its two-letter abbreviation. */
export default function ProjectLogo({
    logo,
    abbreviation,
    className = "",
}: ProjectLogoProps) {
    return (
        <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-gray-200 bg-gray-100 text-sm font-bold transition-colors duration-300 group-hover:border-gray-400 dark:border-neutral-700 dark:bg-neutral-800 dark:group-hover:border-neutral-500 ${className}`}
            aria-hidden={logo ? undefined : "true"}
        >
            {logo ? (
                <Image
                    src={logo}
                    alt=""
                    width={24}
                    height={24}
                    className="h-6 w-6 object-contain"
                />
            ) : (
                abbreviation
            )}
        </span>
    );
}
