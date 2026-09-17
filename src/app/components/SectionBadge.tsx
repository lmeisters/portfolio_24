export default function SectionBadge({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <p className="mb-4">
            <span className="rounded-full border border-gray-800 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:border-neutral-300 dark:text-neutral-300">
                {children}
            </span>
        </p>
    );
}
