import { skills, type Skill, type SkillCategory } from "./icons";

const CATEGORY_LABELS: Record<SkillCategory, string> = {
    frontend: "Frontend",
    styling: "Styling",
    backend: "Backend",
    tools: "Tools",
};

const grouped = skills.reduce<Partial<Record<SkillCategory, Skill[]>>>(
    (acc, skill) => {
        (acc[skill.category] ??= []).push(skill);
        return acc;
    },
    {}
);

/** Plain, screen-reader friendly list of skills grouped by category. */
export default function StaticSkills({ className = "" }: { className?: string }) {
    return (
        <dl className={`grid grid-cols-1 gap-4 ${className}`}>
            {(Object.keys(grouped) as SkillCategory[]).map((category) => (
                <div
                    key={category}
                    className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4"
                >
                    <dt className="min-w-[75px]">{CATEGORY_LABELS[category]}:</dt>
                    <dd>
                        <ul className="flex flex-wrap gap-1.5">
                            {grouped[category]!.map(({ name, icon: Icon }) => (
                                <li
                                    key={name}
                                    className="inline-flex items-center gap-1.5 rounded-md bg-gray-200 px-2 py-1 text-xs text-gray-700 dark:bg-neutral-800 dark:text-neutral-300"
                                >
                                    <Icon aria-hidden="true" className="h-4 w-4" />
                                    {name}
                                </li>
                            ))}
                        </ul>
                    </dd>
                </div>
            ))}
        </dl>
    );
}
